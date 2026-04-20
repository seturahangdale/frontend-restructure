'use client'

import { motion } from 'framer-motion'

const BUTTONS = [
  { label: 'Film Shooting Guide',        href: '/forms/film-shooting-guide-mp.pdf',  gold: true  },
  { label: 'Movie Promotion Guide',       href: '/forms/film-promotion-guide-mp.pdf', gold: false },
  { label: 'Theatre Advertisement Guide', href: '/forms/theatre-advertisement-guide-mp.pdf', gold: false },
  { label: 'Celebrity Management Guide',  href: '/forms/celebrity-management-guide-mp.pdf',  gold: false },
  { label: 'Subsidy Guide',               href: '/forms/subsidy-guide-mp.pdf',         gold: false },
]

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black aspect-video sm:aspect-auto sm:h-screen sm:min-h-150">

      {/* VIDEO — top-anchored on mobile, contained on desktop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/newhero.mp4" type="video/mp4" />
      </video>

      {/* Gradient — heavier at bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-black/5" />
      {/* Left edge fade */}
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

      {/* ── MOBILE: text inside video area (16:9 anchor) ── */}
      <div className="sm:hidden absolute top-0 left-0 w-full z-10 pointer-events-none" style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }} />
        <motion.div
          className="absolute bottom-0 left-0 px-5 pb-3 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-5 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[8px]">✦</span>
            <span className="text-[#F5F0E8]/50 text-[8px] tracking-[0.4em] uppercase font-medium">Madhya Pradesh — The Heart of India</span>
            <span className="text-[#C9A84C] text-[8px]">✦</span>
            <span className="h-px w-5 bg-[#C9A84C]" />
          </div>
          <p className="text-[#F5F0E8]/60 text-[10px] max-w-55 leading-relaxed">
            Film Industry MP is a network-driven film facilitation platform that connects filmmakers with trusted local coordinators, line producers, and production teams across Madhya Pradesh.<br /><br />
            Instead of directly providing services, we ensure efficient on-ground execution through verified city-level experts, making film production faster, smoother, and cost-effective.
          </p>
        </motion.div>
      </div>


      {/* ── DESKTOP: tagline top-left + buttons horizontal bottom ── */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 z-10 px-12 lg:px-16 pb-10">
        <div className="max-w-7xl mx-auto">

          {/* Tagline — left aligned */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs">✦</span>
              <span className="text-[#F5F0E8]/45 text-[10px] tracking-[0.45em] uppercase font-medium">Madhya Pradesh — The Heart of India</span>
              <span className="text-[#C9A84C] text-xs">✦</span>
              <span className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <p className="text-[#F5F0E8]/60 text-sm leading-relaxed whitespace-nowrap">
              Film Industry MP is a network-driven film facilitation platform that connects filmmakers with trusted local coordinators, line producers, and production teams across Madhya Pradesh.
            </p>
          </motion.div>

          {/* Second line above buttons */}
          <p className="text-[#F5F0E8]/60 text-sm leading-relaxed mb-4 mt-2 whitespace-nowrap">
            Instead of directly providing services, we ensure efficient on-ground execution through verified city-level experts, making film production faster, smoother, and cost-effective.
          </p>

          {/* Horizontal guide buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {BUTTONS.map(({ label, href, gold }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('/forms') ? '_blank' : undefined}
                rel={href.startsWith('/forms') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all duration-300 ${
                  gold
                    ? 'bg-[#C9A84C] text-black hover:bg-[#E8C97A]'
                    : 'bg-black/60 backdrop-blur-sm text-white/70 border border-white/10 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]'
                }`}
              >
                <span className={`w-1 h-1 rounded-full shrink-0 ${gold ? 'bg-black' : 'bg-[#C9A84C]'}`} />
                {label}
              </motion.a>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, #C9A84C60, transparent 60%)' }}
      />
    </section>
  )
}
