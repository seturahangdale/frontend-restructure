'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import Link from 'next/link'

const categories = [
  { title: 'Period Drama', slug: 'period-drama' },
  { title: 'Bollywood Movie', slug: 'bollywood-movie' },
  { title: 'Tollywood Movie', slug: 'tollywood-movie' },
  { title: 'Web Series', slug: 'web-series' },
  { title: 'TV Serials', slug: 'tv-serials' },
  { title: 'TV Ads', slug: 'tv-ads' },
  { title: 'Movie Promotion', slug: 'movie-promotion' },
]

export function ProjectsContent() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-balance">
              Film Shoots in Madhya Pradesh
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Explore different categories of productions filmed in our state
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <ScrollReveal key={category.slug} delay={index * 0.1}>
                <Link href={`/categories/${category.slug}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group h-48 bg-linear-to-br from-primary to-accent rounded-lg p-8 flex items-center justify-center text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:scale-110 transition-transform">
                      {category.title}
                    </h3>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
