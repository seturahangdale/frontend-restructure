import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const siteUrl = 'https://filmindustrymp.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Film Industry MP – Film Shooting in Madhya Pradesh',
    template: '%s | Film Industry MP',
  },
  description:
    'Film Industry MP is your complete production partner in Madhya Pradesh. Locations, subsidies, permits, line producers, and crew — all in one place.',
  keywords: [
    'film shooting Madhya Pradesh',
    'MP film subsidy',
    'film locations India',
    'Bollywood shooting locations',
    'line producer MP',
    'Film Industry MP',
    'Madhya Pradesh film commission',
    'OTT shoot Madhya Pradesh',
  ],
  authors: [{ name: 'Film Industry MP', url: siteUrl }],
  creator: 'Film Industry MP',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Film Industry MP',
    title: 'Film Industry MP – Film Shooting in Madhya Pradesh',
    description:
      'Your complete production partner in Madhya Pradesh. Locations, subsidies, permits, line producers, and crew.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Film Industry MP – The Heart of India on Screen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Film Industry MP – Film Shooting in Madhya Pradesh',
    description:
      'Your complete production partner in Madhya Pradesh. Locations, subsidies, permits, and crew.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

import { Toaster } from 'sonner'
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased text-foreground bg-background transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Navbar Wrapper - handles visibility on admin pages */}
          <NavbarWrapper />

          {/* Page content with proper z-indexing */}
          <main className="relative">
            {children}
          </main>

          <Toaster position="top-right" richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
