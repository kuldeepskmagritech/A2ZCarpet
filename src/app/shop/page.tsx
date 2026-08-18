import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/lib/db'
import { Star, SlidersHorizontal, ChevronRight } from 'lucide-react'
import { AddToCartButton } from '@/components/cart/AddToCartButton'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const search = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined
  const collectionSlug = typeof resolvedSearchParams.collection === 'string' ? resolvedSearchParams.collection : undefined

  // Construct query
  const where: any = { isPublished: true }
  
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { sku: { contains: search } }
    ]
  }

  if (collectionSlug) {
    where.collections = {
      some: {
        collection: {
          slug: collectionSlug
        }
      }
    }
  }

  const products = await db.product.findMany({
    where,
    include: { images: { take: 1 } },
    take: 12,
    skip: (page - 1) * 12,
    orderBy: { createdAt: 'desc' }
  })

  const totalProducts = await db.product.count({ where })

  const collections = await db.collection.findMany({ where: { isActive: true } })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Shop</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="font-serif font-bold text-lg">Filters</h3>
              <SlidersHorizontal className="w-5 h-5 text-text-muted" />
            </div>

            {/* Categories / Collections */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Collections</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/shop" className={`block ${!collectionSlug ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'}`}>
                    All Collections
                  </Link>
                </li>
                {collections.map(c => (
                  <li key={c.id}>
                    <Link 
                      href={`/shop?collection=${c.slug}`} 
                      className={`block ${collectionSlug === c.slug ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <p className="text-sm text-text-muted">Showing {products.length} of {totalProducts} products</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Sort by:</span>
              <select className="border border-border rounded px-2 py-1 bg-surface outline-none focus:border-primary">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              No products found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-surface border border-border p-4 rounded group">
                  <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden rounded relative">
                    {product.images[0] && (
                      <Image 
                        src={product.images[0].url} 
                        alt={product.images[0].altText || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h4 className="font-serif font-medium mb-1 truncate" title={product.name}>{product.name}</h4>
                  <div className="flex text-primary mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-xs text-text-muted mb-2">Handmade</p>
                  <p className="font-bold text-sm mb-4">From ₹ {product.basePrice.toLocaleString('en-IN')}</p>
                  <div className="flex gap-2">
                    <Link href={`/product/${product.slug}`} className="flex-1 text-center border border-primary text-primary hover:bg-primary hover:text-white py-2 text-xs font-bold transition-colors rounded">
                      DETAILS
                    </Link>
                    <AddToCartButton 
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.basePrice,
                        image: product.images[0]?.url || '/placeholder.png'
                      }}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 rounded text-xs font-bold transition-colors disabled:opacity-70"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
