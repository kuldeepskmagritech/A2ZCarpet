import { db } from '@/lib/db'
import ProductForm from '../ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: true,
      categories: true,
      collections: true,
    }
  })

  if (!product) {
    notFound()
  }

  const categories = await db.category.findMany()
  const collections = await db.collection.findMany()

  return <ProductForm product={product} categories={categories} collections={collections} />
}
