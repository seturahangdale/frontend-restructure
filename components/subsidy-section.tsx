'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* ─── Images ─────────────────────────────────────────── */
const all = [
  { src: '/images/gallery-gwalior.jpg',     title: 'Gwalior Fort'    },
  { src: '/images/Khajuraho Temple.jpg',    title: 'Khajuraho'       },
  { src: '/images/gallery-orchha.jpg',      title: 'Orchha'          },
  { src: '/images/gallery-pachmarhi.jpg',   title: 'Pachmarhi'       },
  { src: '/images/gallery-mandu.jpg',       title: 'Mandu'           },
  { src: '/images/sanchi.jpg',              title: 'Sanchi'          },
  { src: '/images/pench.jpg',               title: 'Pench'           },
  { src: '/images/film-production.jpg',     title: 'Film Production' },
  { src: '/images/hero-madhya-pradesh.jpg', title: 'Heart of India'  },
  { src: '/mpprojects.jpg',                 title: 'MP Projects'     },
  { src: '/maheshwarwho.jpg',               title: 'Maheshwar'       },
]

// Build rows — triple for seamless width
const row1 = [...all.slice(0, 6),  ...all.slice(0, 6),  ...all.slice(0, 6)]
const row2 = [...all.slice(4, 11), ...all.slice(4, 11), ...all.slice(4, 11)]
const row3 = [...all.slice(2, 9),  ...all.slice(2, 9),  ...all.slice(2, 9)]

/* ─── Card ───────────────────────────────────────────── */
function Card({ src, title }: { src: string; title: string }) {
  return (
    <div
      className="relative shrink-0 w-52 h-72 overflow-hidden group cursor-pointer"
      style={{ border: '1px solid rgba(201,168,76,0.18)' }}
    >
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        draggable={false}
      />
      {/* bottom label */}
      <div
        className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}
      >
        <span className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase">{title}</span>
      </div>
      {/* gold top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      {/* subtle gold glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(201,168,76,0.12)' }}
      />
    </div>
  )
}

/* ─── 35mm Sprocket Holes row ─────────────────────────── */
function SprocketRow({ count = 18 }: { count?: number }) {
  return (
    <div className="flex items-center gap-[11px] px-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 rounded-[3px]"
          style={{
            width: 14,
            height: 10,
            background: '#080808',
            boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.18)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Single 35mm Film Strip ──────────────────────────── */
function FilmStrip({
  images,
  direction = 1,
  speed = 30,
}: {
  images: typeof all
  direction?: 1 | -1
  speed?: number
}) {
  // Triple for seamless loop
  const frames = [...images, ...images, ...images]
  const startX = direction === 1 ? '0%' : '-33.33%'
  const endX   = direction === 1 ? '-33.33%' : '0%'

  const FRAME_W = 160  // px
  const FRAME_H = 110  // px

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#0e0e0e',
        border: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {/* Top sprocket strip */}
      <div className="py-[5px]" style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
        <SprocketRow count={28} />
      </div>

      {/* Frames */}
      <div className="overflow-hidden py-[3px]">
        <motion.div
          className="flex gap-[3px] shrink-0 will-change-transform"
          animate={{ x: [startX, endX] }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        >
          {frames.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden group cursor-pointer"
              style={{
                width: FRAME_W,
                height: FRAME_H,
                background: '#111',
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                draggable={false}
              />
              {/* Frame # stamp */}
              <div
                className="absolute top-1 left-2 text-[7px] font-mono tabular-nums"
                style={{ color: 'rgba(201,168,76,0.35)' }}
              >
                {String(i % images.length + 1).padStart(3, '0')}
              </div>
              {/* Title on hover */}
              <div
                className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92), transparent)' }}
              >
                <span className="text-[#C9A84C] text-[7px] tracking-[0.3em] uppercase">{img.title}</span>
              </div>
              {/* Gold frame border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.45)' }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom sprocket strip */}
      <div className="py-[5px]" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <SprocketRow count={28} />
      </div>

      {/* Grain overlay — cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  )
}

/* ─── Panel version — designed for 100vh horizontal scroll ── */
export function SubsidySectionPanel() {
  const stripA = [...all]
  const stripB = [...all.slice(4), ...all.slice(0, 4)]
  const stripC = [...all.slice(7), ...all.slice(0, 7)]

  return (
    <section className="relative w-screen h-screen bg-[#080808] flex overflow-hidden">

      {/* ── LEFT: Title block ── */}
      <div className="relative z-10 flex flex-col justify-center px-10 md:px-16 lg:px-20 w-[40%] shrink-0">
        <motion.p
          className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase mb-5 font-medium"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        >
          Showreel
        </motion.p>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
          <span className="text-[#C9A84C] text-sm">✦</span>
        </div>

        <motion.h2
          className="font-display font-bold text-[#F5F0E8] text-4xl md:text-5xl lg:text-6xl leading-tight mb-5"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          Films Across<br />
          <span style={{ color: '#C9A84C' }}>Madhya Pradesh</span>
        </motion.h2>

        <motion.p
          className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-xs mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
        >
          Where stories come to life in the Heart of India
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex gap-8 pt-8 border-t border-white/5"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[{ n: '11+', l: 'Locations' }, { n: '50+', l: 'Films' }, { n: '15+', l: 'Years' }].map(s => (
            <div key={s.l}>
              <p className="font-display text-2xl font-bold text-[#C9A84C]">{s.n}</p>
              <p className="text-white/30 text-[10px] tracking-widest uppercase mt-1">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* 35mm label */}
        <motion.div
          className="mt-10 flex items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="h-px flex-1 max-w-[40px]" style={{ background: 'rgba(201,168,76,0.2)' }} />
          <span className="text-[8px] tracking-[0.4em] uppercase font-mono" style={{ color: 'rgba(201,168,76,0.25)' }}>
            35mm · Cinematic
          </span>
        </motion.div>
      </div>

      {/* ── RIGHT: Film strips ── */}
      <motion.div
        className="flex-1 flex flex-col justify-center gap-[6px] overflow-hidden"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <FilmStrip images={stripA} direction={1}  speed={28} />
        <FilmStrip images={stripB} direction={-1} speed={22} />
        <FilmStrip images={stripC} direction={1}  speed={35} />
      </motion.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 left-[40%] w-10 z-10"
        style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />

      {/* Top/bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)' }} />
    </section>
  )
}

/* ─── Section ────────────────────────────────────────── */
export function SubsidySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  // Smooth spring for the 3D tilt
  const rawRotX  = useTransform(scrollYProgress, [0, 1], [32, 0])
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.78, 1])
  const rotateX  = useSpring(rawRotX,  { stiffness: 60, damping: 18 })
  const scale    = useSpring(rawScale, { stiffness: 60, damping: 18 })

  // Row horizontal parallax on scroll
  const { scrollYProgress: sp2 } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const x1 = useTransform(sp2, [0, 1], ['0%',  '-18%'])
  const x2 = useTransform(sp2, [0, 1], ['-8%', '10%'])
  const x3 = useTransform(sp2, [0, 1], ['0%',  '-14%'])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] py-14 sm:py-16 overflow-hidden"
    >
      {/* Top gold line */}
      <div
        className="h-px w-full mb-12"
        style={{ background: 'linear-gradient(90deg,transparent,#C9A84C55,#C9A84C,#C9A84C55,transparent)' }}
      />

      {/* Header */}
      <div className="text-center mb-10 px-6">
        <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-5 font-medium">Showreel</p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12" style={{ background: 'linear-gradient(to right,transparent,#C9A84C)' }} />
          <span className="text-[#C9A84C]">✦</span>
          <span className="h-px w-12" style={{ background: 'linear-gradient(to left,transparent,#C9A84C)' }} />
        </div>
        <h2 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl md:text-5xl mb-3">
          Films Across Madhya Pradesh
        </h2>
        <p className="text-[#F5F0E8]/40 text-sm max-w-md mx-auto tracking-wide">
          Where stories come to life in the Heart of India
        </p>
      </div>

      {/* ── 3D Grid ── */}
      <div style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}>
        <motion.div
          style={{ rotateX, scale, transformOrigin: '50% 0%' }}
          className="will-change-transform"
        >

          {/* Row 1 — slides left */}
          <motion.div
            style={{ x: x1 }}
            className="flex gap-3 mb-3 will-change-transform"
          >
            {row1.map((img, i) => <Card key={i} {...img} />)}
          </motion.div>

          {/* Row 2 — slides right */}
          <motion.div
            style={{ x: x2 }}
            className="flex gap-3 mb-3 will-change-transform"
          >
            {row2.map((img, i) => <Card key={i} {...img} />)}
          </motion.div>

          {/* Row 3 — slides left */}
          <motion.div
            style={{ x: x3 }}
            className="flex gap-3 will-change-transform"
          >
            {row3.map((img, i) => <Card key={i} {...img} />)}
          </motion.div>

        </motion.div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right,#080808,transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left,#080808,transparent)' }} />

      {/* Bottom gold line */}
      <div
        className="h-px w-full mt-12"
        style={{ background: 'linear-gradient(90deg,transparent,#C9A84C55,#C9A84C,#C9A84C55,transparent)' }}
      />
    </section>
  )
}
