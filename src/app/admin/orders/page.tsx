import { db } from '@/lib/db'
import Link from 'next/link'

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: true
    }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and create manual invoices.</p>
        </div>
        <Link href="/admin/orders/new" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          Create Invoice / Order
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Order Number</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">
                    <Link href={`/admin/orders/${order.id}`}>
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{order.user?.name || 'Guest'}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
