import { db } from '@/lib/db'
import { Package, MapPin, User, Heart, Truck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function AccountPage() {
  // Mock login: Fetch the last user who has an order, or fallback
  const latestOrder = await db.order.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })
  
  const user = latestOrder?.user || {
    name: "Demo Customer",
    email: "customer@example.com",
    phone: "+91 9876543210",
    id: "demo-id"
  }

  const recentOrders = await db.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
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

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-foreground mb-2">My Account</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          <Link href="/account" className="flex items-center gap-3 p-3 bg-primary/5 text-primary font-medium rounded">
            <User className="w-5 h-5" /> Profile Overview
          </Link>
          <Link href="/account" className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-background hover:text-foreground rounded transition-colors">
            <Package className="w-5 h-5" /> Order History
          </Link>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          
          {/* Account Details */}
          <section className="bg-surface border border-border p-6 rounded">
            <h2 className="text-xl font-serif mb-4 flex items-center justify-between">
              Account Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="bg-surface border border-border p-6 rounded">
            <h2 className="text-xl font-serif mb-4 flex items-center justify-between">
              Recent Orders & Tracking
            </h2>
            <div className="space-y-6">
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-sm">You have no orders yet.</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-background p-4 border-b border-border flex justify-between items-center">
                      <div>
                        <div className="font-medium text-primary">{order.orderNumber}</div>
                        <div className="text-xs text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Total: ₹{order.total.toLocaleString('en-IN')}</div>
                        <div className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full inline-block mt-1">
                          {order.status}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-foreground">{item.productName}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {item.variant?.product?.description || "Bespoke custom order specifications."}
                            </p>
                            <div className="text-xs text-muted-foreground mt-1">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-background p-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Truck className="w-4 h-4 text-primary" />
                          Tracking: {order.shipment?.trackingNumber ? <span className="text-blue-600 underline cursor-pointer">{order.shipment.trackingNumber}</span> : <span className="text-muted-foreground font-normal">Pending tracking update</span>}
                        </div>
                        <Link href={`/account/orders/${order.id}`} className="text-xs font-medium text-primary border border-primary px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors">
                          Track Order
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
