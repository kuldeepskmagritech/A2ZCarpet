"use client"

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { submitEnquiry } from '../actions/enquiries'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateForm = (key: string, value: string) => setFormData({ ...formData, [key]: value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const res = await submitEnquiry(formData)
    setIsSubmitting(false)
    
    if (res.success) {
      const text = encodeURIComponent(`Hi A2Z Carpet, I have a new inquiry.\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nType: ${formData.inquiryType}\nMessage: ${formData.message}`)
      window.open(`https://wa.me/918558085579?text=${text}`, '_blank')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', inquiryType: 'General Inquiry', message: '' })
    } else {
      alert("Failed to submit inquiry. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          We would love to hear from you. Whether you have a question about our collections, need a custom rug consultation, or require wall-to-wall installation, our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Visit Our Showroom</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Flat No B-1, Awadh Green Apartment,<br />
                Prag Narayan Road, Lucknow - 226001
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <a href="tel:+918558085579" className="text-primary hover:underline block text-sm mb-1">+91 8558085579</a>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <a href="mailto:atozcarpetlucknow@gmail.com" className="text-primary hover:underline block text-sm">atozcarpetlucknow@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-surface border border-border p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">First Name</label>
                <input required type="text" value={formData.firstName} onChange={e => updateForm('firstName', e.target.value)} className="w-full border border-border rounded p-3 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Last Name</label>
                <input required type="text" value={formData.lastName} onChange={e => updateForm('lastName', e.target.value)} className="w-full border border-border rounded p-3 focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full border border-border rounded p-3 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Phone Number</label>
                <input required type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full border border-border rounded p-3 focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Inquiry Type</label>
              <select value={formData.inquiryType} onChange={e => updateForm('inquiryType', e.target.value)} className="w-full border border-border rounded p-3 focus:outline-none focus:border-primary">
                <option>General Inquiry</option>
                <option>Custom Rug Request</option>
                <option>Wall-to-Wall Installation</option>
                <option>Bulk Order</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Message</label>
              <textarea required rows={5} value={formData.message} onChange={e => updateForm('message', e.target.value)} className="w-full border border-border rounded p-3 focus:outline-none focus:border-primary"></textarea>
            </div>
            <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded font-bold transition-colors">
              INQUIRE VIA WHATSAPP
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
