'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function GoldCursor() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return null
  const [visible, setVisible]   = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)  // over a link/button

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Ring follows with spring lag — creates the "trailing ring" effect
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.6 })

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)
    const onDown   = () => setClicking(true)
    const onUp     = () => setClicking(false)

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isInteractive = !!el.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')
      setHovering(isInteractive)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY, visible])

  if (!visible) return null

  return (
    <>
      {/* ── Inner dot — snaps instantly to cursor ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.4 : hovering ? 2.5 : 1,
            opacity: clicking ? 0.6 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: hovering ? 'transparent' : '#C9A84C',
            border: hovering ? '1px solid #C9A84C' : 'none',
          }}
        />
      </motion.div>

      {/* ── Outer ring — springs behind cursor ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.7 : hovering ? 1.6 : 1,
            opacity: clicking ? 0.4 : hovering ? 0.8 : 0.35,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1px solid #C9A84C',
          }}
        />
      </motion.div>
    </>
  )
}
