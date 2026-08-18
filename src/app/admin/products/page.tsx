import { db } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: {
      images: { take: 1 },
      categories: { include: { category: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Products</h1>
          <p className="text-gray-500">Manage your carpet inventory and catalogs.</p>
        </div>
        <Link href="/admin/products/new" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
              <option>All Categories</option>
              <option>Living Room</option>
              <option>Bedroom</option>
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
              <option>Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden relative shrink-0">
                          {product.images[0] ? (
                            <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.categories.length > 0 
                        ? product.categories.map(c => c.category.name).join(', ') 
                        : 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4 font-medium">₹{product.basePrice.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${product.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {products.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <div>Showing 1 to {products.length} of {products.length} entries</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
