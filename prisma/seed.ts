import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clean up existing data (in a specific order to avoid foreign key constraint errors)
  await prisma.portfolioImage.deleteMany()
  await prisma.portfolioProject.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.productCollection.deleteMany()
  await prisma.productCategory.deleteMany()
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@a2zcarpet.com',
      passwordHash: 'placeholder_hash_please_change', // In reality, we'd hash this
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    }
  })
  console.log('Created Admin User:', adminUser.email)

  // 2. Create Collections based on PDFs
  const collectionsData = [
    { name: 'Heritage Collection', slug: 'heritage' },
    { name: 'Handloom Collection', slug: 'handloom' },
    { name: 'Elegance Collection', slug: 'elegance' },
    { name: 'Lifestyle Collection', slug: 'lifestyle' },
    { name: 'Silk Rugs Collection', slug: 'silk-rugs' },
    { name: 'Machine Made Rugs', slug: 'machine-made' },
    { name: 'Infinity Collection', slug: 'infinity' },
    { name: 'Regulus Collection', slug: 'regulus' }, // From the images folder
  ]

  const collections = []
  for (const c of collectionsData) {
    const col = await prisma.collection.create({
      data: {
        name: c.name,
        slug: c.slug,
        description: `Explore our premium ${c.name}, crafted with precision and passion.`,
        isActive: true,
      }
    })
    collections.push(col)
  }
  console.log('Created Collections:', collections.length)

  // 3. Create Categories
  const categoriesData = [
    { name: 'Living Room', slug: 'living-room' },
    { name: 'Bedroom', slug: 'bedroom' },
    { name: 'Dining Room', slug: 'dining-room' },
    { name: 'Office', slug: 'office' },
    { name: 'Hotel', slug: 'hotel' },
  ]

  const categories = []
  for (const c of categoriesData) {
    const cat = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        isActive: true,
      }
    })
    categories.push(cat)
  }
  console.log('Created Categories:', categories.length)

  // 4. Create Sample Products from Regulus Collection Images and UI screenshots
  const sampleProducts = [
    {
      name: 'Royal Heritage Carpet',
      slug: 'royal-heritage-carpet',
      sku: 'HC-001',
      basePrice: 23000,
      description: '[PLACEHOLDER] Experience the grandeur of traditional weaving.',
      collectionSlug: 'heritage',
      image: '/Regulus Collection images/1001.jpg',
    },
    {
      name: 'Floral Palace Carpet',
      slug: 'floral-palace-carpet',
      sku: 'HC-002',
      basePrice: 23000,
      description: '[PLACEHOLDER] Intricate floral designs for a royal touch.',
      collectionSlug: 'heritage',
      image: '/Regulus Collection images/1003.jpg',
    },
    {
      name: 'Silver Mist Strata Carpet',
      slug: 'silver-mist-strata',
      sku: 'SM-001',
      basePrice: 21000,
      description: '[PLACEHOLDER] A modern abstract design with silver hues.',
      collectionSlug: 'lifestyle',
      image: '/Regulus Collection images/201-D.jpg',
    },
    {
      name: 'Misty Tide Carpet',
      slug: 'misty-tide',
      sku: 'MT-001',
      basePrice: 21000,
      description: '[PLACEHOLDER] Calming ocean-inspired abstract carpet.',
      collectionSlug: 'lifestyle',
      image: '/Regulus Collection images/202A.jpg',
    },
    {
      name: 'Golden Ember Carpet',
      slug: 'golden-ember',
      sku: 'GE-001',
      basePrice: 23000,
      description: '[PLACEHOLDER] Warm golden tones for a cozy atmosphere.',
      collectionSlug: 'elegance',
      image: '/Regulus Collection images/301.jpg',
    }
  ]

  for (const sp of sampleProducts) {
    const collection = collections.find(c => c.slug === sp.collectionSlug)
    const product = await prisma.product.create({
      data: {
        name: sp.name,
        slug: sp.slug,
        sku: sp.sku,
        description: sp.description,
        basePrice: sp.basePrice,
        isPublished: true,
        isFeatured: true,
        isBestSeller: true,
        images: {
          create: {
            url: sp.image,
            altText: sp.name,
          }
        },
        variants: {
          create: [
            {
              sku: `${sp.sku}-5x7`,
              size: '5x7',
              price: sp.basePrice,
              stock: 10,
            },
            {
              sku: `${sp.sku}-8x10`,
              size: '8x10',
              price: sp.basePrice * 1.5,
              stock: 5,
            }
          ]
        }
      }
    })

    if (collection) {
      await prisma.productCollection.create({
        data: {
          productId: product.id,
          collectionId: collection.id,
        }
      })
    }

    // Add to a random category
    const randomCat = categories[Math.floor(Math.random() * categories.length)]
    await prisma.productCategory.create({
      data: {
        productId: product.id,
        categoryId: randomCat.id,
      }
    })
  }
  console.log('Created Sample Products:', sampleProducts.length)

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
