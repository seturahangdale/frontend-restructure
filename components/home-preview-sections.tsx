'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from './ui/button'
import { ScrollReveal } from './scroll-reveal'
import { ArrowRight } from 'lucide-react'

export function AboutPreviewSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Who We Are
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Film Industry MP was created to bridge the gap between ambition and execution.
                Despite Madhya Pradesh's unparalleled locations and heritage, many productions
                never return after their first shoot.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We eliminate this problem through professional line producers, government
                coordination, and verified vendors—creating a single-window ecosystem that
                makes every production smoother, faster, and more cost-effective.
              </p>
              <Link href="/pamphlets">
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white group">
                    View Project Pamphlets
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>

          {/* Image Placeholder */}
         {/* Image */}
<ScrollReveal delay={0.2}>
  <div className="flex justify-center">
    <img
      src="/maheshwarwho.jpg"
      alt="Film production in Madhya Pradesh"
      className="h-auto w-auto max-w-full rounded-lg"
    />
  </div>
</ScrollReveal>

        </div>
      </div>
    </section>
  )
}

export function GalleryPreviewSection() {
  const previews = [
    {
      title: 'Khajuraho',
      category: 'Heritage',
      color: 'from-amber-600 to-orange-600',
    },
    {
      title: 'Orchha',
      category: 'Palaces',
      color: 'from-rose-600 to-pink-600',
    },
    {
      title: 'Pachmarhi',
      category: 'Nature',
      color: 'from-emerald-600 to-green-600',
    },
    {
      title: 'Gwalior Fort',
      category: 'Heritage',
      color: 'from-indigo-600 to-blue-600',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Stunning Locations
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore the diverse heritage, natural beauty, and film production spaces
              across Madhya Pradesh
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {previews.map((preview, index) => (
            <ScrollReveal key={preview.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`bg-gradient-to-br ${preview.color} rounded-lg p-8 text-center text-white min-h-40 md:min-h-48 flex flex-col justify-center items-center group cursor-pointer`}
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  {preview.title}
                </h3>
                <p className="text-sm opacity-90 group-hover:opacity-100">
                  {preview.category}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link href="/gallery">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-accent hover:bg-accent/90">
                  View Full Gallery
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function ProjectsPreviewSection() {
  const projects = [
    { title: 'Period Drama', year: '2024' },
    { title: 'Bollywood Action', year: '2024' },
    { title: 'International Doc', year: '2023' },
    { title: 'Web Series', year: '2023' },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Films Shot in Madhya Pradesh
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover the diverse productions that have chosen our state as their
              premier filming destination
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg overflow-hidden border border-primary/20 hover:border-accent/50 transition-colors cursor-pointer group"
              >
                <div className="aspect-video bg-primary/10 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-center absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-6xl opacity-20">🎬</span>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mt-2">{project.year}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary hover:bg-primary/90">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
