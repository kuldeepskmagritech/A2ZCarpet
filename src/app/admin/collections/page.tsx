import { db } from '@/lib/db'

export default async function AdminCollectionsPage() {
  const collections = await db.collection.findMany({
    orderBy: { name: 'asc' },
    include: {
      products: true
    }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
        <button className="bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-hover">
          Add Collection
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Products Count</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {collections.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No collections found.
                </td>
              </tr>
            ) : (
              collections.map((col) => (
                <tr key={col.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{col.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{col.slug}</td>
                  <td className="px-6 py-4">{col.products.length}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      col.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {col.isActive ? 'Active' : 'Inactive'}
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
