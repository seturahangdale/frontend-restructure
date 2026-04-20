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

          <motion.div
            className="max-w-3xl mx-auto mb-10 space-y-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          >
            {(data.hero?.description || 'At Film Industry MP, we take pride in delivering end-to-end film production and promotional solutions across every city in Madhya Pradesh.').split('\n\n').map((para: string, i: number) => (
              <p key={i} className="text-[#F5F0E8]/55 text-base sm:text-lg leading-relaxed">{para}</p>
            ))}
          </motion.div>



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
            { num: '01', title: 'Film Shooting',         serviceKey: 'film-shooting',         btn: 'Film Shooting Guide',         text: 'We facilitate film shooting across Madhya Pradesh through our city-wise network of coordinators and production teams, ensuring smooth on-ground execution including location coordination, crew arrangement, and logistical support.' },
            { num: '02', title: 'Film Subsidy',           serviceKey: 'subsidy',               btn: 'Subsidy Related Guide',         text: 'We assist filmmakers by connecting them with experienced local experts and consultants who guide production houses through subsidy policies, documentation, and compliance processes in Madhya Pradesh.' },
            { num: '03', title: 'Theatre Advertisement',  serviceKey: 'theatre-advertisement', btn: 'Theatre Advertisement Guide',   text: 'We enable impactful theatre advertising through our multi-city network, helping films and brands reach wider audiences via coordinated cinema promotions across districts.' },
            { num: '04', title: 'Celebrity Management',   serviceKey: 'celebrity-management',  btn: 'Celebrity Management Guide',    text: 'We coordinate celebrity management and movie promotions through regional partners and city-level teams, ensuring smooth artist coordination, event execution, and audience engagement.' },
            { num: '05', title: 'Movie Promotion',        serviceKey: 'movie-promotion',       btn: 'Movie Promotion Guide',         text: 'Explore how our network-driven approach enables effective movie promotions across multiple districts.\nConnect with local coordinators and execute campaigns seamlessly.\nAchieve wider audience reach with optimized regional strategies.' },
            { num: '06', title: 'Film Pathshala',         serviceKey: 'film-pathshala',        btn: 'Visit Film Pathshala',          text: 'Film Pathshala is designed to guide aspiring talents with real industry insights and practical learning.\nWe connect creativity with on-ground exposure through experienced mentors and local networks.\nFrom learning to execution, we help you take your first step into the film industry with confidence.' },
          ].map((item, i) => {
            const guide  = guides[item.serviceKey]
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

              <div className="text-[#F5F0E8]/50 text-sm leading-relaxed mb-5 space-y-1">
                {item.text.split('\n').map((line: string, li: number) => <p key={li}>{line}</p>)}
              </div>

              <div className="flex flex-wrap gap-2">
                {item.serviceKey === 'film-pathshala' ? (
                  <Link
                    href="/film-pathshala"
                    className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-semibold bg-[#C9A84C] text-black hover:bg-transparent hover:text-[#C9A84C] border border-[#C9A84C] transition-all duration-300"
                  >
                    {item.btn}
                  </Link>
                ) : guide ? (
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

      {/* ── PRESENCE ── */}
      {(() => {
        const districts = [
          'Agar Malwa','Alirajpur','Anuppur','Ashoknagar','Balaghat','Barwani','Betul','Bhind',
          'Bhopal','Burhanpur','Chhatarpur','Chhindwara','Damoh','Datia','Dewas','Dhar','Dindori',
          'Guna','Gwalior','Harda','Narmadapuram (Hoshangabad)','Indore','Jabalpur','Jhabua',
          'Katni','Khandwa (East Nimar)','Khargone (West Nimar)','Mandla','Mandsaur','Morena',
          'Narsinghpur','Neemuch','Niwari','Mauganj','Panna','Raisen','Rajgarh','Ratlam','Rewa',
          'Sagar','Satna','Sehore','Seoni','Shahdol','Shajapur','Sheopur','Shivpuri','Sidhi',
          'Singrauli','Tikamgarh','Ujjain','Umaria','Vidisha','Bhopal Rural','Chachaura',
        ]
        return (
          <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-20">
            <FadeIn>
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">Coverage</p>
              <h2 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl mb-4">
                Our Presence Across <span style={goldText}>Madhya Pradesh</span>
              </h2>
              <p className="text-[#F5F0E8]/50 text-base leading-relaxed mb-3 max-w-2xl">
                Film Industry MP has a growing network of coordinators and production partners across all major districts of Madhya Pradesh.
              </p>
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-8">
                ✦ Complete District Coverage
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {districts.map((d, i) => (
                <FadeIn key={i} delay={Math.min(i * 0.02, 0.5)}>
                  <div
                    className="flex items-center gap-2 px-4 py-3 group hover:border-[#C9A84C]/50 transition-all duration-300"
                    style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.02)' }}
                  >
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'rgba(201,168,76,0.4)' }} />
                    <span className="text-sm text-[#F5F0E8]/65 group-hover:text-[#C9A84C] transition-colors duration-300 leading-tight">
                      {d}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <p className="mt-8 text-[#F5F0E8]/25 text-xs tracking-widest uppercase">{districts.length} Districts · All of Madhya Pradesh</p>
            </FadeIn>
          </div>
        )
      })()}

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
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-4">Ready to Promote?</p>
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
