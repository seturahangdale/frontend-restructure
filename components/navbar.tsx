'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Gallery',      href: '/gallery' },
  { label: 'Services',     href: '/projects' },
  { label: 'Portfolio',    href: '/portfolio' },
  { label: 'Showcase',     href: '/social-media' },
  { label: 'Apply',        href: '/apply' },
  { label: 'Contact',      href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* ── FIXED LOGO — always visible ── */}
      <div className="fixed top-0 left-0 z-[200] p-5 md:p-7">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <img
            src="/new logo/logo11 (1).png"
            alt="Film Industry MP"
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>

      {/* ── HAMBURGER BUTTON — always visible top-right ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="fixed top-0 right-0 z-[201] p-5 md:p-7 flex flex-col items-end gap-[6px] group"
      >
        {/* Three lines → animate to X */}
        <motion.span
          animate={isOpen ? { rotate: 45, y: 9, width: 28 } : { rotate: 0, y: 0, width: 28 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block h-[1.5px] bg-[#C9A84C] origin-center"
          style={{ width: 28 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="block h-[1.5px] bg-[#C9A84C]/60"
          style={{ width: 20 }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -9, width: 28 } : { rotate: 0, y: 0, width: 16 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block h-[1.5px] bg-[#C9A84C] origin-center"
          style={{ width: 16 }}
        />
      </button>

      {/* ── FULLSCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Black background wipe */}
            <motion.div
              key="overlay-bg"
              className="fixed inset-0 z-[198] bg-[#080808]"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(100% 0 0% 0)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Gold top border */}
            <motion.div
              key="overlay-border"
              className="fixed top-0 left-0 right-0 z-[199] h-px"
              style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Content */}
            <motion.div
              key="overlay-content"
              className="fixed inset-0 z-[199] flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {/* Left — Nav Links */}
              <div className="flex-1 flex flex-col justify-center px-10 md:px-20 lg:px-32 py-20">

                {/* Nav items */}
                <nav>
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + i * 0.05,
                        duration: 0.45,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-5 py-2.5 border-b border-white/5 hover:border-[#C9A84C]/25 transition-colors duration-300"
                      >
                        <span className="text-[10px] text-[#C9A84C]/35 font-medium tabular-nums w-5 shrink-0 group-hover:text-[#C9A84C]/70 transition-colors duration-300">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-[clamp(22px,3.5vw,42px)] font-bold text-white/75 group-hover:text-white transition-colors duration-300 leading-none">
                          {item.label}
                        </span>
                        <span className="ml-auto text-[#C9A84C]/0 group-hover:text-[#C9A84C] transition-all duration-300 group-hover:translate-x-1.5 text-lg">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

              </div>

              {/* Right — Info Panel (desktop only) */}
              <motion.div
                className="hidden lg:flex w-80 xl:w-96 flex-col justify-between p-16 border-l border-white/[0.05]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >

                {/* Founder Card */}
                <Link href="/about" onClick={() => setIsOpen(false)} className="group block mt-16">
                  <p className="text-[10px] tracking-[0.5em] text-[#C9A84C]/40 uppercase mb-6">The Founder</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 shrink-0 overflow-hidden"
                      style={{ border: '1px solid rgba(201,168,76,0.25)' }}
                    >
                      <img src="/founder image/Naveen sir.png" alt="Naveen Jain" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white/80 text-base group-hover:text-white transition-colors duration-300">Naveen Jain</p>
                      <p className="text-[#C9A84C]/50 text-[10px] tracking-widest uppercase mt-0.5">Founder, Film Industry MP</p>
                    </div>
                  </div>
                  <p className="text-white/25 text-xs leading-relaxed mb-4">
                    15+ years facilitating film productions across Madhya Pradesh — connecting filmmakers with the right people, locations & resources.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C9A84C]/50 group-hover:text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase transition-colors duration-300">
                    View Profile
                    <span className="h-px w-5 bg-current transition-all duration-300 group-hover:w-8" />
                  </span>
                </Link>

                <div>
                {/* Label */}
                <p className="text-[10px] tracking-[0.5em] text-[#C9A84C]/40 uppercase mb-6">
                  Contact
                </p>

                <div className="space-y-3 mb-10">
                  <a
                    href="tel:+919977110001"
                    className="block text-white/50 hover:text-[#C9A84C] text-sm transition-colors duration-300"
                  >
                    +91 99771 10001
                  </a>
                  <a
                    href="mailto:info@filmindustrymp.com"
                    className="block text-white/50 hover:text-[#C9A84C] text-sm transition-colors duration-300"
                  >
                    info@filmindustrymp.com
                  </a>
                  <p className="text-white/30 text-sm">Madhya Pradesh, India</p>
                </div>

                {/* Gold divider */}
                <div className="h-px w-12 bg-[#C9A84C]/30 mb-8" />

                {/* Tagline */}
                <p className="text-white/20 text-xs tracking-widest uppercase leading-relaxed">
                  The Heart of India<br />On Screen
                </p>
                </div>
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
