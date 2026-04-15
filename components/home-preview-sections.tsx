'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Landmark, Crown, Trees, Camera, Flame, Waves } from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  heritage:    Landmark,
  palaces:     Crown,
  nature:      Trees,
  wildlife:    Camera,
  spiritual:   Flame,
  rivers:      Waves,
}


const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

/* ══════════════════════════════════════════
   ABOUT PREVIEW
══════════════════════════════════════════ */
function AboutPreviewSection() {
  const [data, setData]       = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getAboutData()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="relative w-full min-h-screen md:h-full bg-[#080808] overflow-hidden flex">

      {/* ── Full-bleed background image ── */}
      <img
        src="/images/film-production.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      {/* Cinematic overlay — heavy left, lighter right */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.88) 45%, rgba(8,8,8,0.55) 100%)' }}
      />
      {/* Top/bottom vignette */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 85%, #080808 100%)' }} />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

      {/* ── Content — left-aligned ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-20 md:py-0 md:px-16 lg:px-20 w-full max-w-3xl">

        <motion.p
          className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase mb-4 font-medium"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          Est. 2025 · Indore, Madhya Pradesh
        </motion.p>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          <span className="text-[#C9A84C] text-sm">✦</span>
        </div>

        <motion.h2
          className="font-display font-bold text-[#F5F0E8] text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Film Industry <span style={goldText}>MP</span>
        </motion.h2>
        <motion.p
          className="text-sm tracking-[0.3em] text-[#C9A84C]/70 uppercase font-medium mb-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        >
          A Film Facilitation Hub Across Madhya Pradesh
        </motion.p>



        {/* ── What We Do — compact list ── */}
        {!loading && data && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-4 font-medium">What We Do</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {data.whatWeDo.items.slice(0, 6).map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[#C9A84C] text-xs">✦</span>
                  <span className="text-[#F5F0E8]/45 text-sm leading-snug truncate">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.85 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-[#C9A84C] text-xs tracking-[0.3em] uppercase group hover:gap-5 transition-all duration-300"
          >
            <span>Read Our Story</span>
            <span className="h-px w-8 bg-[#C9A84C] group-hover:w-12 transition-all duration-300" />
          </Link>
        </motion.div>

      </div>

      {/* Gold bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
    </section>
  )
}

/* ══════════════════════════════════════════
   GALLERY PREVIEW — A24 Films Hover Reveal
══════════════════════════════════════════ */
function GalleryPreviewSection() {
  const [data, setData]         = useState<any>(null)
  const [loading, setLoading]   = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    apiClient.getGalleryData()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return (
      <section className="w-screen h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </section>
    )
  }

  const categories: any[] = data.categories || []
  const items: any[]      = data.items || []

  const getThumbnail = (cat: any) => {
    if (cat.thumbnail?.trim()) return cat.thumbnail
    const first = items.find((item: any) => item.category === cat.id)
    return first?.src || '/images/Khajuraho Temple.jpg'
  }

  const hoveredCat   = categories.find((c: any) => c.id === hoveredId)
  const hoveredImage = hoveredCat ? getThumbnail(hoveredCat) : null

  return (
    <section
      className="relative w-screen min-h-screen bg-[#080808] flex flex-col justify-center"
      onMouseLeave={() => setHoveredId(null)}
    >

      {/* ── Full-screen background image — crossfade on hover ── */}
      <AnimatePresence mode="sync">
        {hoveredImage && (
          <motion.div
            key={hoveredId}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <img
              src={hoveredImage}
              alt=""
              className="w-full h-full object-cover scale-105"
            />
            {/* Dark cinematic overlay — keeps text readable */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(8,8,8,0.78)' }}
            />
            {/* Left vignette */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.6), transparent 60%)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-10 lg:px-16">

        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.5em] text-[#C9A84C]/60 uppercase mb-2 font-medium">
            Cinematic Locations
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-4xl leading-tight">
              Top Locations in<br />
              <span style={goldText}>Madhya Pradesh</span>
            </h2>
            <Link
              href="/gallery"
              className="shrink-0 flex items-center gap-3 text-[#C9A84C]/60 hover:text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 group mb-2"
            >
              View All
              <span className="h-px w-6 bg-[#C9A84C]/60 group-hover:bg-[#C9A84C] group-hover:w-10 transition-all duration-300" />
            </Link>
          </div>

          {/* Gold divider */}
          <div className="mt-5 h-px w-full" style={{ background: 'rgba(201,168,76,0.15)' }} />
        </motion.div>

        {/* ── Location rows — A24 style ── */}
        <div>
          {categories.map((cat: any, i: number) => (
            <Link
              key={cat.id}
              href="/gallery"
              className="group flex items-center gap-6 py-3 border-b transition-all duration-400 cursor-pointer"
              style={{
                borderColor: hoveredId === cat.id
                  ? 'rgba(201,168,76,0.35)'
                  : 'rgba(255,255,255,0.05)',
              }}
              onMouseEnter={() => setHoveredId(cat.id)}
            >
              {/* Number */}
              <span
                className="font-display font-bold text-sm tabular-nums transition-colors duration-300 w-8 shrink-0"
                style={{ color: hoveredId === cat.id ? '#C9A84C' : 'rgba(201,168,76,0.2)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              {(() => {
                const Icon = CATEGORY_ICONS[cat.id]
                return Icon ? (
                  <Icon
                    className="shrink-0 transition-all duration-300"
                    style={{
                      width: 20, height: 20,
                      color: hoveredId === cat.id ? '#C9A84C' : 'rgba(201,168,76,0.3)',
                      strokeWidth: 1.5,
                    }}
                  />
                ) : null
              })()}

              {/* Location Name — big, transforms on hover */}
              <motion.span
                className="font-display font-bold flex-1 leading-none tracking-tight transition-all duration-400"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: hoveredId === cat.id ? '#F5F0E8' : 'rgba(245,240,232,0.35)',
                }}
              >
                {cat.name}
              </motion.span>

              {/* Description — reveals on hover, desktop only */}
              <span
                className="hidden lg:block text-sm text-right max-w-[220px] leading-relaxed transition-all duration-400 shrink-0"
                style={{
                  color: hoveredId === cat.id ? 'rgba(245,240,232,0.5)' : 'transparent',
                }}
              >
                {cat.description || `Explore ${cat.name} filming locations across MP`}
              </span>

              {/* Arrow */}
              <motion.span
                className="text-[#C9A84C] text-xl shrink-0 transition-all duration-300"
                style={{
                  opacity: hoveredId === cat.id ? 1 : 0,
                  transform: hoveredId === cat.id ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                →
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          className="mt-8 text-[9px] tracking-[0.4em] text-white/15 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Hover to explore · Click to view
        </motion.p>

      </div>

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

    </section>
  )
}

/* ══════════════════════════════════════════
   EXPORTS
══════════════════════════════════════════ */
export {
  AboutPreviewSection,
  GalleryPreviewSection,
}
