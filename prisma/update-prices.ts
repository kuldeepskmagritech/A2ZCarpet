import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating products with 0 basePrice to random amounts between 8000 and 30000...')

  const productsToUpdate = await prisma.product.findMany({
    where: {
      basePrice: 0
    }
  })

  let count = 0
  for (const product of productsToUpdate) {
    const randomPrice = Math.floor(Math.random() * (30000 - 8000 + 1)) + 8000

    await prisma.product.update({
      where: { id: product.id },
      data: { basePrice: randomPrice }
    })
    
    count++
    console.log(`Updated ${product.name} to ₹${randomPrice}`)
  }

  console.log(`Successfully updated ${count} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
