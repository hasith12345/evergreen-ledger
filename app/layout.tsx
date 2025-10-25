import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { LayoutWrapper } from '@/components/layout-wrapper'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'EvergreenLedger',
  description: 'Tea Leaf Supplier Management System'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" >
      <head>
        <link rel="icon" type="image/x-icon" href="/logo.png" />
        {/* Ensure proper mobile scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
