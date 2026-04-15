'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiClient } from '@/lib/api-client'
import Link from 'next/link'

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

type GuideMap = Record<string, { filepath: string; buttonLabel: string }>

export function ProjectsContent() {
  const [data, setData] = useState<any>(null)
  const [guides, setGuides] = useState<GuideMap>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiClient.getPromotionData(),
      apiClient.getAllDocuments('guide'),
    ])
      .then(([promoData, { documents }]) => {
        setData(promoData)
        const map: GuideMap = {}
        for (const doc of documents) {
          if (doc.serviceKey && doc.filepath) {
            map[doc.serviceKey] = { filepath: doc.filepath, buttonLabel: doc.buttonLabel }
          }
        }
        setGuides(map)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-10 h-10 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) return null


  return (
    <main className="min-h-screen bg-[#080808] pt-24 pb-32 overflow-hidden">

      {/* Gold top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <span
          className="absolute inset-0 flex items-center justify-center font-display font-bold pointer-events-none select-none"
          style={{
            fontSize: 'clamp(100px, 20vw, 260px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.04)',
            letterSpacing: '-0.03em',
            top: '-5%',
          }}
        >
          SERVICES
        </span>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-12 pb-24 text-center">
          <motion.h1
            className="font-display font-bold text-[#F5F0E8] text-5xl sm:text-6xl lg:text-8xl leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          >
            Our <span style={goldText}>Services</span>
          </motion.h1>

          <motion.p
            className="text-[#F5F0E8]/55 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          >
            {data.hero?.description || 'At Film Industry MP, we take pride in delivering end-to-end film production and promotional solutions across every city in Madhya Pradesh.'}
          </motion.p>



          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase group hover:gap-5 transition-all duration-300"
            >
              Get In Touch
              <span className="h-px w-8 bg-[#C9A84C] group-hover:w-12 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        <div className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C40, #C9A84C, #C9A84C40, transparent)' }} />
      </section>


      {/* ── OUR SERVICES CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            { num: '01', title: 'Film Shooting',         serviceKey: 'film-shooting',         btn: 'Film Shooting Guide',         text: 'We specialize in Film Shooting in Madhya Pradesh, offering complete on-ground support including location coordination, crew management, equipment arrangements, and smooth execution of shoots.' },
            { num: '02', title: 'Film Subsidy',           serviceKey: 'subsidy',               btn: 'Subsidy Related Guide',         text: 'Our team provides expert assistance in Film Subsidy in MP, guiding production houses through government policies, documentation, and compliance to help them maximize financial benefits.' },
            { num: '03', title: 'Theatre Advertisement',  serviceKey: 'theatre-advertisement', btn: 'Theatre Advertisement Guide',   text: 'We offer impactful Theatre Advertisement services, enabling brands and films to reach a wide audience through strategic cinema promotions across multiple cities in MP.' },
            { num: '04', title: 'Celebrity Management',   serviceKey: 'celebrity-management',  btn: 'Celebrity Management Guide',    serviceKey2: 'movie-promotion', btn2: 'Movie Promotion Guide', text: 'We excel in Celebrity Management and Movie Promotions, handling everything from artist coordination to event execution, ensuring successful promotions and strong audience engagement.' },
          ].map((item, i) => {
            const guide  = guides[item.serviceKey]
            const guide2 = item.serviceKey2 ? guides[item.serviceKey2] : undefined
            return (
            <motion.div
              key={i}
              className="group relative p-7 overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.02)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ borderColor: 'rgba(201,168,76,0.3)' }}
            >
              {/* Gold left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Top slide bar */}
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-[#C9A84C]" />

              <div className="flex items-start justify-between mb-4">
                <span className="font-display font-bold text-3xl" style={{ color: 'rgba(201,168,76,0.15)' }}>{item.num}</span>
                <span className="text-[#C9A84C] text-xs">✦</span>
              </div>

              <h3 className="font-display font-bold text-[#F5F0E8] text-xl mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-[#F5F0E8]/50 text-sm leading-relaxed mb-5">{item.text}</p>

              <div className="flex flex-wrap gap-2">
                {guide ? (
                  <a
                    href={guide.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-semibold bg-[#C9A84C] text-black hover:bg-transparent hover:text-[#C9A84C] border border-[#C9A84C] transition-all duration-300"
                  >
                    {item.btn}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-semibold border border-white/10 text-white/25 cursor-not-allowed">
                    {item.btn} — Coming Soon
                  </span>
                )}
                {item.btn2 && (
                  guide2 ? (
                    <a
                      href={guide2.filepath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-semibold border border-white/20 text-white/60 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                    >
                      {item.btn2}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-semibold border border-white/10 text-white/25 cursor-not-allowed">
                      {item.btn2} — Coming Soon
                    </span>
                  )
                )}
              </div>
            </motion.div>
            )
          })}
        </div>

        {/* Closing line */}
        <motion.div
          className="mt-10 p-6"
          style={{ border: '1px solid rgba(201,168,76,0.1)', borderLeft: '3px solid #C9A84C' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#F5F0E8]/55 text-sm leading-relaxed">
            With a commitment to excellence, professionalism, and reliability,{' '}
            <span className="text-[#C9A84C] font-semibold">Film Industry MP</span>{' '}
            stands as one of the most trusted partners for film and media services in Madhya Pradesh — delivering the best services with precision, creativity, and dedication.
          </p>
        </motion.div>

        <div className="h-px mt-12" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
      </div>

      {/* ── WHY PROMOTE IN MP ── */}
      {data.whyPromote?.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-20">
          <FadeIn>
            <p className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase font-medium mb-3">Regional Advantage</p>
            <h2 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl mb-10">
              Why Promote in <span style={goldText}>Madhya Pradesh?</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.whyPromote.map((point: string, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5" style={{ border: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}>
                  <span className="text-[#C9A84C] font-display font-bold text-lg shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[#F5F0E8]/55 text-sm leading-relaxed">{point}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {/* ── PROMOTION SERVICES ── */}
      {data.services?.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-20">
          <FadeIn>
            <p className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase font-medium mb-3">Promotion Offerings</p>
            <h2 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl mb-10">
              Movie <span style={goldText}>Promotion Services</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.services.map((service: any, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-7 h-full" style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.02)' }}>
                  <h3 className="font-display font-bold text-[#F5F0E8] text-lg mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items?.map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-[#F5F0E8]/50 text-sm">
                        <span className="text-[#C9A84C] mt-0.5 shrink-0">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {/* ── CITIES ── */}
      {data.cities?.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-20">
          <FadeIn>
            <p className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase font-medium mb-3">Coverage</p>
            <h2 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl mb-10">
              Cities We <span style={goldText}>Operate In</span>
            </h2>
          </FadeIn>
          <div className="flex flex-wrap gap-3">
            {data.cities.map((city: string, i: number) => (
              <FadeIn key={i} delay={i * 0.05}>
                <span
                  className="px-6 py-3 text-sm font-semibold text-[#F5F0E8]/70 tracking-wider"
                  style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.03)' }}
                >
                  {city}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-24">
        <FadeIn>
          <section className="relative py-16 px-8 text-center overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
            <span
              className="absolute inset-0 flex items-center justify-center font-display font-bold pointer-events-none select-none"
              style={{
                fontSize: 'clamp(60px, 12vw, 150px)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201,168,76,0.04)',
              }}
            >MP</span>

            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase font-medium mb-4">Ready to Promote?</p>
              <h2 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl mb-4 max-w-2xl mx-auto leading-snug">
                Let's Promote Your Next Release in <span style={goldText}>MP</span>
              </h2>
              <p className="text-[#F5F0E8]/35 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
                Whether Bollywood, South Indian, or independent — we provide end-to-end promotional execution across Madhya Pradesh.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#080808] text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#E8C97A] transition-colors duration-300"
              >
                Contact Us
                <span className="text-base">→</span>
              </Link>
            </div>

            <div className="absolute top-4 left-4 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.3)', borderLeft: '1px solid rgba(201,168,76,0.3)' }} />
            <div className="absolute top-4 right-4 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.3)', borderRight: '1px solid rgba(201,168,76,0.3)' }} />
            <div className="absolute bottom-4 left-4 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.3)', borderLeft: '1px solid rgba(201,168,76,0.3)' }} />
            <div className="absolute bottom-4 right-4 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.3)', borderRight: '1px solid rgba(201,168,76,0.3)' }} />
          </section>
        </FadeIn>
      </div>

    </main>
  )
}
