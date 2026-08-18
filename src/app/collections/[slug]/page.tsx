import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Star, Heart } from 'lucide-react'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { db } from '@/lib/db'

const collectionsData: Record<string, {
  title: string
  tagline: string
  description: string
  image: string
}> = {
  heritage: {
    title: 'Heritage Collection',
    tagline: 'Timeless royal craftsmanship',
    description: 'Intricate patterns, classic motifs and rich textures inspired by royal traditions. Bringing elegance and grandeur to every space.',
    image: '/assets/rug-heritage-1-BgXMZOfx.jpg',
  },
  handloom: {
    title: 'Handloom Collection',
    tagline: 'Woven by master artisans',
    description: 'Traditional handloom carpets crafted with skill passed down generations. Natural fibers, subtle geometry, quiet character.',
    image: '/assets/rug-handloom-kCmBu6oB.jpg',
  },
  elegance: {
    title: 'Elegance Collection',
    tagline: 'Refined contemporary luxury',
    description: 'Modern silhouettes and refined palettes for the discerning interior. Understated, elegant, effortlessly luxurious.',
    image: '/assets/rug-heritage-2-0LWj_IYB.jpg',
  },
  lifestyle: {
    title: 'Lifestyle Collection',
    tagline: 'Everyday-luxury living',
    description: 'Durable, beautiful carpets designed for real homes and modern life.',
    image: '/assets/rug-vintage-BXqSO7Ht.jpg',
  },
  'silk-rugs': {
    title: 'Silk Rugs Collection',
    tagline: 'The finest hand-knotted silk',
    description: 'Luminous silk rugs with breathtaking sheen and depth. The pinnacle of the weaver\'s art.',
    image: '/assets/rug-silk-1-CK7sEbmK.jpg',
  },
  'machine-made': {
    title: 'Machine Made Rugs',
    tagline: 'Precision at accessible value',
    description: 'Consistent quality and design flexibility at scale, without compromising the A2Z aesthetic.',
    image: '/assets/rug-imperial-gkvxSy54.jpg',
  },
  infinity: {
    title: 'Infinity Collection',
    tagline: 'Boundless custom design',
    description: 'Fully bespoke rugs — your pattern, your palette, your size.',
    image: '/assets/rug-heritage-1-BgXMZOfx.jpg',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = collectionsData[slug] || { title: 'Collection — A2Z Carpet' }
  return {
    title: `${collection.title} — A2Z Carpet`,
    description: collection.description || 'Premium handmade carpets from Bhadohi.',
  }
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = collectionsData[slug] || collectionsData.heritage

  const dbProducts = await db.product.findMany({
    where: {
      isPublished: true,
      collections: {
        some: { collection: { slug } }
      }
    },
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } }
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative bg-[#FAF7F2]">
        <div className="grid lg:grid-cols-2 min-h-[380px]">
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="text-xs text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link> <span className="mx-2">›</span>
              <Link href="/collections" className="hover:text-primary">Collections</Link> <span className="mx-2">›</span>
              {collection.title}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl">{collection.title}</h1>
            <div className="w-12 h-[2px] bg-primary rounded-[2px] mt-3" />
            <p className="mt-4 text-muted-foreground max-w-lg text-sm leading-relaxed">{collection.description}</p>
            <div className="flex gap-6 mt-6 flex-wrap">
              <div className="flex flex-col items-center text-center w-24">
                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                <span className="text-[11px] text-muted-foreground">Handcrafted Excellence</span>
              </div>
              <div className="flex flex-col items-center text-center w-24">
                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                <span className="text-[11px] text-muted-foreground">Premium Materials</span>
              </div>
              <div className="flex flex-col items-center text-center w-24">
                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                <span className="text-[11px] text-muted-foreground">Intricate Designs</span>
              </div>
              <div className="flex flex-col items-center text-center w-24">
                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                <span className="text-[11px] text-muted-foreground">Long Lasting</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[300px]">
            <Image src={collection.image} alt={collection.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Main Catalog & Filter Section */}
      <section className="container mx-auto px-4 md:px-8 py-16 grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="space-y-8 text-sm">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4 font-medium">Categories</div>
            <ul className="space-y-2">
              <li>
                <Link href="/collections" className="hover:text-primary transition-colors">All Collections</Link>
              </li>
              {Object.entries(collectionsData).map(([key, item]) => (
                <li key={key}>
                  <Link
                    href={`/collections/${key}`}
                    className={`transition-colors ${key === slug ? 'text-primary font-medium' : 'hover:text-primary'}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">Showing {dbProducts.length} products</div>
            <select className="border border-border bg-card px-3 py-2 text-sm rounded">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbProducts.map((product) => (
              <div key={product.id} className="group flex flex-col border border-border rounded-md overflow-hidden bg-card">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <Image src={product.images[0]?.url || '/placeholder.png'} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <button aria-label="Save to wishlist" className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur rounded-full hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 mt-2">From <span className="font-medium">₹ {product.basePrice.toLocaleString('en-IN')}</span></p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/product/${product.slug}`} className="flex-1 text-center border border-primary text-primary px-3 py-2 text-[11px] tracking-widest uppercase hover:bg-primary hover:text-white transition-colors font-medium rounded">
                      DETAILS
                    </Link>
                    <AddToCartButton 
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.basePrice,
                        image: product.images[0]?.url || '/placeholder.png'
                      }}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white px-3 py-2 text-[11px] tracking-widest uppercase transition-colors font-medium rounded disabled:opacity-70"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
