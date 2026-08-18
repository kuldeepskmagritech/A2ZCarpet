import { db } from '@/lib/db'
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Users, IndianRupee } from 'lucide-react'

export default async function AdminDashboard() {
  const totalProducts = await db.product.count()
  const totalCollections = await db.collection.count()
  
  // Placeholders for dynamic data
  const totalOrders = 156
  const totalRevenue = 4580000
  const totalCustomers = 342

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to the A2Z Carpet administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><IndianRupee className="w-6 h-6" /></div>
            <span className="flex items-center text-sm font-medium text-green-600"><ArrowUpRight className="w-4 h-4 mr-1"/> 12%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Revenue (Monthly)</p>
          <h3 className="text-2xl font-bold">₹ {(totalRevenue).toLocaleString('en-IN')}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ShoppingCart className="w-6 h-6" /></div>
            <span className="flex items-center text-sm font-medium text-green-600"><ArrowUpRight className="w-4 h-4 mr-1"/> 8%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Orders</p>
          <h3 className="text-2xl font-bold">{totalOrders}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Users className="w-6 h-6" /></div>
            <span className="flex items-center text-sm font-medium text-red-600"><ArrowDownRight className="w-4 h-4 mr-1"/> 2%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Customers</p>
          <h3 className="text-2xl font-bold">{totalCustomers}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Package className="w-6 h-6" /></div>
            <span className="flex items-center text-sm font-medium text-gray-400">-</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Active Products</p>
          <h3 className="text-2xl font-bold">{totalProducts}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map(i => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 font-medium">#ORD-{9000 + i}</td>
                    <td className="px-4 py-3">John Doe {i}</td>
                    <td className="px-4 py-3">July {10 + i}, 2026</td>
                    <td className="px-4 py-3">₹ {(15000 * i).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-4">Store Overview</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Total Collections</span>
              <span className="font-bold">{totalCollections}</span>
            </li>
            <li className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Low Stock Items</span>
              <span className="font-bold text-red-500">12</span>
            </li>
            <li className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Unread Enquiries</span>
              <span className="font-bold text-blue-500">5</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Pending Reviews</span>
              <span className="font-bold text-yellow-600">8</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
