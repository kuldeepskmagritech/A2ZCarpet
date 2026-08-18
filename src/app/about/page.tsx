import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">About A2Z Carpet</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6 text-lg text-text-muted">
          <p>
            With over two decades of experience, A2Z Carpet stands as a beacon of luxury carpet craftsmanship. Rooted in Bhadohi, the illustrious "Carpet City of India", we blend age-old traditions with contemporary aesthetics.
          </p>
          <p>
            Our brand legacy is built on the passion of our artisan heritage. Every knot, every thread, and every pattern is meticulously crafted to transform spaces into statements of elegance.
          </p>
          <ul className="space-y-3 mt-6">
            {['Master Artisans', 'Premium Materials', 'Bespoke Customization', 'Global Shipping'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                <CheckCircle className="w-5 h-5 text-primary" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-square bg-surface border border-border rounded-lg overflow-hidden">
          <Image 
            src="/assets/craftsman-CFIZEU1q.jpg" 
            alt="A2Z Carpet Craftsman Weaving" 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      <div className="bg-surface border border-border p-12 text-center rounded-lg">
        <h2 className="text-3xl font-serif mb-6">Looking for a Custom Rug?</h2>
        <p className="text-text-muted mb-8 max-w-2xl mx-auto">
          Our design team works closely with you to create fully bespoke rugs, perfectly tailored to your space's dimensions, color palette, and style.
        </p>
        <Link href="/contact" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded font-bold transition-colors inline-block">
          REQUEST CONSULTATION
        </Link>
      </div>
    </div>
  )
}
