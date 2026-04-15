'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { HeroSection } from '@/components/hero-section'

import { MPProjectSection } from '@/components/mp-project-section'
import { BenefitsSection } from '@/components/benefits-section'
import { AboutPreviewSection, GalleryPreviewSection } from '@/components/home-preview-sections'

const PANELS = 5
const PANEL_LABELS = ['Hero', 'Projects', 'Benefits', 'About', 'Gallery']

// Separate component per dot — keeps hooks out of loops
function Dot({ index, activeProgress }: { index: number; activeProgress: MotionValue<number> }) {
  const opacity = useTransform(activeProgress, [index - 0.5, index, index + 0.5], [0.2, 1, 0.2])
  const scale   = useTransform(activeProgress, [index - 0.5, index, index + 0.5], [0.7, 1.5, 0.7])
  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
      style={{ opacity, scale }}
      title={PANEL_LABELS[index]}
    />
  )
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.1], [1, 0])
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
      style={{ opacity }}
    >
      <p className="text-[9px] tracking-[0.4em] text-[#C9A84C]/60 uppercase">Scroll</p>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-px h-10 bg-linear-to-b from-[#C9A84C]/60 to-transparent"
      />
    </motion.div>
  )
}

function PanelDots({ progress }: { progress: MotionValue<number> }) {
  const activeProgress = useTransform(progress, [0, 1], [0, PANELS - 1])
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 max-md:hidden">
      {Array.from({ length: PANELS }, (_, i) => (
        <Dot key={i} index={i} activeProgress={activeProgress} />
      ))}
    </div>
  )
}

function PanelLabel({ num, total }: { num: number; total: number }) {
  return (
    <div className="absolute bottom-6 right-8 z-10 max-md:hidden pointer-events-none">
      <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-medium">
        {String(num).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

export function HorizontalScrollHome() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `${-(PANELS - 1) * 100}vw`]
  )

  return (
    <>
      {/* ── MOBILE: vertical stacked sections ── */}
      <div className="md:hidden flex flex-col">
        <HeroSection />
        <MPProjectSection />
        <BenefitsSection />
        <AboutPreviewSection />
        <GalleryPreviewSection />
      </div>

      {/* ── DESKTOP: horizontal scroll ── */}
      <div ref={containerRef} className="hidden md:block" style={{ height: `${PANELS * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Gold progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-9990"
            style={{
              height: '1px',
              scaleX: scrollYProgress,
              transformOrigin: 'left center',
              background: 'linear-gradient(to right, transparent, #C9A84C, #E8C97A)',
            }}
          />

          <PanelDots progress={scrollYProgress} />
          <ScrollHint progress={scrollYProgress} />

          {/* Horizontal panels strip */}
          <motion.div style={{ x }} className="flex h-screen will-change-transform">

            {/* Panel 1 — Hero */}
            <div className="relative w-screen h-screen shrink-0 overflow-hidden">
              <HeroSection />
              <PanelLabel num={1} total={PANELS} />
            </div>

            {/* Panel 2 — MP Projects (split layout, self-contained w-screen h-screen) */}
            <div className="relative shrink-0">
              <MPProjectSection />
              <PanelLabel num={2} total={PANELS} />
            </div>

            {/* Panel 3 — Benefits */}
            <div className="relative w-screen h-screen shrink-0 overflow-hidden bg-[#080808]">
              <BenefitsSection />
              <PanelLabel num={3} total={PANELS} />
            </div>

            {/* Panel 4 — About Preview */}
            <div className="relative w-screen h-screen shrink-0 overflow-hidden bg-[#080808]">
              <AboutPreviewSection />
              <PanelLabel num={4} total={PANELS} />
            </div>

            {/* Panel 5 — Gallery Preview */}
            <div className="relative w-screen h-screen shrink-0 overflow-hidden bg-[#080808]">
              <GalleryPreviewSection />
              <PanelLabel num={5} total={PANELS} />
            </div>

          </motion.div>
        </div>
      </div>
    </>
  )
}
