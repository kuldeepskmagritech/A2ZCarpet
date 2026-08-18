const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@a2zcarpet.com' },
    update: {},
    create: {
      email: 'admin@a2zcarpet.com',
      passwordHash: 'dummy',
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    }
  })
  console.log('Admin user created successfully:', user.email)
}

main().catch(console.error).finally(() => prisma.$disconnect())
