"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import { saveProduct } from './actions'

export default function ProductForm({ product, categories, collections }: { product?: any, categories: any[], collections: any[] }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    description: product?.description || '',
    basePrice: product?.basePrice?.toString() || '',
    sku: product?.sku || '',
    isPublished: product?.isPublished ?? true,
    categoryId: product?.categories?.[0]?.categoryId || '',
    collectionId: product?.collections?.[0]?.collectionId || '',
    imageUrl: product?.images?.[0]?.url || ''
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await saveProduct({
        ...formData,
        isPublished: formData.isPublished === true || formData.isPublished === 'true'
      })
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to save product")
      setIsSubmitting(false)
    }
  }

  const updateForm = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h1>
            <p className="text-gray-500">{product ? 'Update product details.' : 'Create a new carpet listing.'}</p>
          </div>
        </div>
        <button 
          type="submit"
          form="product-form"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
        >
          <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name (Label)</label>
                <input required type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Royal Heritage Hand-knotted Rug" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={5} value={formData.description} onChange={e => updateForm('description', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Detailed product description..."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Product Photo</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const uploadData = new FormData();
                  uploadData.append('file', file);
                  try {
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: uploadData,
                    });
                    const data = await res.json();
                    if (data.success) {
                      updateForm('imageUrl', data.url);
                    } else {
                      alert('Upload failed: ' + data.error);
                    }
                  } catch (err) {
                    alert('Upload failed');
                  }
                }} 
                className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-primary mb-3 text-sm" 
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Or Image URL</label>
              <input type="text" value={formData.imageUrl} onChange={e => updateForm('imageUrl', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. /assets/rug-1.jpg" />
              {formData.imageUrl && (
                <div className="mt-4 w-32 h-32 relative rounded border border-border overflow-hidden">
                  <img src={formData.imageUrl} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                <input required type="number" min="0" value={formData.basePrice} onChange={e => updateForm('basePrice', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input required type="text" value={formData.sku} onChange={e => updateForm('sku', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. HC-001" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Publishing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={formData.isPublished.toString()} onChange={e => updateForm('isPublished', e.target.value === 'true')} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="false">Draft</option>
                  <option value="true">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collection</label>
                <select value={formData.collectionId} onChange={e => updateForm('collectionId', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Select a collection</option>
                  {collections.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.categoryId} onChange={e => updateForm('categoryId', e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Select a category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
