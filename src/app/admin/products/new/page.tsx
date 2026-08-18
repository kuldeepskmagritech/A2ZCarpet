import { db } from '@/lib/db'
import ProductForm from '../ProductForm'

export default async function NewProductPage() {
  const categories = await db.category.findMany()
  const collections = await db.collection.findMany()

  return <ProductForm categories={categories} collections={collections} />
}
