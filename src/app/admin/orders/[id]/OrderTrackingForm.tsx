"use client"
import { useState } from 'react'
import { updateOrderStatus } from '../actions'
import { Check } from 'lucide-react'

export default function OrderTrackingForm({ orderId, currentStatus, currentTracking }: { orderId: string, currentStatus: string, currentTracking?: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [tracking, setTracking] = useState(currentTracking || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setSaved(false)
    try {
      await updateOrderStatus(orderId, status, tracking)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      alert("Error updating order")
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Order Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none">
          <option value="PENDING">Pending</option>
          <option value="PREPARING">Preparing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tracking Number / Link</label>
        <input type="text" value={tracking} onChange={e => setTracking(e.target.value)} placeholder="e.g. DHL-123456" className="w-full border rounded-lg p-2.5 focus:border-primary focus:outline-none" />
      </div>
      <button 
        onClick={handleSave} 
        disabled={isSaving}
        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded font-medium flex items-center justify-center gap-2 w-full transition-colors"
      >
        {isSaving ? 'Saving...' : saved ? <><Check className="w-4 h-4"/> Saved</> : 'Update Tracking'}
      </button>
    </div>
  )
}
