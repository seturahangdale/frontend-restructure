import type { Metadata } from 'next'
import { HeroSection } from "@/components/hero-section"
import { TextBanner } from "@/components/text-banner"
import { MPProjectSection } from "@/components/mp-project-section"
import { BenefitsSection } from "@/components/benefits-section"
import {
  AboutPreviewSection,
  GalleryPreviewSection,
} from "@/components/home-preview-sections"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"

export const metadata: Metadata = {
  alternates: { canonical: 'https://filmindustrymp.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Film Industry MP',
  url: 'https://filmindustrymp.com',
  logo: 'https://filmindustrymp.com/logo.png',
  description:
    'Film Industry MP is your complete production partner in Madhya Pradesh — locations, subsidies, permits, line producers, and crew.',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+91-919977110001',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TextBanner />
      <MPProjectSection />
      <BenefitsSection />
      <AboutPreviewSection />
      <GalleryPreviewSection />
      <Footer />
      <FloatingButtons />
    </>
  )
}
