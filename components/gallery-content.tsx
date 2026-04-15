'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { Lightbox } from './lightbox'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Landmark, Crown, Leaf, Camera, Flame } from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  heritage:  <Landmark  size={13} strokeWidth={1.5} />,
  palaces:   <Crown     size={13} strokeWidth={1.5} />,
  nature:    <Leaf      size={13} strokeWidth={1.5} />,
  wildlife:  <Camera    size={13} strokeWidth={1.5} />,
  spiritual: <Flame     size={13} strokeWidth={1.5} />,
}
import { apiClient } from '@/lib/api-client'

interface GalleryItem {
  id: string
  title: string
  category: string
  description: string
  src: string
  tags: string[]
}

interface Category {
  id: string
  name: string
  color: string
  icon: string
  description?: string
}

// Card heights alternate for masonry feel
const HEIGHTS = [420, 340, 500, 360, 460, 320, 480, 380]

export function GalleryContent() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getGalleryData()
        setItems(data.items || [])
        setCategories(data.categories || [])
      } catch (error) {
        console.error('Failed to fetch gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleNext = () => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  const handlePrevious = () => setLightboxIndex((prev) => prev === 0 ? filteredItems.length - 1 : prev - 1)

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        {/* Gold radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        </div>

        {/* Gold ornamental top border */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-32">
          <motion.p
            className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          >
            Madhya Pradesh · Cinematic Landscapes
          </motion.p>

          <div className="flex items-end gap-6">
            {/* Gold divider */}
            <div className="hidden md:flex items-center gap-3 mb-2">
              <div className="w-16 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-lg">✦</span>
            </div>
            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold leading-none"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            >
              Location <span className="text-[#C9A84C]">Gallery</span>
            </motion.h1>
          </div>

          <motion.p
            className="mt-4 text-white/40 text-sm md:text-base tracking-wide max-w-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where every frame tells a story. Explore Madhya Pradesh's most cinematic landscapes — heritage monuments, royal palaces, pristine forests, and sacred ghats that have graced India's finest productions.
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }} />
      </section>

      {/* ── FILTER BAR ─────────────────────────────────────────── */}
      <section className="sticky top-[72px] z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-[#C9A84C]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-wrap gap-3">
          {/* All */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 border ${
              selectedCategory === null
                ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {CATEGORY_ICONS[cat.id] ?? null}
              {cat.name}
            </button>
          ))}

          {/* Count */}
          <span className="ml-auto self-center text-[10px] tracking-widest text-white/20 uppercase">
            {filteredItems.length} locations
          </span>
        </div>
      </section>

      {/* ── MASONRY GRID ───────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-48">
              <div className="w-10 h-10 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mb-6" />
              <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Loading Gallery</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-48 border border-[#C9A84C]/10">
              <p className="text-white/20 tracking-widest uppercase text-sm">No locations found</p>
            </div>
          ) : (
            <div
              className="columns-1 sm:columns-2 lg:columns-3"
              style={{ columnGap: '1rem' }}
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => {
                  const h = HEIGHTS[index % HEIGHTS.length]
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
                      className="group relative mb-4 cursor-pointer overflow-hidden break-inside-avoid"
                      style={{ height: h }}
                      onClick={() => openLightbox(index)}
                    >
                      {/* Image */}
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                      {/* Gold top-left tag */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] border border-[#C9A84C]/50 px-3 py-1 bg-black/60 backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>

                      {/* Pin icon top-right */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                          <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                        </div>
                      </div>

                      {/* Bottom info — slides up on hover */}
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-5"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)' }}
                      >
                        {/* Gold line */}
                        <div className="w-8 h-px bg-[#C9A84C] mb-3" />
                        <h3 className="font-display text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                      </div>

                      {/* Subtle gold border on hover */}
                      <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/30 transition-all duration-500 pointer-events-none" />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #C9A84C30)' }} />
          <span className="text-[#C9A84C]/30 text-sm">✦</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #C9A84C30)' }} />
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          isOpen={lightboxOpen}
          images={filteredItems}
          imageIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </main>
  )
}
