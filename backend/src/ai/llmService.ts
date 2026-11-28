import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// Initialize Gemini client if key exists, otherwise fallback to mock
const apiKey = process.env.GEMINI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

// Load system prompt from file (allows Tú to update prompt without code changes)
// In ts-node-dev, cwd = backend/, project root is one level up
const SYSTEM_PROMPT_PATH = path.join(process.cwd(), '..', 'prompts', 'system_prompt_v1.md')
let SYSTEM_PROMPT = `Bạn là Chuyên gia Tư vấn Cầu lông của Ace Badminton Shop.`
try {
  SYSTEM_PROMPT = fs.readFileSync(SYSTEM_PROMPT_PATH, 'utf-8')
} catch (e) {
  console.warn('Could not load system_prompt_v1.md, using fallback prompt:', e)
}

interface ChatOptions {
  budget?: number // max budget in VND
}

export async function handleChatMessage(
  userMessage: string,
  history: { role: 'user' | 'assistant'; content: string }[] = [],
  options: ChatOptions = {}
): Promise<string> {
  // Fetch products for context grounding
  // If budget provided, fetch more products to have better selection after filtering
  const take = options.budget ? 100 : 20
  const products = await prisma.product.findMany({
    take,
    include: { brand: true },
  })

  // Filter by budget if provided (parse price strings to VND for comparison)
  let filteredProducts = products
  if (options.budget && options.budget > 0) {
    filteredProducts = products.filter(p => parsePriceToVND(p.price) <= options.budget!)
    // If too few after filtering, fall back to all products
    if (filteredProducts.length < 3) {
      console.warn(`Only ${filteredProducts.length} products under budget ${options.budget}, falling back to all products`)
      filteredProducts = products
    }
  }

  const productContext = filteredProducts.map(p =>
    `- ${p.name} (${p.brand.name}): Giá ${p.price}, Trọng lượng ${p.weight}, Độ cứng ${p.stiffness}, Cân bằng ${p.balance}, Lối chơi: ${p.playstyle}`
  ).join('\n')

  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nDanh sách sản phẩm tham khảo tại Ace Badminton:\n${productContext}`

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash-latest',
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })

      const chatHistory = history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      }))

      const chat = model.startChat({ history: chatHistory })

      // Combine system prompt with user message for the first turn
      const prompt = history.length === 0
        ? `${fullSystemPrompt}\n\nKhách hàng hỏi: ${userMessage}`
        : userMessage

      const result = await chat.sendMessage(prompt)
      const response = result.response.text()

      return response || 'Xin lỗi, tôi không thể xử lý câu hỏi lúc này.'
    } catch (e: any) {
      console.error('Gemini Error:', e)
      // Fall through to smart rule-based fallback if Gemini call fails
    }
  }

  // Fallback AI Rule Engine (when GEMINI_API_KEY is missing or fails)
  return generateRuleBasedResponse(userMessage, filteredProducts)
}

// Helper: parse price string to VND for budget filtering
function parsePriceToVND(priceStr: string): number {
  if (!priceStr) return Infinity
  const map: Record<string, number> = { 'triệu': 1_000_000, 'tỷ': 1_000_000_000, 'nghìn': 1_000 }
  const matches = [...priceStr.matchAll(/([\d,.]+)\s*([a-zà-ỹ]+)/gi)]
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1]
    const num = parseFloat(lastMatch[1].replace(',', '.'))
    const unit = lastMatch[2].toLowerCase()
    return num * (map[unit] || 1)
  }
  const nums = priceStr.match(/[\d,.]+/g)
  if (nums && nums.length > 0) {
    return parseFloat(nums[nums.length - 1].replace(',', '.'))
  }
  return Infinity
}

function generateRuleBasedResponse(query: string, products: any[]): string {
  const q = query.toLowerCase()

  // Match attack / smash
  if (q.includes('tấn công') || q.includes('smash') || q.includes('mạnh')) {
    const matched = products.filter(p => p.balance?.includes('Nặng đầu') || p.playstyle?.toLowerCase().includes('smash'))
    const list = matched.slice(0, 3).map(p => `• **${p.name}** (${p.brand.name}) - Giá: ${p.price}\n  Lối chơi: ${p.playstyle}`).join('\n')
    return `Dựa vào lối chơi **tấn công / smash uy lực**, tôi đề xuất các dòng vợt **nặng đầu** tốt nhất tại Ace Badminton:\n\n${list}\n\n👉 Bạn muốn tìm trong khoảng giá nào cụ thể hơn không?`
  }

  // Match budget / price
  if (q.includes('giá') || q.includes('rẻ') || q.includes('dưới 2 triệu') || q.includes('triệu')) {
    const list = products.slice(0, 3).map(p => `• **${p.name}** (${p.brand.name}) - Giá: ${p.price}`).join('\n')
    return `Ace Badminton có nhiều lựa chọn tốt trong tầm giá hợp lý:\n\n${list}\n\n👉 Bạn thích thương hiệu nào hơn (Yonex, Victor hay Lining)?`
  }

  // Match beginner / defense
  if (q.includes('mới') || q.includes('phòng thủ') || q.includes('dễ đánh') || q.includes('nhẹ')) {
    const list = products.filter(p => p.stiffness?.includes('Trung bình') || p.weight?.includes('4U')).slice(0, 3)
      .map(p => `• **${p.name}** (${p.brand.name}) - Giá: ${p.price}\n  Đặc điểm: Cán trung bình/dễ trợ lực`).join('\n')
    return `Cho người mới chơi hoặc thích lối đánh **phòng thủ, phản tạt**, bạn nên chọn vợt thân dẻo/trung bình trợ lực tốt:\n\n${list}\n\n👉 Bạn cần tư vấn thêm về chọn dây căng không?`
  }

  // Generic fallback with product suggestions
  const top3 = products.slice(0, 3).map(p => `• **${p.name}** (${p.brand.name}): ${p.price}`).join('\n')
  return `Cảm ơn bạn đã liên hệ Ace Badminton! Cửa hàng chúng tôi có sẵn hơn 190+ sản phẩm chính hãng Yonex, Victor, Lining.\n\nMột số sản phẩm nổi bật:\n${top3}\n\n👉 Bạn có thể cho tôi biết trình độ chơi (mới tập/phong trào/chuyên nghiệp) và ngân sách của bạn để tư vấn chính xác nhất!`
}