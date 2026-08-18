import Link from 'next/link'
import { LayoutDashboard, Package, Users, Settings, ShoppingCart, LogOut, Image as ImageIcon, MessageSquare, ClipboardList } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold tracking-tight text-primary">A2Z ADMIN</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-900 rounded font-medium">
            <LayoutDashboard className="w-5 h-5 text-gray-500" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/collections" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <ImageIcon className="w-5 h-5" /> Collections
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <MessageSquare className="w-5 h-5" /> Enquiries
          </Link>
          <Link href="/admin/quotes" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <ClipboardList className="w-5 h-5" /> Custom Quotes
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
