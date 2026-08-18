import { Download, FileText } from 'lucide-react'

export default function CataloguesPage() {
  const catalogues = [
    { title: 'A to Z Carpets Master Catalogue', file: 'A to Z Carpets.pdf', size: '54 MB' },
    { title: 'Heritage Collection', file: 'Heritage Carpet.pdf', size: '12 MB' },
    { title: 'Elegance Lookbook', file: 'Elegance.pdf', size: '15 MB' },
    { title: 'Handloom Specialties', file: 'Handloom (2).pdf', size: '114 MB' },
    { title: 'Silk Rugs (1900 GSM)', file: 'Silk Rugs  100% POLYESTER 1900 GSM Machine Made.pdf', size: '65 MB' },
    { title: 'Infinity Presentation', file: 'Infinity Presentation.. baw.pdf', size: '45 MB' },
    { title: 'Lifestyle Collection', file: 'Life Style baw.pdf', size: '24 MB' },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Digital Catalogues</h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Download our comprehensive PDF catalogues to explore our full range of designs, materials, and collections at your convenience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {catalogues.map((cat, i) => (
          <div key={i} className="flex items-center justify-between p-6 bg-surface border border-border rounded-lg hover:border-primary transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="text-xs text-text-muted">PDF Document • {cat.size}</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors" title="Download">
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
