'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const COLS = 20
const ROWS = 12
const MAX_DIAG = COLS + ROWS - 2
const STAGGER = 0.02

export function PageTransition() {
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // skip the very first render (PixelPreloader handles initial load)
    if (prevPath.current === null) {
      prevPath.current = pathname
      return
    }
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    setVisible(true)
    const t = setTimeout(() => setVisible(false), (MAX_DIAG * STAGGER + 0.35) * 1000)
    return () => clearTimeout(t)
  }, [pathname])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9998] overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, idx) => {
          const row = Math.floor(idx / COLS)
          const col = idx % COLS
          const diag = col + row
          const delay = (MAX_DIAG - diag) * STAGGER

          return (
            <motion.div
              key={idx}
              className="bg-[#080808]"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.3, delay, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'top' }}
            />
          )
        })}
      </div>
    </div>
  )
}
