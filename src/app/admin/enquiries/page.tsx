import { db } from '@/lib/db'
import { MessageSquare, Mail, Phone, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminEnquiriesPage() {
  const enquiries = await db.enquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Enquiries</h1>
          <p className="text-gray-500">Manage customer messages and contact form submissions.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-medium text-gray-600">Date</th>
              <th className="p-4 font-medium text-gray-600">Customer</th>
              <th className="p-4 font-medium text-gray-600">Type</th>
              <th className="p-4 font-medium text-gray-600">Message</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {enquiries.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No enquiries found</td></tr>
            ) : enquiries.map(enquiry => (
              <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 whitespace-nowrap text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium">{enquiry.name}</div>
                  <div className="text-gray-500 text-xs flex items-center gap-1 mt-1"><Mail className="w-3 h-3" /> {enquiry.email}</div>
                  {enquiry.phone && <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> {enquiry.phone}</div>}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded text-xs font-medium">
                    {enquiry.subject}
                  </span>
                </td>
                <td className="p-4 max-w-md">
                  <p className="truncate text-gray-600">{enquiry.message}</p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${enquiry.status === 'NEW' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700'}`}>
                    {enquiry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
