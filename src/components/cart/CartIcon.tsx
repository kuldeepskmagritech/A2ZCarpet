"use client"

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'
import { useEffect, useState } from 'react'

export function CartIcon() {
  const { items, setIsOpen } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="relative p-2 hover:text-primary transition-colors" 
      aria-label="Cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  )
}
