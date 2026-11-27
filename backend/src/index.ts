import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { handleChatMessage } from './ai/llmService'

// Price string parser: "6 triệu" -> 6000000, "1,2 tỷ" -> 1200000000, "450000" -> 450000, "900 nghìn–1,5 triệu" -> 1500000
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0
  const map: Record<string, number> = { 'triệu': 1_000_000, 'tỷ': 1_000_000_000, 'nghìn': 1_000 }
  // Find last number + unit pair
  const matches = [...priceStr.matchAll(/([\d,.]+)\s*([a-zà-ỹ]+)/gi)]
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1]
    const num = parseFloat(lastMatch[1].replace(',', '.'))
    const unit = lastMatch[2].toLowerCase()
    return num * (map[unit] || 1)
  }
  // Fallback: plain number
  const nums = priceStr.match(/[\d,.]+/g)
  if (nums && nums.length > 0) {
    return parseFloat(nums[nums.length - 1].replace(',', '.'))
  }
  return 0
}

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000
const SECRET = 'ace-badminton-secret-key-change-in-prod-2024'
const UPLOAD_DIR = path.join(__dirname, '../uploads')

// Category filter helper
function buildWhere(filters: any) {
  const where: any = {}
  if (filters.category) where.series = { contains: filters.category }
  if (filters.brand) where.brandName = filters.brand
  if (filters.search) where.name = { contains: filters.search }
  return where
}

function buildProductPayload(data: any) {
  const payload: any = { ...data }
  delete payload.imageUrl
  payload.brandId = Number(payload.brandId)
  return payload
}

// Multer: store uploaded product images on disk
const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => cb(null, UPLOAD_DIR),
  filename: (_req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Chỉ chấp nhận file ảnh'))
  },
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(UPLOAD_DIR))

// --- Public API ---
app.get('/api/products', async (req, res) => {
  const { brand, series, search, category } = req.query
  const where: any = {}
  if (brand) where.brand = { name: brand as string }
  if (series) where.series = { contains: series as string }
  if (search) where.name = { contains: search as string }
  if (category) where.series = { contains: category as string }
  const products = await prisma.product.findMany({
    where,
    include: { brand: true },
    orderBy: { id: 'asc' },
  })
  res.json(products)
})

app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
    include: { brand: true },
  })
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

app.get('/api/brands', async (_req, res) => {
  const brands = await prisma.brand.findMany({ include: { _count: { select: { products: true } } } })
  res.json(brands)
})

// --- AI Chat ---
app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Thiếu message' })
  }
  try {
    const response = await handleChatMessage(message, history)
    res.json({ message: response })
  } catch (e: any) {
    res.status(500).json({ error: 'Lỗi khi xử lý yêu cầu AI' })
  }
})

// --- Customer Auth ---
app.post('/api/auth/register', async (req, res) => {
  const { email, name, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' })
  try {
    const user = await prisma.user.create({ data: { email, name: name || email, password } })
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '24h' })
    res.json({ token, userId: user.id, email: user.email, role: user.role })
  } catch (e: any) {
    if (e?.code === 'P2002') return res.status(400).json({ error: 'Email đã tồn tại' })
    res.status(500).json({ error: 'Đăng ký thất bại' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.password !== password) return res.status(401).json({ error: 'Sai email hoặc mật khẩu' })
  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '24h' })
  res.json({ token, userId: user.id, email: user.email, role: user.role })
})

// --- Auth ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === 'ace2024') {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '24h' })
    res.json({ token, username, role: 'admin' })
  } else {
    res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' })
  }
})

const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Chưa đăng nhập' })
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], SECRET) as any
    next()
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ' })
  }
}

const adminMiddleware = (req: any, res: any, next: any) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Không có quyền truy cập' })
    next()
  })
}

// --- Admin Product CRUD ---
app.get('/api/admin/products', adminMiddleware, async (req: any, res: any) => {
  const { page = '1', limit = '50', search, brand, series } = req.query
  const skip = (Number(page) - 1) * Number(limit)
  const take = Number(limit)
  const where: any = {}
  if (search) where.name = { contains: search as string }
  if (brand) where.brandName = brand as string
  if (series) where.series = { contains: series as string }
  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, include: { brand: true }, skip, take, orderBy: { id: 'desc' } }),
    prisma.product.count({ where }),
  ])
  res.json({ products, total, page: Number(page), totalPages: Math.ceil(total / take) })
})

// Build product payload from multipart fields (or JSON) + optional uploaded file
function buildProductData(req: any) {
  const body = req.body || {}
  const data: any = { ...body }
  data.brandId = Number(body.brandId)
  delete data.imageUrl
  if (req.file) {
    data.imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`
  } else if (body.imageUrl) {
    data.imageUrl = body.imageUrl
  }
  return data
}

function validateProduct(data: any) {
  if (!data.name || !data.price || !data.brandId || Number.isNaN(data.brandId)) {
    return 'Thiếu thông tin bắt buộc (tên, giá, thương hiệu)'
  }
  return null
}

app.post('/api/admin/products', adminMiddleware, upload.single('image'), async (req: any, res: any) => {
  const data = buildProductData(req)
  const err = validateProduct(data)
  if (err) return res.status(400).json({ error: err })
  try {
    const product = await prisma.product.create({ data, include: { brand: true } })
    res.json({ ...product, uploaded: !!req.file })
  } catch (e: any) {
    res.status(400).json({ error: 'Tạo sản phẩm thất bại: ' + (e?.message?.split('\n').pop() || 'lỗi không xác định') })
  }
})

app.put('/api/admin/products/:id', adminMiddleware, upload.single('image'), async (req: any, res: any) => {
  const id = Number(req.params.id)
  const data = buildProductData(req)
  const err = validateProduct(data)
  if (err) return res.status(400).json({ error: err })
  try {
    const product = await prisma.product.update({ where: { id }, data, include: { brand: true } })
    res.json({ ...product, uploaded: !!req.file })
  } catch (e: any) {
    res.status(400).json({ error: 'Cập nhật thất bại: ' + (e?.message?.split('\n').pop() || 'lỗi không xác định') })
  }
})

app.delete('/api/admin/products/:id', adminMiddleware, async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } })
  res.json({ ok: true })
})

// --- Admin Brand CRUD ---
app.get('/api/admin/brands', adminMiddleware, async (_req, res) => {
  const brands = await prisma.brand.findMany({ include: { _count: { select: { products: true } } } })
  res.json(brands)
})

app.post('/api/admin/brands', adminMiddleware, async (req, res) => {
  const { name, slug } = req.body
  if (!name) return res.status(400).json({ error: 'Tên thương hiệu là bắt buộc' })
  const brand = await prisma.brand.create({ data: { name, slug: slug || name.toLowerCase() } })
  res.json(brand)
})

app.put('/api/admin/brands/:id', adminMiddleware, async (req, res) => {
  const brand = await prisma.brand.update({ where: { id: Number(req.params.id) }, data: req.body })
  res.json(brand)
})

app.delete('/api/admin/brands/:id', adminMiddleware, async (req, res) => {
  const count = await prisma.product.count({ where: { brandId: Number(req.params.id) } })
  if (count > 0) return res.status(400).json({ error: 'Thương hiệu này đang có sản phẩm, không thể xoá' })
  await prisma.brand.delete({ where: { id: Number(req.params.id) } })
  res.json({ ok: true })
})

// --- Admin User CRUD ---
app.get('/api/admin/users', adminMiddleware, async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(users)
})

app.delete('/api/admin/users/:id', adminMiddleware, async (req, res) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } })
  res.json({ ok: true })
})

// --- Stats ---
async function getStats() {
  const [productCount, brandCount, seriesGroups] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.product.groupBy({ by: ['series'], _count: true }),
  ])
  return {
    totalProducts: productCount,
    totalBrands: brandCount,
    totalSeries: seriesGroups.length,
    topBrands: [],
  }
}

app.get('/api/admin/stats', adminMiddleware, async (_req, res) => {
  res.json(await getStats())
})

app.get('/api/public/stats', async (_req, res) => {
  res.json(await getStats())
})

// Multer / file-filter errors -> readable JSON instead of HTML 500
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(400).json({ error: err?.message || 'Lỗi upload' })
})

// --- Cart API ---
app.post('/api/cart/items', authMiddleware, async (req: any, res: any) => {
  const { productId, quantity = 1 } = req.body
  const userId = req.user.userId
  if (!userId) return res.status(401).json({ error: 'Cần đăng nhập để thêm giỏ hàng' })
  let cart = await prisma.cart.findUnique({ where: { userId } })
  if (!cart) cart = await prisma.cart.create({ data: { userId } })
  const product = await prisma.product.findUnique({ where: { id: Number(productId) } })
  if (!product) return res.status(404).json({ error: 'Sản phẩm không tồn tại' })
  const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId: Number(productId) } })
  if (existing) {
    await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + Number(quantity) } })
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId: Number(productId), quantity: Number(quantity), priceAtTime: product.price } })
  }
  const updated = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } })
  res.json(updated)
})

app.get('/api/cart', authMiddleware, async (req: any, res: any) => {
  const userId = req.user.userId
  if (!userId) return res.status(401).json({ error: 'Cần đăng nhập' })
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } })
  res.json(cart || { items: [] })
})

app.delete('/api/cart/items/:itemId', authMiddleware, async (req: any, res: any) => {
  try {
    await prisma.cartItem.delete({ where: { id: Number(req.params.itemId) } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ' })
  }
})

// --- Order API ---
app.post('/api/orders', authMiddleware, async (req: any, res: any) => {
  const userId = req.user.userId
  if (!userId) return res.status(401).json({ error: 'Cần đăng nhập' })
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } })
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Giỏ hàng trống' })
  const totalAmount = cart.items.reduce((sum: number, item: any) => {
    const price = parsePrice(item.priceAtTime)
    return sum + price * item.quantity
  }, 0).toString()
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      status: 'pending',
      items: { create: cart.items.map((item: any) => ({ productId: item.productId, quantity: item.quantity, priceAtTime: item.priceAtTime })) },
    },
    include: { items: { include: { product: true } } },
  })
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  res.json(order)
})

app.get('/api/orders', authMiddleware, async (req: any, res: any) => {
  const userId = req.user.userId
  if (!userId) return res.status(401).json({ error: 'Cần đăng nhập' })
  const orders = await prisma.order.findMany({ where: { userId }, include: { items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } })
  res.json(orders)
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
