"use client"

import { useWishlist, useCart } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <Heart className="w-16 h-16 text-border mb-4" />
        <h1 className="text-3xl font-serif mb-4 text-foreground">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8">Browse our collections and save your favorite carpets here.</p>
        <Link href="/shop" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 uppercase tracking-widest text-xs font-medium transition-colors">
          Explore Collections
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Saved Items</h1>
        <div className="w-12 h-[2px] bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group border border-border p-4 rounded bg-surface relative">
            <button 
              onClick={() => removeItem(item.id)}
              className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-sm text-muted-foreground hover:text-red-500 transition-colors"
              title="Remove from wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="relative aspect-[4/5] overflow-hidden mb-4 rounded bg-background">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <div>
              <h3 className="font-serif text-lg text-foreground truncate">{item.name}</h3>
              <p className="text-primary font-medium mt-1 mb-4">₹{item.price.toLocaleString('en-IN')}</p>
              
              <button 
                onClick={() => {
                  addItem({ ...item, quantity: 1 })
                  removeItem(item.id)
                }}
                className="w-full flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 transition-colors uppercase text-xs tracking-wider"
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
