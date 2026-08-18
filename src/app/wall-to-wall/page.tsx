import Link from 'next/link'
import Image from 'next/image'
import { Building2, Scissors, CheckCircle, Phone } from 'lucide-react'

export default function WallToWallPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">Commercial & Residential</span>
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Wall-to-Wall Carpets</h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          Transform your entire space with our seamless, premium wall-to-wall carpeting solutions, perfect for hospitality venues, corporate offices, and luxury residences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div className="aspect-[4/3] bg-surface border border-border rounded-lg relative overflow-hidden">
          <Image 
            src="/assets/wall-to-wall-BQ7JoY9c.jpg" 
            alt="Wall-to-Wall Carpet Installation" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-serif mb-4">Why Choose Our Wall-to-Wall Service?</h2>
            <p className="text-text-muted">
              We provide end-to-end solutions, from material selection and custom sizing to professional installation. Our commercial-grade premium fibers ensure durability without compromising on elegance.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0 h-fit">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Hospitality Focus</h3>
                <p className="text-text-muted text-sm">Specialized in outfitting hotels, grand banquets, and luxury venues with sound-dampening, high-traffic resistant carpets.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0 h-fit">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Expert Installation</h3>
                <p className="text-text-muted text-sm">Our trained expert installation team guarantees a flawless, seamless finish with precision edge-cutting.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0 h-fit">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Premium Fibers</h3>
                <p className="text-text-muted text-sm">Sourced for commercial-grade durability while maintaining the luxurious feel of high-end residential carpets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface p-12 text-center rounded-xl border border-border max-w-4xl mx-auto">
        <Phone className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-serif mb-4">Ready to upgrade your space?</h2>
        <p className="text-text-muted mb-8">Schedule a site visit with our experts to discuss your requirements, measure your space, and get a customized quote.</p>
        <a href="tel:+918558085579" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded font-bold transition-colors inline-block text-lg shadow-lg">
          BOOK SITE VISIT: +91 8558085579
        </a>
      </div>
    </div>
  )
}
