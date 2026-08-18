import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Printer } from 'lucide-react'
import OrderTrackingForm from './OrderTrackingForm'

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: true,
      shipment: true
    }
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
            <p className="text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors" onClick={() => {}}>
          <Printer className="w-4 h-4" /> Print Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-gray-900">{item.productName}</div>
                    <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{item.price.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl text-primary">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4">Internal Notes</h2>
            <p className="text-gray-600 text-sm whitespace-pre-line">{order.notes || "No notes provided."}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4">Customer Details</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-gray-500">Name:</span> {order.user?.name || "Guest"}</p>
              <p><span className="font-medium text-gray-500">Email:</span> {order.user?.email}</p>
              <div className="pt-2 mt-2 border-t border-gray-50">
                <span className="font-medium text-gray-500 block mb-1">Shipping Address:</span>
                <p className="text-gray-900 whitespace-pre-line">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold border-b border-gray-100 pb-2 mb-4">Tracking</h2>
            <OrderTrackingForm 
              orderId={order.id} 
              currentStatus={order.status} 
              currentTracking={order.shipment?.trackingNumber || ''} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
