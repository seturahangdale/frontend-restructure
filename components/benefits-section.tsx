'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'

const benefits = [
  { number: '01', title: 'Ease of Permissions',        description: 'We facilitate faster permissions through local coordinators and regional support systems, helping you navigate approvals, incentives, and compliance efficiently.' },
  { number: '02', title: 'Verified Line Producers',    description: 'Access trusted line producers and city-level experts from our network, ensuring smooth and reliable on-ground execution.' },
  { number: '03', title: 'Ideal Film Locations',       description: 'Discover diverse locations through local experts who understand regional landscapes, aligned with your script and budget.' },
  { number: '04', title: 'Local Crew & Artists',       description: 'Connect with skilled technicians, artists, and production staff through our district-level network — ensuring quality and cost efficiency.' },
  { number: '05', title: 'Cost-Effective Planning',    description: 'Plan smarter with local vendor networks, regional insights, and optimized budgeting, reducing overall production costs.' },
  { number: '06', title: 'Films, OTT & Ad Shoots',     description: 'Execute projects seamlessly with on-ground support from experienced local teams across films, OTT, ads, and digital content.' },
  { number: '07', title: 'Fast & Transparent Process', description: 'Experience smooth coordination with clear communication, realistic timelines, and transparent execution via local partners.' },
  { number: '08', title: 'Strong Local Presence',      description: 'Benefit from our deep-rooted network across multiple districts, offering strong regional knowledge and faster coordination.' },
  { number: '09', title: 'Production-Friendly Approach', description: 'We enable a production-friendly environment by connecting you with the right local teams, ensuring your creative vision is executed smoothly.' },
  { number: '10', title: 'Statewide Network Coverage', description: 'Leverage our extensive network across all districts of Madhya Pradesh, ensuring consistent support, faster coordination, and seamless execution regardless of location.' },
]

const goldGrad = {
  background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

// Floating particles
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${8 + Math.random() * 84}%`,
  y: `${5 + Math.random() * 90}%`,
  size: 1 + Math.random() * 1.5,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}))

function SpotlightGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const [hovered, setHovered] = useState(false)

  const handleMouse = (e: React.MouseEvent) => {
    if (!gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={gridRef}
      className="flex-1 relative z-10 flex items-start overflow-y-auto px-4 md:px-6 py-8 h-screen"
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spotlight */}
      {hovered && (
        <motion.div
          className="absolute pointer-events-none z-0 rounded-full"
          style={{
            width: 400,
            height: 400,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
      )}

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 w-full relative z-10"
        style={{}}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {benefits.map((b, i) => (
          <motion.div
            key={b.number}
            className="group relative p-5 cursor-default"
            style={{
              borderRight: (i % 3 !== 2) ? '1px solid rgba(201,168,76,0.08)' : 'none',
              borderBottom: (i < 9) ? '1px solid rgba(201,168,76,0.08)' : 'none',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 + i * 0.05 }}
            whileHover={{ backgroundColor: 'rgba(201,168,76,0.04)' }}
          >
            {/* Gold top border on hover */}
            <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: 'linear-gradient(to right, #C9A84C, #E8C97A)' }} />

            {/* Number — brightens on hover */}
            <motion.span
              className="block font-display font-bold text-3xl leading-none mb-3 transition-all duration-300"
              style={{ color: 'rgba(201,168,76,0.12)' }}
              whileHover={{ color: 'rgba(201,168,76,0.45)', scale: 1.05 } as any}
            >
              {b.number}
            </motion.span>

            <h3 className="font-display font-semibold text-[#F5F0E8] text-base mb-2 group-hover:text-[#C9A84C] transition-colors duration-300 leading-snug">
              {b.title}
            </h3>
            <p className="text-[#F5F0E8]/32 text-sm leading-relaxed group-hover:text-[#F5F0E8]/55 transition-colors duration-300">
              {b.description}
            </p>

            {/* Bottom-right corner accent on hover */}
            <div className="absolute bottom-0 right-0 w-0 h-0 group-hover:w-5 group-hover:h-5 transition-all duration-300"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function BenefitsSection() {
  return (
    <section className="relative w-full h-full bg-[#080808] flex flex-col md:flex-row overflow-hidden">

      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: '#C9A84C',
          }}
          animate={{ y: [0, -22, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

      {/* ── LEFT: Title ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 py-12 md:py-0 md:px-14 lg:px-16 w-full md:w-[34%] md:shrink-0">

        {/* Ghost number */}
        <motion.span
          className="absolute font-display font-bold select-none pointer-events-none hidden md:block"
          style={{ fontSize: 'clamp(120px,16vw,200px)', color: 'rgba(201,168,76,0.03)', bottom: '-20px', left: '10px', lineHeight: 1 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
        >
          10
        </motion.span>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          <span className="text-[#C9A84C] text-sm">✦</span>
        </div>

        <motion.h2
          className="font-display font-bold text-[#F5F0E8] text-3xl md:text-4xl lg:text-5xl leading-tight mb-5"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          10 Reasons to<br />Film in{' '}
          <span style={goldGrad}>MP</span>
        </motion.h2>

        <motion.p
          className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-xs mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
        >
          Everything your production needs — enabled through our network of local coordinators, crews, and partners across Madhya Pradesh.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-[#C9A84C] text-xs tracking-[0.3em] uppercase group hover:gap-5 transition-all duration-300"
          >
            Learn More
            <span className="h-px w-6 bg-[#C9A84C] group-hover:w-10 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Vertical separator */}
      <div className="hidden md:block absolute inset-y-0 z-10"
        style={{ left: '34%', width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)' }} />

      {/* ── RIGHT: grid with spotlight ── */}
      <SpotlightGrid />

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

    </section>
  )
}
