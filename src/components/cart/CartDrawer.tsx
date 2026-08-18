"use client"

import { useCart } from '@/lib/store'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const whatsappText = encodeURIComponent(`Hi A2Z Carpet, I would like to inquire about the following items from my cart:\n\n${items.map(i => `- ${i.name} (${i.quantity}x) - ₹${i.price * i.quantity}`).join('\n')}\n\nTotal: ₹${subtotal.toLocaleString('en-IN')}`)
  const whatsappUrl = `https://wa.me/918558085579?text=${whatsappText}`

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-serif font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-background rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-primary hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                <div className="relative w-20 h-20 bg-background rounded overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-text-muted hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {item.size && <p className="text-xs text-text-muted mt-1">Size: {item.size}</p>}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-background transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs px-2 w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-background transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-bold text-sm">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border bg-background">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold text-lg">₹ {subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-text-muted mb-4">Taxes and shipping calculated at checkout.</p>
            <Link 
              href={whatsappUrl}
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded font-bold transition-colors"
            >
              INQUIRE VIA WHATSAPP
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
