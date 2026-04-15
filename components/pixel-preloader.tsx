'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Pixel wipe constants ── */
const COLS = 20
const ROWS = 12
const MAX_DIAG = COLS + ROWS - 2
const STAGGER = 0.022

/* ── Timing (ms) ── */
const VIDEO_HOLD = 5000
const WIPE_DURATION = 1400

type Phase = 'video' | 'out' | 'done'

/* ────────────────────────────────────────────
   MAIN PRELOADER
──────────────────────────────────────────── */
export function PixelPreloader() {
  const [phase, setPhase] = useState<Phase>('video')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), VIDEO_HOLD)
    const t2 = setTimeout(() => setPhase('done'), VIDEO_HOLD + WIPE_DURATION)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none bg-black">

      {/* ── Phase 1: Fullscreen Video ── */}
      <AnimatePresence>
        {phase === 'video' && (
          <motion.div
            key="video"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/loading_h264.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 2: Pixel Wipe Out (reveals website) ── */}
      {phase === 'out' && (
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
                transition={{ duration: 0.32, delay, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'top' }}
              />
            )
          })}
        </div>
      )}

    </div>
  )
}
