import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Collections — A2Z Carpet',
  description: 'Explore our premium carpet collections crafted in Bhadohi, India.',
}

export default function CollectionsPage() {
  const collections = [
    {
      title: 'Heritage Collection',
      slug: 'heritage',
      description: 'Intricate patterns, classic motifs and rich textures inspired by royal traditions. Bringing elegance and grandeur to every space.',
      image: '/assets/rug-heritage-1-BgXMZOfx.jpg',
    },
    {
      title: 'Handloom Collection',
      slug: 'handloom',
      description: 'Traditional handloom carpets crafted with skill passed down generations. Natural fibers, subtle geometry, quiet character.',
      image: '/assets/rug-handloom-kCmBu6oB.jpg',
    },
    {
      title: 'Elegance Collection',
      slug: 'elegance',
      description: 'Modern silhouettes and refined palettes for the discerning interior. Understated, elegant, effortlessly luxurious.',
      image: '/assets/rug-heritage-2-0LWj_IYB.jpg',
    },
    {
      title: 'Lifestyle Collection',
      slug: 'lifestyle',
      description: 'Durable, beautiful carpets designed for real homes and modern life.',
      image: '/assets/rug-vintage-BXqSO7Ht.jpg',
    },
    {
      title: 'Silk Rugs Collection',
      slug: 'silk-rugs',
      description: 'Luminous silk rugs with breathtaking sheen and depth. The pinnacle of the weaver\'s art.',
      image: '/assets/rug-silk-1-CK7sEbmK.jpg',
    },
    {
      title: 'Machine Made Rugs',
      slug: 'machine-made',
      description: 'Consistent quality and design flexibility at scale, without compromising the A2Z aesthetic.',
      image: '/assets/rug-imperial-gkvxSy54.jpg',
    },
    {
      title: 'Infinity Collection',
      slug: 'infinity',
      description: 'Fully bespoke rugs — your pattern, your palette, your size.',
      image: '/assets/rug-heritage-1-BgXMZOfx.jpg',
    },
  ]

  return (
    <section className="container mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-12">
        <div className="text-primary text-xs uppercase tracking-[0.22em] font-medium mb-3">Our Collections</div>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">Explore Our Carpet Collections</h1>
        <div className="mt-3 mx-auto w-12 h-[2px] bg-primary rounded-[2px]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((item, i) => (
          <div key={i} className="bg-card border border-border overflow-hidden rounded-lg group flex flex-col">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
              <Link
                href={`/collections/${item.slug}`}
                className="mt-6 w-full inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2.5 text-xs tracking-widest uppercase font-medium transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
