'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show on portal page, admin, login
  const hidden = pathname === '/' || pathname?.startsWith('/admin') || pathname === '/login' || pathname === '/reset-password'
  if (hidden) return null

  return (
    <motion.button
      onClick={() => router.back()}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="fixed bottom-6 left-6 z-[300] flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold text-[#C9A84C]/70 hover:text-[#C9A84C] border border-[#C9A84C]/25 hover:border-[#C9A84C]/60 transition-all duration-300 group"
      style={{ background: 'rgba(6,6,6,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <motion.span
        className="text-sm"
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        ←
      </motion.span>
      <span>Back</span>
    </motion.button>
  )
}
