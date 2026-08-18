"use client"

import { useCart } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.18 // 18% GST approx
  const total = subtotal + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would typically integrate with Razorpay or Stripe
    // For now, we simulate a successful cash-on-delivery or offline payment order
    setIsSuccess(true)
    clearCart()
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-serif mb-4">Order Placed!</h1>
        <p className="text-text-muted mb-8">
          Thank you for choosing A2Z Carpet. Your order has been successfully placed. We will contact you shortly to confirm the delivery details.
        </p>
        <Link href="/shop" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded font-bold transition-colors">
          CONTINUE SHOPPING
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif mb-4">Checkout</h1>
        <p className="text-text-muted mb-8">Your cart is empty.</p>
        <Link href="/shop" className="text-primary font-bold hover:underline">
          Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1">Full Name</label>
                  <input required type="text" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">Email</label>
                  <input required type="email" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-text-muted mb-1">Phone Number</label>
                  <input required type="tel" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-border pb-2 mt-8">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-text-muted mb-1">Address Line</label>
                  <input required type="text" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">City</label>
                  <input required type="text" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">State</label>
                  <input required type="text" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, state: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">Pincode</label>
                  <input required type="text" className="w-full border border-border p-3 rounded outline-none focus:border-primary" onChange={e => setFormData({...formData, pincode: e.target.value})} />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-border pb-2 mt-8">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border rounded cursor-pointer hover:border-primary">
                  <input type="radio" name="payment" value="offline" defaultChecked className="accent-primary" />
                  <span>Request Invoice / Pay Offline</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border rounded cursor-pointer hover:border-primary">
                  <input type="radio" name="payment" value="online" disabled className="accent-primary" />
                  <span className="text-text-muted">Pay Online (Razorpay) - <em className="text-xs">Sandbox mode</em></span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-surface border border-border rounded p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-background rounded overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <h3 className="font-medium truncate" title={item.name}>{item.name}</h3>
                    <p className="text-text-muted">Qty: {item.quantity}</p>
                    <p className="font-bold">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Estimated Tax (18%)</span>
                <span>₹ {tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Shipping</span>
                <span className="text-green-600">Calculated later</span>
              </div>
            </div>
            
            <div className="border-t border-border mt-4 pt-4 flex justify-between items-end">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">₹ {total.toLocaleString('en-IN')}</span>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form"
              className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded font-bold transition-colors mt-8"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
