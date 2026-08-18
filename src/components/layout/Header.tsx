import Image from 'next/image'
import Link from 'next/link'
import { Search, Heart, MessageCircle } from 'lucide-react'
import { CartIcon } from '../cart/CartIcon'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-ink text-cream">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-48 h-16 flex items-center shrink-0 block">
          <Image 
            src="/logo1.png" 
            alt="A2Z Carpet" 
            fill 
            className="object-contain object-left mix-blend-screen" 
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary transition-colors uppercase">
              Collections
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-ink shadow-md py-2 border border-white/10 mt-2 z-50">
              <Link href="/collections/heritage" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Heritage Collection</Link>
              <Link href="/collections/handloom" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Handloom Collection</Link>
              <Link href="/collections/elegance" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Elegance Collection</Link>
              <Link href="/collections/lifestyle" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Lifestyle Collection</Link>
              <Link href="/collections/silk-rugs" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Silk Rugs Collection</Link>
              <Link href="/collections/machine-made" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Machine Made Rugs</Link>
              <Link href="/collections/infinity" className="block px-4 py-2 hover:bg-white/10 hover:text-primary transition-colors">Infinity Collection</Link>
            </div>
          </div>
          <Link href="/wall-to-wall" className="hover:text-primary transition-colors uppercase">Wall-to-Wall</Link>
          <Link href="/projects" className="hover:text-primary transition-colors uppercase">Projects</Link>
          <Link href="/about" className="hover:text-primary transition-colors uppercase">About Us</Link>
          <Link href="/catalogues" className="hover:text-primary transition-colors uppercase">Catalogue</Link>
          <Link href="/contact" className="hover:text-primary transition-colors uppercase">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium tracking-wide">
            <Link href="/custom-carpet" className="text-primary uppercase tracking-widest text-[10px] border border-primary px-3 py-1.5 hover:bg-primary hover:text-ink transition-colors">
              Custom Quote
            </Link>
            <Link href="/login" className="hover:text-primary transition-colors">Account</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/wishlist" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <CartIcon />
            <Link href="https://wa.me/918558085579" target="_blank" className="p-2 hover:text-primary transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
