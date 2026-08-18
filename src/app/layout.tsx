import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { MessageCircle } from "lucide-react"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "A2Z Carpet | Luxury Carpets & Bespoke Rugs",
  description: "Discover handcrafted luxury carpets, wall-to-wall commercial solutions, and fully bespoke rug designs by master artisans. Transform your space with A2Z Carpet.",
  keywords: "luxury carpets, bespoke rugs, handloom carpets, silk rugs, wall-to-wall carpets, buy carpets india",
  openGraph: {
    title: "A2Z Carpet | Luxury Carpets & Bespoke Rugs",
    description: "Premium online carpet showroom offering handcrafted luxury rugs.",
    type: "website",
    locale: "en_IN",
    url: "https://a2zcarpet.com",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "A2Z Carpet",
  "url": "https://a2zcarpet.com",
  "logo": "https://a2zcarpet.com/logo1.png",
  "description": "Luxury Carpet Manufacturer and Retailer",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-8558085579",
    "contactType": "customer service"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground`} suppressHydrationWarning>
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        
        {/* Floating WhatsApp Widget */}
        <a 
          href="https://wa.me/918558085579" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute right-16 bg-white text-gray-800 text-xs py-1 px-3 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with an Expert
          </span>
        </a>

        <Header />
        <CartDrawer />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
