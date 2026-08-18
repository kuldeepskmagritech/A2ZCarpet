"use client"

import { useState } from 'react'
import { useCart } from '@/lib/store'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  variantId?: string
  size?: string
  className?: string
}

export function AddToCartButton({ product, variantId, size, className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    
    addItem({
      id: variantId || product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: size,
    })
    
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className={className || "flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded font-bold transition-colors disabled:opacity-70"}
    >
      {isAdding ? 'ADDED!' : 'ADD TO CART'}
    </button>
  )
}
