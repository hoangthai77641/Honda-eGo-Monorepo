import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Honda eGo - Dịch vụ giao hàng thông minh',
  description: 'Nền tảng giao hàng thông minh với AI, kết nối khách hàng và tài xế một cách hiệu quả nhất.',
  keywords: 'giao hàng, delivery, Honda, eGo, AI, thông minh, logistics',
  authors: [{ name: 'Honda eGo Team' }],
  creator: 'Honda eGo',
  publisher: 'Honda eGo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://honda-ego.com'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/vi',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Honda eGo - Dịch vụ giao hàng thông minh',
    description: 'Nền tảng giao hàng thông minh với AI, kết nối khách hàng và tài xế một cách hiệu quả nhất.',
    url: 'https://honda-ego.com',
    siteName: 'Honda eGo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Honda eGo - Smart Delivery Platform',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honda eGo - Dịch vụ giao hàng thông minh',
    description: 'Nền tảng giao hàng thông minh với AI, kết nối khách hàng và tài xế một cách hiệu quả nhất.',
    images: ['/twitter-image.jpg'],
    creator: '@honda_ego',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Honda eGo" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
