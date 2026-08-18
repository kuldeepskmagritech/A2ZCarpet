"use server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function saveProduct(data: any) {
  const { id, name, description, basePrice, sku, categoryId, collectionId, isPublished, imageUrl } = data

  let product
  if (id) {
    product = await db.product.update({
      where: { id },
      data: {
        name,
        description,
        basePrice: parseFloat(basePrice),
        sku,
        isPublished,
      }
    })
    
    // Update image
    if (imageUrl) {
      await db.productImage.deleteMany({ where: { productId: id } })
      await db.productImage.create({ data: { url: imageUrl, productId: id } })
    }
  } else {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()
    product = await db.product.create({
      data: {
        name,
        slug,
        description,
        basePrice: parseFloat(basePrice),
        sku,
        isPublished,
        images: imageUrl ? {
          create: [{ url: imageUrl }]
        } : undefined
      }
    })
  }

  // Update categories and collections
  if (categoryId) {
    await db.productCategory.deleteMany({ where: { productId: product.id } })
    await db.productCategory.create({
      data: { productId: product.id, categoryId }
    })
  }
  if (collectionId) {
    await db.productCollection.deleteMany({ where: { productId: product.id } })
    await db.productCollection.create({
      data: { productId: product.id, collectionId }
    })
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  revalidatePath('/')
  
  return { success: true, id: product.id }
}
