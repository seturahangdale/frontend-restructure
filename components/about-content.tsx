'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-12">
      <div className="h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40 w-24" />
      <span className="text-[#C9A84C]/60 text-sm">✦</span>
      <div className="h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40 w-24" />
    </div>
  )
}

function BulletItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="flex items-start gap-4 py-3 border-b border-white/5">
        <span className="text-[#C9A84C] mt-1 shrink-0 text-sm">✦</span>
        <p className="text-[#F5F0E8]/65 text-base leading-relaxed">{text}</p>
      </div>
    </FadeIn>
  )
}

export function AboutContent() {
  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-hidden">

      {/* Gold top border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-20">

        {/* Ghost text bg — slow drift */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <span className="font-display font-bold text-white/[0.02]" style={{ fontSize: 'clamp(80px, 18vw, 220px)', whiteSpace: 'nowrap' }}>
            FOUNDER
          </span>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Photo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Photo area with clip reveal */}
              <motion.div
                className="relative w-full max-w-lg mx-auto lg:mx-0 overflow-hidden"
                style={{ aspectRatio: '3/4' }}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.img
                  src="/founder image/Naveen sir.png"
                  alt="Naveen Jain"
                  className="w-full h-full object-cover object-top"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
                />

              </motion.div>

              {/* Name card */}
              <motion.div
                className="max-w-sm mx-auto lg:mx-0 mt-6 px-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <p className="text-[#C9A84C] font-display font-bold text-2xl">Naveen Jain</p>
                <p className="text-white/40 text-sm tracking-widest uppercase mt-1">Founder, Film Industry MP</p>
                <motion.div
                  className="h-px bg-[#C9A84C] mt-4"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.7, delay: 1.3 }}
                />
                <a
                  href="https://www.imdb.com/name/nm8970775/?ref_=fn_i_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 group"
                  title="View on IMDb"
                >
                  <img
                    src="/logo/Screenshot 2026-03-25 114202.png"
                    alt="IMDb"
                    className="h-5 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-[#C9A84C] transition-colors duration-300">View Profile</span>
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT — Intro */}
            <div>
              <motion.p
                className="text-[10px] tracking-[0.55em] text-[#C9A84C] uppercase font-medium mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The Visionary Behind
              </motion.p>

              <motion.h1
                className="font-display font-bold leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Meet the <span style={goldText}>Founder</span>
              </motion.h1>

              <motion.div
                className="h-px bg-[#C9A84C]/50 mb-8"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              />

              <motion.p
                className="text-[#F5F0E8]/65 text-lg leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                Naveen Jain is the Founder of Film Industry MP, a dedicated film facilitation network platform focused on simplifying film production across Madhya Pradesh.
              </motion.p>
              <motion.p
                className="text-[#F5F0E8]/55 text-base leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
              >
                With over <span className="text-[#C9A84C] font-semibold">15 years of experience</span> in the film industry ecosystem, he has developed a deep understanding of on-ground challenges, regional dynamics, and the critical importance of the right local connections in executing successful film projects.
              </motion.p>
              <motion.p
                className="text-[#F5F0E8]/55 text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Rather than operating as a traditional production service provider, Naveen Jain has positioned himself as a <span className="text-[#F5F0E8] font-semibold">Film Facilitator for national and international markets</span> — someone who ensures that every production is supported by the right people, in the right location, at the right time.
              </motion.p>
            </div>

          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── NETWORK & EXPERTISE ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <FadeIn>
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-4">His Network</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
                Building the Right<br /><span style={goldText}>Connections</span>
              </h2>
              <p className="text-[#F5F0E8]/55 text-base leading-relaxed mb-10">
                Through Film Industry MP, he actively builds and manages a strong network of city-wise verified professionals, enabling production houses to access trusted local expertise for:
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                {[
                  { num: '15+', label: 'Years\nExperience' },
                  { num: '50+', label: 'Cities\nCovered' },
                  { num: '100+', label: 'Productions\nFacilitated' },
                ].map((stat, i) => (
                  <FadeIn key={i} delay={0.15 + i * 0.1}>
                    <div className="flex flex-col items-center justify-center py-7 px-4 text-center" style={{ background: 'rgba(201,168,76,0.02)' }}>
                      <span className="font-display font-bold text-3xl md:text-4xl" style={goldText}>{stat.num}</span>
                      <span className="text-[#F5F0E8]/30 text-[10px] tracking-widest uppercase mt-2 leading-relaxed whitespace-pre-line">{stat.label}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-2 lg:mt-14">
                <BulletItem text="Location Scouting" delay={0.1} />
                <BulletItem text="Line Production Support" delay={0.15} />
                <BulletItem text="Government Permissions" delay={0.2} />
                <BulletItem text="Celebrity Management & Promotions" delay={0.25} />
                <BulletItem text="On-ground Execution via Local Experts" delay={0.3} />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── LOCATION VIDEO APPROACH ── */}
      <section className="relative py-12 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', transform: 'translateY(-50%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-8">
            <FadeIn>
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">Key Differentiator</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5">
                Visual Intelligence for<br /><span style={goldText}>Filmmakers</span>
              </h2>
              <p className="text-[#F5F0E8]/55 text-base leading-relaxed max-w-xl mb-3">
                A key differentiator in his approach is his focus on <span className="text-[#F5F0E8] font-semibold">visual and practical guidance</span> for filmmakers.
              </p>
              <p className="text-[#F5F0E8]/45 text-sm leading-relaxed max-w-xl">
                He creates detailed location-based videos for cities and shooting spots across MP — providing complete insights for production houses to pre-visualize and plan shoots remotely.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-[#F5F0E8]/45 text-sm leading-relaxed" style={{ borderLeft: '2px solid rgba(201,168,76,0.3)', paddingLeft: '1.5rem' }}>
                These videos are published on the website and across social media platforms, helping production houses pre-visualize locations, plan shoots effectively, and make informed decisions remotely.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { num: '01', text: 'Detailed overview of the location' },
              { num: '02', text: 'Permission process and practical guidelines' },
              { num: '03', text: 'Possible challenges during shoot and how to manage them' },
              { num: '04', text: 'Advantages and unique features of the location' },
              { num: '05', text: 'Creative possibilities — how different scenes can be executed' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="group p-5 h-full transition-all duration-300"
                  style={{ border: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}
                >
                  <span className="block font-display font-bold text-2xl mb-2" style={{ color: 'rgba(201,168,76,0.15)' }}>{item.num}</span>
                  <p className="text-[#F5F0E8]/60 text-xs leading-relaxed">{item.text}</p>
                  <div className="h-px w-0 group-hover:w-full mt-3 transition-all duration-500" style={{ background: '#C9A84C' }} />
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      <GoldDivider />

      {/* ── VISION ── */}
      <section className="relative py-20 overflow-hidden">
        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Label + heading */}
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-4">Our Vision</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight max-w-3xl mx-auto">
                To build a connected film ecosystem across{' '}
                <span style={goldText}>Madhya Pradesh</span>
              </h2>
            </div>
          </FadeIn>

          {/* Vision pillars */}
          <FadeIn delay={0.15}>
            <div className="max-w-2xl mx-auto mb-16">
              <p className="text-[#F5F0E8]/50 text-base mb-8 text-center">by:</p>
              <div className="space-y-4">
                {[
                  'Empowering local talent and coordinators',
                  'Making film production accessible across districts',
                  'Promoting MP as a leading film destination',
                  'Creating opportunities in regional filmmaking',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <span className="shrink-0 font-display font-bold text-sm tabular-nums" style={{ color: 'rgba(201,168,76,0.4)' }}>0{i + 1}</span>
                    <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.12)' }} />
                    <p className="text-[#F5F0E8]/70 text-base group-hover:text-[#F5F0E8] transition-colors duration-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Quote */}
          <FadeIn delay={0.4}>
            <div className="relative overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
              {/* gold left bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
              {/* large ghost quote mark */}
              <span className="absolute right-8 top-2 font-display font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: 'clamp(100px,15vw,180px)', color: 'rgba(201,168,76,0.04)' }}>"</span>

              <div className="relative z-10 px-12 py-10 md:flex md:items-center md:gap-12">
                <div className="shrink-0 mb-6 md:mb-0">
                  <div className="w-16 h-16 overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                    <img src="/founder image/Naveen sir.png" alt="Naveen Jain" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-[#C9A84C] font-semibold text-sm mt-3">Naveen Jain</p>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase">Founder</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl md:text-2xl text-[#F5F0E8]/90 leading-snug">
                    "I don't just facilitate projects — I help filmmakers visualize, plan, and execute with the right people, the right locations and the right time."
                  </p>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-6 h-6" style={{ borderTop: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />
              <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />
            </div>
          </FadeIn>

        </div>
      </section>

      <GoldDivider />

      {/* ── MISSION & VISION ── */}
      <section className="relative py-20 overflow-hidden">
        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>

            {/* Mission */}
            <FadeIn>
              <div className="relative p-10 h-full overflow-hidden group" style={{ background: 'rgba(201,168,76,0.015)' }}>
                <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
                {/* ghost word */}
                <span className="absolute bottom-4 right-4 font-display font-bold select-none pointer-events-none leading-none"
                  style={{ fontSize: 'clamp(60px,8vw,100px)', color: 'rgba(201,168,76,0.04)' }}>MISSION</span>

                <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-5">Our Mission</p>
                <p className="text-[#F5F0E8]/50 text-base leading-relaxed mb-5">
                  Our mission is to build a strong, reliable, and scalable film facilitation network across Madhya Pradesh by connecting filmmakers with the right local coordinators and production experts in every district.
                </p>
                <p className="text-[#F5F0E8]/50 text-base leading-relaxed">
                  We aim to simplify the filmmaking process through efficient coordination, local expertise, and structured execution, ensuring that every project is supported seamlessly from planning to completion.
                </p>
              </div>
            </FadeIn>

            {/* Vision */}
            <FadeIn delay={0.15}>
              <div className="relative p-10 h-full overflow-hidden group" style={{ background: 'rgba(201,168,76,0.025)' }}>
                <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
                {/* ghost word */}
                <span className="absolute bottom-4 right-4 font-display font-bold select-none pointer-events-none leading-none"
                  style={{ fontSize: 'clamp(60px,8vw,100px)', color: 'rgba(201,168,76,0.06)' }}>VISION</span>

                <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-5">Our Long-Term Vision</p>
                <p className="text-[#F5F0E8]/50 text-base leading-relaxed mb-4">
                  Our long-term vision is to transform Madhya Pradesh into a leading film production hub in India, powered by a strong and well-connected network of local coordinators, production teams, and creative professionals across every district.
                </p>
                <p className="text-[#F5F0E8]/50 text-base leading-relaxed mb-4">
                  We aim to build a self-sustaining film ecosystem where filmmakers from across the country and globally can seamlessly access locations, talent, and production support through a single, reliable platform.
                </p>
                <p className="text-[#F5F0E8]/50 text-base leading-relaxed">
                  By strengthening local networks and enabling consistent opportunities, we envision creating a system where every district contributes to the growth of the film industry, making Madhya Pradesh a preferred destination for films, web series, advertisements, and digital content production.
                </p>
              </div>
            </FadeIn>

          </div>

        </div>
      </section>

      {/* Bottom gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

    </main>
  )
}
