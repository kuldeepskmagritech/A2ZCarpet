"use client"

import { useState } from 'react'
import { Upload, ChevronRight, Check } from 'lucide-react'
import { submitCustomQuote } from '../actions/enquiries'

export default function CustomCarpetPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    style: '', shape: '', dimensions: '', material: '', colors: '',
    quantity: '1', usageType: '', location: '', notes: '', image: null as File | null
  })

  const updateForm = (key: string, value: any) => setFormData({ ...formData, [key]: value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const res = await submitCustomQuote({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      style: formData.style,
      shape: formData.shape,
      dimensions: formData.dimensions,
      material: formData.material,
      colors: formData.colors,
      quantity: formData.quantity,
      usageType: formData.usageType,
      location: formData.location,
      notes: formData.notes
    })
    setIsSubmitting(false)

    if (res.success) {
      const text = encodeURIComponent(`Hi A2Z Carpet, I would like a custom quote.\n\nName: ${formData.name}\nStyle: ${formData.style}\nShape: ${formData.shape}\nDimensions: ${formData.dimensions}\nColors: ${formData.colors}\nMaterial: ${formData.material}\nUsage: ${formData.usageType}\nQuantity: ${formData.quantity}\nLocation: ${formData.location}\nNotes: ${formData.notes}`)
      window.open(`https://wa.me/918558085579?text=${text}`, '_blank')
      setStep(4)
    } else {
      alert("Failed to submit request. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-4">Bespoke Custom Carpets</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Design your perfect rug. Our master artisans will bring your unique vision to life with precision and premium materials.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= num ? 'bg-primary text-white' : 'bg-surface border border-border text-muted-foreground'
            }`}>
              {step > num ? <Check className="w-5 h-5" /> : num}
            </div>
            {num < 3 && (
              <div className={`w-24 md:w-32 h-1 mx-2 ${step > num ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-border p-8 md:p-12 rounded shadow-sm">
        
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif border-b border-border pb-4">1. Design Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Carpet Style</label>
                <select 
                  required
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.style}
                  onChange={(e) => updateForm('style', e.target.value)}
                >
                  <option value="">Select a style</option>
                  <option>Traditional / Persian</option>
                  <option>Modern / Contemporary</option>
                  <option>Geometric</option>
                  <option>Floral / Botanical</option>
                  <option>Abstract</option>
                  <option>Minimalist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Shape</label>
                <select 
                  required
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.shape}
                  onChange={(e) => updateForm('shape', e.target.value)}
                >
                  <option value="">Select a shape</option>
                  <option>Rectangle</option>
                  <option>Square</option>
                  <option>Round</option>
                  <option>Runner</option>
                  <option>Custom / Irregular</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Dimensions (e.g. 8x10 ft, 200x300 cm)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter size requirements"
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.dimensions}
                  onChange={(e) => updateForm('dimensions', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Colors</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Navy Blue, Ivory, Gold"
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.colors}
                  onChange={(e) => updateForm('colors', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="button" 
                onClick={() => setStep(2)}
                disabled={!formData.style || !formData.shape || !formData.dimensions || !formData.colors}
                className="bg-primary text-white px-8 py-3 uppercase tracking-widest text-xs font-medium flex items-center gap-2 disabled:opacity-50"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif border-b border-border pb-4">2. Material & Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Material</label>
                <select 
                  required
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.material}
                  onChange={(e) => updateForm('material', e.target.value)}
                >
                  <option value="">Select material</option>
                  <option>New Zealand Wool</option>
                  <option>Pure Silk</option>
                  <option>Wool & Silk Blend</option>
                  <option>Viscose / Art Silk</option>
                  <option>Jute / Natural Fibers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Usage Type</label>
                <select 
                  required
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.usageType}
                  onChange={(e) => updateForm('usageType', e.target.value)}
                >
                  <option value="">Select usage</option>
                  <option>Residential - Living Room</option>
                  <option>Residential - Bedroom</option>
                  <option>Commercial - Office</option>
                  <option>Hospitality - Hotel / Banquet</option>
                  <option>Wall-to-Wall Installation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                  value={formData.quantity}
                  onChange={(e) => updateForm('quantity', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reference Image (Optional)</label>
                <div className="border-2 border-dashed border-border rounded p-3 text-center cursor-pointer hover:bg-background transition-colors flex items-center justify-center gap-2 text-muted-foreground">
                  <Upload className="w-4 h-4" /> 
                  <span className="text-sm">Upload Design / Inspiration</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Project Notes / Specific Requirements</label>
              <textarea 
                rows={4}
                className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none"
                placeholder="Tell us more about your requirements..."
                value={formData.notes}
                onChange={(e) => updateForm('notes', e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-between pt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={() => setStep(3)}
                disabled={!formData.material || !formData.usageType}
                className="bg-primary text-white px-8 py-3 uppercase tracking-widest text-xs font-medium flex items-center gap-2 disabled:opacity-50"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif border-b border-border pb-4">3. Contact & Delivery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => updateForm('name', e.target.value)} className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => updateForm('email', e.target.value)} className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number / WhatsApp</label>
                <input type="tel" required value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Location (City, Country)</label>
                <input 
                  type="text" 
                  required 
                  className="w-full p-3 border border-border rounded focus:border-primary focus:outline-none" 
                  value={formData.location}
                  onChange={(e) => updateForm('location', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="bg-primary text-white px-8 py-3 uppercase tracking-widest text-xs font-medium"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-8 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif text-foreground">Request Received!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for choosing A2Z Carpet. Our design team is reviewing your bespoke requirements and will contact you via email or WhatsApp within 24 hours with a customized quotation.
            </p>
          </div>
        )}

      </form>
    </div>
  )
}
