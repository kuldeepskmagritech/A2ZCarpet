"use server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { randomBytes } from "crypto"

export async function createManualOrder(data: any) {
  const { customerName, customerEmail, customerPhone, items, shippingAddress, notes, total } = data

  // Find or create user
  let user = await db.user.findUnique({ where: { email: customerEmail } })
  if (!user) {
    user = await db.user.create({
      data: {
        email: customerEmail,
        name: customerName,
        passwordHash: "", // Manual orders don't need passwords until user signs up properly
      }
    })
  }

  // Create order
  const orderNumber = `A2Z-${randomBytes(4).toString('hex').toUpperCase()}`
  
  const order = await db.order.create({
    data: {
      orderNumber,
      userId: user.id,
      status: 'PENDING',
      subtotal: parseFloat(total),
      total: parseFloat(total),
      billingAddress: shippingAddress,
      shippingAddress: shippingAddress,
      notes: notes,
      items: {
        create: items.map((item: any) => ({
          variantId: item.variantId || "custom", // Wait, variantId is required, we need a dummy if it doesn't exist
          productName: item.productName,
          sku: item.sku || 'CUSTOM',
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity)
        }))
      }
    }
  })

  // Create empty shipment record for tracking
  await db.shipment.create({
    data: {
      orderId: order.id,
      status: 'PREPARING'
    }
  })

  revalidatePath('/admin/orders')
  revalidatePath('/account')
  
  return { success: true, orderId: order.id }
}

export async function updateOrderStatus(orderId: string, status: string, trackingNumber?: string) {
  await db.order.update({
    where: { id: orderId },
    data: { status }
  })
  
  if (trackingNumber) {
    await db.shipment.update({
      where: { orderId: orderId },
      data: { 
        trackingNumber,
        status: status === 'SHIPPED' ? 'SHIPPED' : status === 'DELIVERED' ? 'DELIVERED' : 'PREPARING'
      }
    })
  }
  
  revalidatePath('/admin/orders')
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/account')
}
