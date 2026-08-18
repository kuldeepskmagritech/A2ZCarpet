import { db } from '@/lib/db'
import NewOrderForm from './NewOrderForm'

export default async function NewOrderPage() {
  const products = await db.product.findMany({
    include: {
      variants: true,
      images: { take: 1 }
    }
  })

  return <NewOrderForm products={products} />
}
