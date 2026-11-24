import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

interface RawProduct {
  name: string
  brand: string
  series: string
  price: string
  weight: string
  stiffness: string
  balance: string
  playstyle: string
  image: string
}

async function main() {
  const raw = fs.readFileSync('all_products.json', 'utf-8')
  const products: RawProduct[] = JSON.parse(raw)

  // Upsert brands
  const brandMap = new Map<string, number>()
  for (const brandName of [...new Set(products.map(p => p.brand))]) {
    const upserted = await prisma.brand.upsert({
      where: { slug: brandName.toLowerCase() },
      update: {},
      create: { name: brandName, slug: brandName.toLowerCase() },
    })
    brandMap.set(brandName, upserted.id)
  }

  // Insert products
  let inserted = 0
  for (const p of products) {
    const brandId = brandMap.get(p.brand)
    if (!brandId) continue
    await prisma.product.create({
      data: {
        name: p.name,
        series: p.series.trim(),
        price: p.price,
        weight: p.weight,
        stiffness: p.stiffness,
        balance: p.balance,
        playstyle: p.playstyle,
        imageUrl: p.image || '',
        brandId,
      },
    })
    inserted++
  }

  console.log(`Seed done: ${brands.size} brands, ${inserted} products`)
}

const brands = new Set(['Yonex', 'Lining', 'Victor'])
main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })