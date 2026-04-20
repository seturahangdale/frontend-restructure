'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 80)
    }
    // Small delay so it doesn't flash on page load
    const t = setTimeout(() => {
      setVisible(window.scrollY < 80)
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 1200)

    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-1 pointer-events-none"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.6 }}
        >
          {/* Thin vertical line */}
          <motion.div
            className="w-px bg-[#C9A84C]/30"
            animate={{ height: [16, 28, 16] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Chevron */}
          <motion.svg
            width="10" height="6" viewBox="0 0 10 6" fill="none"
            animate={{ y: [0, 3, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M1 1L5 5L9 1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
