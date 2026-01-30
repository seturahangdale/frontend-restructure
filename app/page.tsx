import { HeroSection } from "@/components/hero-section"
import { TextBanner } from "@/components/text-banner"
import { MPProjectSection } from "@/components/mp-project-section"
import { BenefitsSection } from "@/components/benefits-section"
import {
  AboutPreviewSection,
  GalleryPreviewSection,
  ProjectsPreviewSection,
} from "@/components/home-preview-sections"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"

export default function Home() {
  return (
    <>
      {/* Full-screen hero video section */}
      <HeroSection />

      {/* Infinite scrolling text banner */}
      <TextBanner />

      {/* Remaining homepage sections */}
      <MPProjectSection />
      <BenefitsSection />
      <AboutPreviewSection />
      <GalleryPreviewSection />
      <ProjectsPreviewSection />

      {/* Footer */}
      <Footer />

      {/* Floating buttons */}
      <FloatingButtons />
    </>
  )
}
