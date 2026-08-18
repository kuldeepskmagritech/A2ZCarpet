"use server"

import { db } from '@/lib/db'

export async function submitEnquiry(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  inquiryType: string
  message: string
}) {
  try {
    const enquiry = await db.enquiry.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        subject: data.inquiryType,
        message: data.message,
      }
    })
    return { success: true, id: enquiry.id }
  } catch (error) {
    console.error("Failed to submit enquiry:", error)
    return { success: false, error: "Failed to submit enquiry" }
  }
}

export async function submitCustomQuote(data: {
  name: string
  email: string
  phone: string
  style: string
  shape: string
  dimensions: string
  material: string
  colors: string
  quantity: string
  usageType: string
  location: string
  notes: string
}) {
  try {
    const quote = await db.customCarpetRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        style: data.style,
        shape: data.shape,
        dimensions: data.dimensions,
        material: data.material,
        colors: data.colors,
        quantity: parseInt(data.quantity) || 1,
        usageType: data.usageType,
        location: data.location,
        notes: data.notes,
      }
    })
    return { success: true, id: quote.id }
  } catch (error) {
    console.error("Failed to submit custom quote:", error)
    return { success: false, error: "Failed to submit quote" }
  }
}
