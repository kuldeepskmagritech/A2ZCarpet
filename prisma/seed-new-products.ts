import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding reference products from PDFs...')

  const collections = [
    { name: 'Heritage Carpet', slug: 'heritage' },
    { name: 'Life Style', slug: 'lifestyle' },
    { name: 'Elegance', slug: 'elegance' },
    { name: 'Infinity', slug: 'infinity' },
  ]

  // Upsert Collections
  for (const c of collections) {
    await prisma.collection.upsert({
      where: { slug: c.slug },
      update: {},
      create: { name: c.name, slug: c.slug, isActive: true },
    })
  }

  const heritageId = (await prisma.collection.findUnique({ where: { slug: 'heritage' } }))!.id
  const lifestyleId = (await prisma.collection.findUnique({ where: { slug: 'lifestyle' } }))!.id
  const eleganceId = (await prisma.collection.findUnique({ where: { slug: 'elegance' } }))!.id
  const infinityId = (await prisma.collection.findUnique({ where: { slug: 'infinity' } }))!.id

  const productsData = [
    // --- HERITAGE ---
    {
      name: 'Floral Medallion Carpet',
      slug: 'floral-medallion-carpet',
      sku: 'HER-001',
      description: 'This luxurious handcrafted carpet features an elegant floral medallion design with intricate scrollwork and soft pastel tones of ivory, blue, red, and gold. Its grand size and detailed artistry create a royal, premium look—perfect for palaces, banquet halls, luxury villas, and high-end interiors.',
      basePrice: 226000,
      collectionId: heritageId
    },
    {
      name: 'Floral Palace Carpet',
      slug: 'floral-palace-carpet',
      sku: 'HER-002',
      description: 'An elegant luxury carpet featuring intricate floral and ornamental patterns in soft gold, pink, green, and blue tones. Its grand symmetrical design and rich detailing create a royal, premium look perfect for sophisticated interiors.',
      basePrice: 226000,
      collectionId: heritageId
    },
    {
      name: 'Floral Vine Handwoven Carpet',
      slug: 'floral-vine-handwoven-carpet',
      sku: 'HER-003',
      description: 'This elegant handcrafted carpet features a soft ivory base with intricate floral vine patterns in green, red, pink, and golden tones. Its luxurious design adds a royal and sophisticated charm, perfect for premium interiors and grand spaces.',
      basePrice: 226000,
      collectionId: heritageId
    },
    {
      name: 'Blossom Heritage Carpet',
      slug: 'blossom-heritage-carpet',
      sku: 'HER-004',
      description: 'This elegant luxury carpet features a grand floral and geometric design with soft beige tones, highlighted by blue, green, and gold accents. Its premium handcrafted look adds sophistication and royal charm to spacious interiors.',
      basePrice: 226000,
      collectionId: heritageId
    },
    {
      name: 'Royal Heritage Medallion Carpet',
      slug: 'royal-heritage-medallion-carpet',
      sku: 'HER-005',
      description: 'This elegant carpet features a luxurious cream base with intricate floral border patterns in rich gold, red, and blue tones. Its classic medallion motifs and detailed craftsmanship create a royal, premium look perfect for grand interiors and sophisticated spaces.',
      basePrice: 226000,
      collectionId: heritageId
    },

    // --- LIFE STYLE ---
    {
      name: 'Silver Mist Strata Carpet',
      slug: 'silver-mist-strata-carpet',
      sku: 'LIF-001',
      description: 'A luxurious modern bedroom featuring a full-wall fitted textured carpet in elegant grey tones. The space is designed with premium interiors, warm ambient lighting, sleek furniture, and a sophisticated aesthetic that creates a calm and upscale atmosphere.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Elegant Earth Tone Textured Carpet',
      slug: 'elegant-earth-tone-textured-carpet',
      sku: 'LIF-002',
      description: 'This carpet features a sophisticated textured weave in warm grey and brown tones, creating a cozy and elegant look. Its wall-to-wall design adds seamless comfort, while the subtle pattern enhances the room’s modern luxury ambiance.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Modern Textured Striped Luxury Carpet',
      slug: 'modern-textured-striped-luxury-carpet',
      sku: 'LIF-003',
      description: 'This carpet features a modern textured stripe design in soft grey, beige, and charcoal tones. Its elegant neutral palette adds warmth and sophistication, making it perfect for luxury living rooms and contemporary interiors.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Rustic Earth Texture Carpet',
      slug: 'rustic-earth-texture-carpet',
      sku: 'LIF-004',
      description: 'This carpet features a warm earthy brown tone with a subtle textured striped pattern, giving it a natural and elegant look. Its wall-to-wall seamless finish adds comfort, sophistication, and a premium touch to the luxury interior space.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Golden Earth Texture Carpet',
      slug: 'golden-earth-texture-carpet',
      sku: 'LIF-005',
      description: 'This premium wall-to-wall carpet features a rich golden-brown tone with elegant textured patterns that add warmth and depth to the room. Its soft finish and luxurious design create a cozy, sophisticated, and modern bedroom atmosphere.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Urban Shadow Stripes Carpet',
      slug: 'urban-shadow-stripes-carpet',
      sku: 'LIF-006',
      description: 'This carpet features a modern luxury design with elegant charcoal and grey tones, highlighted by bold linear patterns. Its wall-to-wall installation creates a seamless, premium look while adding warmth, texture, and sophistication to the bedroom interior.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Emerald Geometric Luxe Carpet',
      slug: 'emerald-geometric-luxe-carpet',
      sku: 'LIF-007',
      description: 'This premium carpet features a rich forest green base with bold abstract line patterns, creating a modern and sophisticated look. Its soft textured finish adds warmth, comfort, and luxury—perfect for upscale halls, lounges, and elegant interior spaces.',
      basePrice: 150000,
      collectionId: lifestyleId
    },
    {
      name: 'Golden Sand Textured Luxe Carpet',
      slug: 'golden-sand-textured-luxe-carpet',
      sku: 'LIF-008',
      description: 'This elegant carpet features warm beige and sand tones with a subtle textured pattern, creating a calm and sophisticated look. Its soft premium finish adds comfort and luxury, making it perfect for stylish bedrooms and modern interiors.',
      basePrice: 150000,
      collectionId: lifestyleId
    },

    // --- ELEGANCE ---
    {
      name: 'Ocean Wave Abstract Luxury Carpet',
      slug: 'ocean-wave-abstract-luxury-carpet',
      sku: 'ELE-001',
      description: 'This carpet features a modern abstract wave design in deep navy blue, soft cream, and muted grey tones. Its flowing pattern adds elegance and movement, making the bedroom look luxurious, stylish, and premium.',
      basePrice: 210000,
      collectionId: eleganceId
    },
    {
      name: 'Sage Marble Luxe Carpet',
      slug: 'sage-marble-luxe-carpet',
      sku: 'ELE-002',
      description: 'This carpet features a modern abstract marble-inspired design in soft sage green, ivory, and grey tones. Its flowing organic pattern adds elegance and depth, making it a perfect choice for luxury halls, living rooms, and premium contemporary interiors.',
      basePrice: 210000,
      collectionId: eleganceId
    },
    {
      name: 'Desert Harmony Wave Carpet',
      slug: 'desert-harmony-wave-carpet',
      sku: 'ELE-003',
      description: 'This elegant abstract carpet features flowing wave patterns in warm beige, cream, taupe, and brown tones. Its soft neutral palette and modern design bring a luxurious, calming, and sophisticated touch to any hall or living space.',
      basePrice: 210000,
      collectionId: eleganceId
    },
    {
      name: 'Sage Blossom Elegance Carpet',
      slug: 'sage-blossom-elegance-carpet',
      sku: 'ELE-004',
      description: 'A stylish modern carpet featuring an abstract floral pattern in soothing sage green, beige, taupe, and deep charcoal tones. Its soft earthy palette and artistic design bring warmth, elegance, and a luxurious natural feel to any interior space.',
      basePrice: 210000,
      collectionId: eleganceId
    },
    {
      name: 'Desert Harmony Abstract Carpet',
      slug: 'desert-harmony-abstract-carpet',
      sku: 'ELE-005',
      description: 'This elegant carpet features a modern abstract design with flowing curves in warm beige, cream, taupe, and brown tones. Its soft neutral palette adds a luxurious, calm, and sophisticated touch, making it perfect for premium bedrooms and contemporary interiors.',
      basePrice: 210000,
      collectionId: eleganceId
    },
    {
      name: 'Sage Wave Elegance Carpet',
      slug: 'sage-wave-elegance-carpet',
      sku: 'ELE-006',
      description: 'This carpet features a modern abstract wave design in soothing sage green, beige, and cream tones. Its flowing line patterns create a calm, elegant look that adds depth and sophistication to luxury interiors. Soft earthy shades make it perfect for contemporary bedrooms and premium living spaces.',
      basePrice: 210000,
      collectionId: eleganceId
    }
  ]

  // Add Infinity items 01 to 18
  for (let i = 1; i <= 18; i++) {
    const num = i.toString().padStart(2, '0')
    productsData.push({
      name: `Infinity ${num}`,
      slug: `infinity-${num}`,
      sku: `INF-${num}`,
      description: `Bespoke custom rug from the Bhadohi Arts Weave Infinity Collection.`,
      basePrice: 0, // Custom Quote
      collectionId: infinityId
    })
  }

  let count = 0
  for (const product of productsData) {
    const exists = await prisma.product.findUnique({ where: { slug: product.slug } })
    if (!exists) {
      const created = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          description: product.description,
          basePrice: product.basePrice,
          isPublished: true,
          images: {
            create: {
              url: '/logo1.png', // Placeholder
              altText: product.name
            }
          },
          collections: {
            create: {
              collectionId: product.collectionId
            }
          }
        }
      })
      count++
      console.log(`Created: ${created.name}`)
    }
  }

  console.log(`Successfully seeded ${count} new products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
