import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, CheckCircle2, Clock } from 'lucide-react'

export default async function CustomerOrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true }
          }
        }
      },
      shipment: true
    }
  })

  if (!order) {
    notFound()
  }

  const steps = ['PENDING', 'PREPARING', 'SHIPPED', 'DELIVERED']
  const currentStepIndex = steps.indexOf(order.status) >= 0 ? steps.indexOf(order.status) : 0

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="p-2 text-muted-foreground hover:text-foreground bg-surface rounded-full border border-border transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-foreground">Order {order.orderNumber}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Tracking Timeline */}
        <section className="bg-surface border border-border p-6 md:p-10 rounded-lg">
          <h2 className="text-xl font-serif mb-8 border-b border-border pb-4">Tracking Status</h2>
          
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border -z-10 hidden md:block"></div>
            
            <div className="space-y-8">
              {/* Step 1: Order Placed */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-surface z-10 ${currentStepIndex >= 0 ? 'bg-primary text-white' : 'bg-background border-border text-muted-foreground'}`}>
                  <Clock className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className={`font-bold ${currentStepIndex >= 0 ? 'text-foreground' : 'text-muted-foreground'}`}>Order Confirmed</h3>
                  <p className="text-sm text-muted-foreground mt-1">Your order has been received and is pending confirmation.</p>
                </div>
              </div>

              {/* Step 2: Preparing */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-surface z-10 ${currentStepIndex >= 1 ? 'bg-primary text-white' : 'bg-background border-border text-muted-foreground'}`}>
                  <Package className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className={`font-bold ${currentStepIndex >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Preparing Order</h3>
                  <p className="text-sm text-muted-foreground mt-1">Our artisans are preparing your luxury carpet.</p>
                </div>
              </div>

              {/* Step 3: Shipped */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-surface z-10 ${currentStepIndex >= 2 ? 'bg-primary text-white' : 'bg-background border-border text-muted-foreground'}`}>
                  <Truck className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className={`font-bold ${currentStepIndex >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>Shipped</h3>
                  <p className="text-sm text-muted-foreground mt-1">Your order is on the way.</p>
                  {order.shipment?.trackingNumber && (
                    <div className="mt-3 p-3 bg-background border border-border rounded inline-block text-sm">
                      <span className="text-muted-foreground">Tracking Number:</span> <span className="font-bold text-primary">{order.shipment.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex gap-4 md:gap-6 relative">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 border-4 border-surface z-10 ${currentStepIndex >= 3 ? 'bg-green-600 text-white' : 'bg-background border-border text-muted-foreground'}`}>
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className={`font-bold ${currentStepIndex >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>Delivered</h3>
                  <p className="text-sm text-muted-foreground mt-1">Your premium carpet has arrived.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Details */}
        <section className="bg-surface border border-border p-6 md:p-10 rounded-lg">
          <h2 className="text-xl font-serif mb-6 border-b border-border pb-4">Order Summary</h2>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b border-border/50 pb-6 last:border-0 last:pb-0">
                <div className="flex-1">
                  <h4 className="font-serif text-lg text-foreground">{item.productName}</h4>
                  <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                    {item.variant?.product?.description || "Bespoke custom order specifications processed by A2Z Carpet."}
                  </p>
                  <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                    <span>Qty: {item.quantity}</span>
                    <span>Price: ₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="text-right font-medium text-foreground">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border flex justify-between items-center text-lg">
            <span className="font-bold">Total Paid</span>
            <span className="font-bold text-primary text-2xl">₹{order.total.toLocaleString('en-IN')}</span>
          </div>
        </section>
      </div>
    </div>
  )
}
