import type { Metadata } from 'next'
import { HorizontalScrollHome } from "@/components/horizontal-scroll-home"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"

export const metadata: Metadata = {
  title: 'Film Industry MP — Complete Film Production Partner in Madhya Pradesh',
  alternates: { canonical: 'https://filmindustrymp.com/film-industry' },
}

export default function FilmIndustryHome() {
  return (
    <>
      <HorizontalScrollHome />
      <Footer />
      <FloatingButtons />
    </>
  )
}
