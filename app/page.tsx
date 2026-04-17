'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'


export default function Portal() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">


      {/* ── Background video ── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
      >
        <source src="/loader/filmindustry.mp4#t=0.001" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(5,5,5,0.70)' }} />

      {/* ── Ambient background orbs ── */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }} />

      {/* ── Subtle film grain texture overlay ── */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

      {/* ── Horizontal gold divider lines ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* ── Vertical side accents ── */}
      <div className="absolute top-8 left-8 w-px h-16 bg-linear-to-b from-transparent to-[#C9A84C]/40" />
      <div className="absolute top-8 left-8 h-px w-16 bg-linear-to-r from-[#C9A84C]/40 to-transparent" />
      <div className="absolute bottom-8 right-8 w-px h-16 bg-linear-to-t from-transparent to-[#C9A84C]/40" />
      <div className="absolute bottom-8 right-8 h-px w-16 bg-linear-to-l from-[#C9A84C]/40 to-transparent" />

      {/* ── Header ── */}
      <motion.div
        className="text-center mb-14 relative z-10 px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Main title */}
        <h1 className="font-display font-bold text-[#F5F0E8] text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
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

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-[#C9A84C]/60" />
          <span className="text-[#C9A84C] text-xs">✦</span>
          <div className="h-px w-16 bg-linear-to-l from-transparent to-[#C9A84C]/60" />
        </div>

        <motion.p
          className="text-[#F5F0E8]/30 text-xs tracking-[0.3em] uppercase mt-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        >
          Choose your portal
        </motion.p>
      </motion.div>

      {/* ── Portal Cards ── */}
      <div className="flex flex-col gap-5 relative z-10 px-6 w-full max-w-lg">

        {/* ── Card 1: Film Facilitation ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Link href="/film-industry" className="group flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }}>
              <Image
                src="/new logo/logo11 (1).png"
                alt="MP Film Industry"
                width={200}
                height={200}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.5))' }}
              />
            </motion.div>
          </Link>
        </motion.div>


        {/* ── Card 2: Film Pathshala ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Link href="/film-pathshala" className="group flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }}>
              <Image
                src="/new logo/Film pathshala logo trns.png"
                alt="Film Pathshala"
                width={220}
                height={220}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.5))' }}
              />
            </motion.div>
          </Link>
        </motion.div>

      </div>

      {/* ── Footer note ── */}
      <motion.p
        className="mt-12 text-[8px] tracking-[0.4em] text-white/15 uppercase z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        © 2026 Film Industry MP · All Rights Reserved
      </motion.p>

    </main>
  )
}
