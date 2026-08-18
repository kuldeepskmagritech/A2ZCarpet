import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/lib/db'
import { 
  Award, 
  Layers, 
  Settings, 
  Globe, 
  CheckCircle, 
  ShieldCheck,
  Sofa,
  BedDouble,
  Building2,
  Briefcase,
  Stethoscope,
  GlassWater,
  Building,
  ChevronRight,
  Star
} from 'lucide-react'
import { AddToCartButton } from '@/components/cart/AddToCartButton'

export default async function Home() {
  const collections = await db.collection.findMany({
    where: { isActive: true },
    take: 6,
  })

  const bestSellers = await db.product.findMany({
    where: { isBestSeller: true, isPublished: true },
    include: { images: { take: 1 } },
    take: 5,
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[800px] flex items-center">
        <div className="absolute inset-0 z-0 bg-[#e6ddd0]">
          <Image 
            src="/assets/hero-carpet-BmZYYtIC.jpg" 
            alt="Luxury Carpet Collection" 
            fill 
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary font-medium tracking-widest text-sm uppercase">Handcrafted Luxury</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
              Luxury Carpets<br />
              Crafted to<br />
              <span className="text-primary italic">Transform</span><br />
              Every Space
            </h1>
            <p className="text-text-muted text-lg mb-8 max-w-lg">
              Handmade • Handloom • Heritage • Machine Made<br />Wall-to-Wall Carpets
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/collections" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded text-sm font-medium transition-colors">
                EXPLORE COLLECTION
              </Link>
              <Link href="/catalogues" className="bg-surface hover:bg-background border-2 border-border text-foreground px-8 py-3 rounded text-sm font-medium transition-colors">
                REQUEST CATALOGUE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { icon: Award, title: "20+", subtitle: "Years Experience" },
              { icon: Layers, title: "5000+", subtitle: "Carpet Designs" },
              { icon: Settings, title: "100%", subtitle: "Customization" },
              { icon: Globe, title: "Worldwide", subtitle: "Shipping" },
              { icon: CheckCircle, title: "1000+", subtitle: "Projects Completed" },
              { icon: ShieldCheck, title: "Quality", subtitle: "Assurance" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-2">
                <stat.icon className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-bold text-lg">{stat.title}</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">{stat.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Collections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Explore Our Range</span>
            <h2 className="text-4xl font-serif mb-4">Our Premium Collections</h2>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="w-8 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.slug}`} className="group relative h-[300px] overflow-hidden rounded shadow-sm block bg-gray-200">
                {/* Fallback color for image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                  <h3 className="text-white text-2xl font-serif mb-2">{collection.name}</h3>
                  <div className="flex items-center text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all text-sm font-medium">
                    EXPLORE <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Why Choose Us</span>
            <h2 className="text-4xl font-serif mb-4">Our Benefits</h2>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="w-8 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative h-[500px] rounded-lg overflow-hidden border-2 border-border shadow-lg hidden md:block">
              <Image 
                src="/assets/wall-to-wall-BQ7JoY9c.jpg" 
                alt="Carpet Installation" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Design and Quality", desc: "Innovation in every thread." },
                { title: "Fast Delivery", desc: "Size available deliver within one week." },
                { title: "Customisation", desc: "100% tailored to your specific space." },
                { title: "Anti Bacterial", desc: "Anti-fungal treated for hygiene and safety." },
                { title: "Competitive Price", desc: "Factory-direct pricing on luxury carpets." },
                { title: "Wall to Wall Installation", desc: "For hotel, hospitals, apartment anywhere. Trained staff for installation." },
                { title: "Quick Response", desc: "Dedicated support team for instant assistance." },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-serif text-lg">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Shop By Space */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold tracking-widest uppercase text-text-muted">Shop By Space</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Sofa, label: "Living Room" },
              { icon: BedDouble, label: "Bedroom" },
              { icon: Building2, label: "Hotel" },
              { icon: Briefcase, label: "Office" },
              { icon: Stethoscope, label: "Hospital" },
              { icon: GlassWater, label: "Banquet Hall" },
              { icon: Building, label: "Apartment" },
            ].map((space, i) => (
              <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                  <space.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs uppercase tracking-wider font-medium">{space.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Best Sellers</span>
            <h2 className="text-4xl font-serif mb-4">Our Most Loved Carpets</h2>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="w-8 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {bestSellers.map((product) => (
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
          
          <div className="mt-12 text-center">
            <Link href="/shop" className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded text-sm font-medium transition-colors">
              VIEW ALL COLLECTIONS
            </Link>
          </div>
        </div>
      </section>

      {/* Wall to Wall Banner */}
      <section className="relative w-full h-[400px] flex items-center bg-[#3a2e26]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/wall-to-wall-BQ7JoY9c.jpg" 
            alt="Wall to Wall Carpet Installation" 
            fill 
            className="object-cover object-center opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl text-white">
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">Wall-To-Wall Solutions</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Professional Wall-to-Wall<br />Carpet Installation
            </h2>
            <p className="text-white/80 mb-8 max-w-md text-lg">
              Perfect for Hotels, Offices, Hospitals & Luxury Residences.
            </p>
            <Link href="/contact" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded text-sm font-medium transition-colors inline-block">
              BOOK SITE VISIT
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
