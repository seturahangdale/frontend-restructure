'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center overflow-hidden">

      {/* Gold top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          className="font-display font-bold"
          style={{ fontSize: 'clamp(80px, 20vw, 260px)', color: 'rgba(201,168,76,0.03)', whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          PORTFOLIO
        </motion.span>
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

        {/* Icon */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          <span className="text-[#C9A84C] text-sm">✦</span>
          <span className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-[10px] tracking-[0.6em] text-[#C9A84C] uppercase font-medium mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Coming Soon
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Under <span style={goldText}>Construction</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.9, delay: 0.6 }}
        />

        {/* Description */}
        <motion.p
          className="text-[#F5F0E8]/40 text-base leading-relaxed mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          We are working on something great. This section will be available soon with detailed portfolio content.
        </motion.p>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase group hover:gap-5 transition-all duration-300"
          >
            <span className="h-px w-8 bg-[#C9A84C] group-hover:w-12 transition-all duration-300" />
            Back to Home
          </Link>
        </motion.div>

      </div>

      {/* Bottom gold line */}
      <div className="fixed bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

    </main>
  )
}
