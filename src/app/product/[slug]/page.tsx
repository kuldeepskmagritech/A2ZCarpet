import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { Star, ChevronRight, CheckCircle2, ShieldCheck, Ruler, Truck } from 'lucide-react'
import { AddToCartButton } from '@/components/cart/AddToCartButton'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const product = await db.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: true,
      collections: { include: { collection: true } }
    }
  })

  if (!product) {
    notFound()
  }

  const primaryCollection = product.collections[0]?.collection

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        {primaryCollection && (
          <>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/shop?collection=${primaryCollection.slug}`} className="hover:text-primary">{primaryCollection.name}</Link>
          </>
        )}
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            {product.images[0] && (
              <Image 
                src={product.images[0].url} 
                alt={product.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((img) => (
              <div key={img.id} className="aspect-square bg-gray-100 rounded relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary">
                <Image src={img.url} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-serif mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex text-primary">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm text-text-muted">(12 Reviews)</span>
            <span className="text-sm font-medium text-green-600">Availability: In Stock</span>
          </div>

          <p className="text-3xl font-bold mb-2">₹ {product.basePrice.toLocaleString('en-IN')}</p>
          <p className="text-xs text-text-muted mb-6">Price per sq.ft. (Approx.)</p>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-y-3 text-sm mb-8 bg-surface border border-border p-4 rounded">
            {primaryCollection && (
              <div className="flex items-center gap-2"><span className="text-text-muted w-24">Collection:</span> <span className="font-medium">{primaryCollection.name}</span></div>
            )}
            <div className="flex items-center gap-2"><span className="text-text-muted w-24">Material:</span> <span className="font-medium">Wool & Silk</span></div>
            <div className="flex items-center gap-2"><span className="text-text-muted w-24">Technique:</span> <span className="font-medium">Hand Knotted</span></div>
            <div className="flex items-center gap-2"><span className="text-text-muted w-24">Origin:</span> <span className="font-medium">Bhadohi, India</span></div>
          </div>

          {/* Variant Selector */}
          {product.variants.length > 0 && (
            <div className="mb-8">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-3">Size</h4>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, idx) => (
                  <button key={v.id} className={`px-4 py-2 border rounded text-sm ${idx === 0 ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-border text-foreground hover:border-primary'}`}>
                    {v.size}
                  </button>
                ))}
                <button className="px-4 py-2 border border-border rounded text-sm text-foreground hover:border-primary">
                  Custom Size
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.basePrice,
                image: product.images[0]?.url || '/placeholder.png'
              }}
            />
            <Link href="https://wa.me/918558085579" target="_blank" className="flex-1 bg-surface border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded font-bold transition-colors text-center flex items-center justify-center">
              WHATSAPP US
            </Link>
          </div>

          {/* Details */}
          <div className="prose prose-sm max-w-none text-text-muted">
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-10 border-y border-border mb-16 bg-surface">
        <div className="flex flex-col items-center text-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium">Premium<br/>Quality</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <Ruler className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium">Custom Sizes<br/>Available</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <CheckCircle2 className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium">Anti-Bacterial<br/>Treated</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <Truck className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium">Quick<br/>Delivery</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <Star className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium">Professional<br/>Installation</span>
        </div>
      </div>
    </div>
  )
}
