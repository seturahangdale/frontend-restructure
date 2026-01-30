'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { Lightbox } from './lightbox'
import { useState } from 'react'
import Image from 'next/image'

const galleryItems = [
  {
    id: 1,
    title: 'Khajuraho',
    category: 'Heritage',
    src: '/images/Khajuraho Temple.jpg',
    tags: ['Heritage', 'Temples', 'Architecture'],
  },
  {
    id: 2,
    title: 'Orchha',
    category: 'Palaces',
    src: '/images/gallery-orchha.jpg',
    tags: ['Palaces', 'River', 'Heritage'],
  },
  {
    id: 3,
    title: 'Pachmarhi',
    category: 'Nature',
    src: '/images/gallery-pachmarhi.jpg',
    tags: ['Waterfall', 'Forest', 'Nature'],
  },
  {
    id: 4,
    title: 'Gwalior Fort',
    category: 'Heritage',
    src: '/images/gallery-gwalior.jpg',
    tags: ['Fort', 'Monument', 'Heritage'],
  },
  {
    id: 5,
    title: 'Sanchi',
    category: 'Heritage',
    src: '/images/sanchi.jpg',
    tags: ['Stupa', 'Buddhist', 'Monument'],
  },
  {
    id: 6,
    title: 'Mandu',
    category: 'Nature',
    src: '/images/gallery-mandu.jpg',
    tags: ['Plateau', 'Landscape', 'Nature'],
  },
]

const categories = ['All', 'Heritage', 'Palaces', 'Nature']

export function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const handlePrevious = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    )
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-balance">
              Stunning Locations of Madhya Pradesh
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Explore the diverse heritage, natural beauty, and film production
              spaces across our state
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 md:py-16 bg-background sticky top-20 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category)
                    setLightboxIndex(0)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/20'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openLightbox(index)}
                  className="group cursor-pointer rounded-lg overflow-hidden film-card"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden bg-muted">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-6">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-2xl font-display font-bold mb-2">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        imageIndex={lightboxIndex}
        images={filteredItems}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </main>
  )
}
