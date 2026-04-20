'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

function PortalLogo({
  href, src, alt, imgClass, delay, floatDelay = 0
}: {
  href: string; src: string; alt: string; imgClass: string; delay: number; floatDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 200, damping: 20 })

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  function handleLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-end gap-4 pb-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link href={href} className="flex flex-col items-center gap-4">
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
          whileHover={{ scale: 1.08 }}
          className="cursor-pointer relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl -z-10"
            animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.6), transparent 70%)' }}
          />
          <Image
            src={src}
            alt={alt}
            width={600}
            height={600}
            className={`object-contain ${imgClass}`}
            style={{ filter: 'drop-shadow(0 4px 16px rgba(201,168,76,0.3)) drop-shadow(0 0 6px rgba(201,168,76,0.2))' }}
          />
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
        >
          <motion.span
            className="text-[#C9A84C]/60 text-[8px] md:text-[9px] tracking-[0.4em] uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
          >
            Click to Enter
          </motion.span>
          <motion.span
            className="text-[#C9A84C]/60 text-xs"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
          >
            →
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function Portal() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden w-full">

      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
      >
        <source src="/loader/filmindustry.mp4#t=0.001" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(5,5,5,0.70)' }} />

      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }} />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-px h-12 md:h-16 bg-linear-to-b from-transparent to-[#C9A84C]/40" />
      <div className="absolute top-4 left-4 md:top-8 md:left-8 h-px w-12 md:w-16 bg-linear-to-r from-[#C9A84C]/40 to-transparent" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-px h-12 md:h-16 bg-linear-to-t from-transparent to-[#C9A84C]/40" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 h-px w-12 md:w-16 bg-linear-to-l from-[#C9A84C]/40 to-transparent" />

      {/* Header */}
      <motion.div
        className="text-center relative z-10 px-6 mb-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <h1 className="font-display font-bold text-[#F5F0E8] text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          Madhya Pradesh
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #F0D87A 40%, #C9A84C 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Film Industry
          </span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2 md:mt-3">
          <div className="h-px w-10 md:w-12 bg-linear-to-r from-transparent to-[#C9A84C]/60" />
          <span className="text-[#C9A84C] text-xs">✦</span>
          <div className="h-px w-10 md:w-12 bg-linear-to-l from-transparent to-[#C9A84C]/60" />
        </div>
      </motion.div>

      {/* Portal Logos */}
      <div className="flex flex-col md:flex-row relative z-10 items-center md:items-end justify-center w-full pb-4 md:pb-8 gap-2 md:gap-0">
        <PortalLogo
          href="/film-industry"
          src="/new logo/logo11 (1).png"
          alt="MP Film Industry"
          imgClass="w-36 sm:w-44 md:w-56 lg:w-64"
          delay={0.5}
          floatDelay={0}
        />
        <PortalLogo
          href="/film-pathshala"
          src="/new logo/PRint pathshala logo (3) (2).png"
          alt="Film Pathshala"
          imgClass="w-56 sm:w-72 md:w-96 lg:w-[460px]"
          delay={0.7}
          floatDelay={0.8}
        />
      </div>

      {/* Footer */}
      <motion.p
        className="text-[7px] md:text-[8px] tracking-[0.4em] text-white/15 uppercase z-10 pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        © 2026 Film Industry MP · All Rights Reserved
      </motion.p>

    </main>
  )
}
