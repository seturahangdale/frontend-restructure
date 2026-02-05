'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from './ui/button'
import { ScrollReveal } from './scroll-reveal'
import { ArrowRight } from 'lucide-react'

/* ================= ABOUT PREVIEW ================= */

function AboutPreviewSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          <ScrollReveal>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
                Who We Are
              </h2>

              <p className="text-base sm:text-lg text-foreground/70">
                FilmIndustryMP is a dedicated film production support and line
                production platform based in Madhya Pradesh.
              </p>

              <p className="text-base sm:text-lg text-foreground/70">
                We work as a single-window facilitation partner for filmmakers,
                providing permissions, locations, subsidies, and execution support.
              </p>

              <Link href="/pamphlets">
                <Button className="bg-primary text-white w-full sm:w-auto mt-2">
                  View Project Pamphlets
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 sm:p-7 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What We Do</h3>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-foreground/80">
                <li>Facilitate film shootings across Madhya Pradesh</li>
                <li>Provide complete line production services</li>
                <li>Assist with MP film subsidy and incentives</li>
                <li>Coordinate government permissions and approvals</li>
                <li>Offer locations, crew, artists, and logistics</li>
                <li>Promote MP's culture and heritage through cinema</li>
              </ul>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}

/* ================= GALLERY PREVIEW ================= */

function GalleryPreviewSection() {
  const previews = [
    {
      title: 'Khajuraho',
      category: 'Heritage',
      image: '/images/Khajuraho Temple.jpg',
    },
    {
      title: 'Orchha',
      category: 'Palaces',
      image: '/images/gallery-orchha.jpg',
    },
    {
      title: 'Pachmarhi',
      category: 'Nature',
      image: '/images/gallery-pachmarhi.jpg',
    },
    {
      title: 'Gwalior Fort',
      category: 'Heritage',
      image: '/images/gallery-gwalior.jpg',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-4">
              Stunning Locations
            </h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Explore the diverse heritage and natural beauty of Madhya Pradesh
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {previews.map((preview, index) => (
            <ScrollReveal key={preview.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative h-48 sm:h-52 md:h-56 lg:h-48 rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={preview.image}
                  alt={preview.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold">
                    {preview.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90">{preview.category}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link href="/gallery">
              <Button className="bg-accent text-white w-full sm:w-auto">
                View Full Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

/* ================= PROJECTS PREVIEW ================= */

function ProjectsPreviewSection() {
  const featuredCategories = [
    {
      title: 'Period Drama',
      slug: 'period-drama',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Bollywood Movie',
      slug: 'bollywood-movie',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Web Series',
      slug: 'web-series',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'TV Ads',
      slug: 'tv-ads',
      gradient: 'from-green-500 to-teal-600',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-4">
              Film Categories
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
              Explore the diverse range of productions filmed in Madhya Pradesh
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {featuredCategories.map((category, index) => (
            <ScrollReveal key={category.slug} delay={index * 0.1}>
              <Link href={`/categories/${category.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group h-36 sm:h-40 bg-gradient-to-br ${category.gradient} rounded-xl p-4 sm:p-6 flex items-center justify-center text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:scale-110 transition-transform">
                    {category.title}
                  </h3>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link href="/projects">
              <Button className="bg-primary text-white w-full sm:w-auto">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

/* ===== EXPORTS ===== */

export { AboutPreviewSection, GalleryPreviewSection, ProjectsPreviewSection }
