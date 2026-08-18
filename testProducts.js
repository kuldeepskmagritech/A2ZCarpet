const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const products = await prisma.product.findMany()
  console.log(products.map(p => p.name))
}
main().finally(() => prisma.$disconnect())
