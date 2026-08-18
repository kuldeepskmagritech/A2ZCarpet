import { db } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  
  // Basic search implementation for SQLite
  // In production with PostgreSQL, use Prisma full-text search
  const products = query ? await db.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
        { sku: { contains: query } }
      ],
      isPublished: true
    },
    include: {
      images: { take: 1 },
      categories: { include: { category: true } },
    }
  }) : []

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <div className="max-w-2xl mx-auto mb-12">
        <form className="relative" action="/search" method="GET">
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search for carpets, colors, styles..."
            className="w-full p-4 pl-12 border border-border rounded-lg text-lg focus:outline-none focus:border-primary shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded text-sm font-medium uppercase tracking-wider hover:bg-primary-hover transition-colors">
            Search
          </button>
        </form>
      </div>

      {query && (
        <div className="mb-8 text-center">
          <h2 className="text-xl text-foreground font-serif">
            {products.length} results found for "<span className="text-primary">{query}</span>"
          </h2>
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group border border-border rounded bg-surface p-3 transition-colors hover:border-primary">
              <div className="relative aspect-[4/5] overflow-hidden rounded bg-background mb-3">
                {product.images[0] ? (
                  <Image 
                    src={product.images[0].url} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-border/20">No Image</div>
                )}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {product.categories[0]?.category.name || 'Rug'}
              </div>
              <h3 className="font-serif text-lg text-foreground truncate group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-primary font-medium mt-1">₹{product.basePrice.toLocaleString('en-IN')}</p>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">We couldn't find anything matching your search. Try adjusting your keywords or browse our collections.</p>
          <Link href="/collections" className="inline-block mt-6 border border-primary text-primary px-6 py-3 uppercase text-xs tracking-widest font-medium hover:bg-primary hover:text-white transition-colors">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enter a search term above to explore our extensive catalog of luxury carpets.</p>
        </div>
      )}
    </div>
  )
}
