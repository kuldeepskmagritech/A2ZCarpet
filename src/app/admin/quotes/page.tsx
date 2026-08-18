import { db } from '@/lib/db'

export default async function AdminQuotesPage() {
  const quotes = await db.customCarpetRequest.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Custom Carpet Leads</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Style</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No custom carpet requests found yet.
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{quote.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span>{quote.email}</span>
                      <span className="text-xs text-gray-400">{quote.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{quote.style} ({quote.dimensions})</td>
                  <td className="px-6 py-4">{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {quote.status}
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
