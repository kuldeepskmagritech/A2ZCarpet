"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { createManualOrder } from '../actions'

export default function NewOrderForm({ products }: { products: any[] }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    notes: ''
  })
  const [items, setItems] = useState<any[]>([])

  const addItem = () => {
    setItems([...items, { productId: '', productName: '', price: 0, quantity: 1, sku: 'CUSTOM', variantId: '' }])
  }

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...items]
    if (key === 'productId' && value) {
      const product = products.find(p => p.id === value)
      if (product) {
        newItems[index] = {
          ...newItems[index],
          productId: product.id,
          productName: product.name,
          price: product.basePrice,
          sku: product.sku,
          variantId: product.variants?.[0]?.id || ''
        }
      }
    } else {
      newItems[index][key] = value
    }
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return alert("Please add at least one item.")
    
    setIsSubmitting(true)
    try {
      await createManualOrder({
        ...formData,
        items,
        total: subtotal
      })
      router.push('/admin/orders')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Error creating order. Please ensure the selected products have a valid variant in the database.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create Invoice / Order</h1>
            <p className="text-gray-500">Manually generate an order for a customer.</p>
          </div>
        </div>
        <button 
          type="submit"
          form="order-form"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Creating...' : 'Create Order'}
        </button>
      </div>

      <form id="order-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-lg font-bold border-b border-gray-100 pb-2">Customer Details</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input required type="email" value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input required type="text" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input type="tel" value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-lg font-bold border-b border-gray-100 pb-2">Shipping & Notes</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Full Shipping Address</label>
              <textarea required rows={3} value={formData.shippingAddress} onChange={e => setFormData({...formData, shippingAddress: e.target.value})} className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Internal Notes (Optional)</label>
              <textarea rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none"></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <h2 className="text-lg font-bold">Order Items</h2>
            <button type="button" onClick={addItem} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-colors">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500">No items added. Click "Add Item" to start.</div>
          )}

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Select Product</label>
                  <select value={item.productId} onChange={e => updateItem(index, 'productId', e.target.value)} className="w-full border rounded p-2 text-sm">
                    <option value="">-- Select Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Unit Price (₹)</label>
                  <input type="number" min="0" value={item.price} onChange={e => updateItem(index, 'price', parseFloat(e.target.value) || 0)} className="w-full border rounded p-2 text-sm" />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>
                  <input type="number" min="1" value={item.quantity} onChange={e => updateItem(index, 'quantity', parseInt(e.target.value) || 1)} className="w-full border rounded p-2 text-sm" />
                </div>
                <div className="w-24 pt-6 text-right font-medium">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
                <div className="pt-5">
                  <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-4 flex justify-end">
              <div className="text-xl font-bold">
                Total: <span className="text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
