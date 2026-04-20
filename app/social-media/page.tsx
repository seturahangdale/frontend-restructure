'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Facebook, Linkedin, Twitter, Globe, Play } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import Link from 'next/link'

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const CATEGORY_META: Record<string, { icon: string; label: string; sub: string }> = {
  information: { icon: '📢', label: 'Information',  sub: 'Updates & awareness content'   },
  location:    { icon: '📍', label: 'Location',     sub: 'MP filming destinations'        },
  event:       { icon: '🎬', label: 'Event',        sub: 'Festivals, shoots & highlights' },
}

const getIcon = (platform: string) => {
  switch (platform) {
    case 'instagram': return Instagram
    case 'facebook':  return Facebook
    case 'youtube':   return Youtube
    case 'linkedin':  return Linkedin
    case 'twitter':   return Twitter
    default:          return Globe
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'instagram': return '#E1306C'
    case 'facebook':  return '#1877F2'
    case 'youtube':   return '#FF0000'
    case 'linkedin':  return '#0A66C2'
    case 'twitter':   return '#ffffff'
    default:          return '#C9A84C'
  }
}

function VideoGrid({ videos }: { videos: any[] }) {
  if (!videos.length) return (
    <p className="text-[#F5F0E8]/20 text-xs py-10 text-center tracking-widest uppercase">
      No videos in this section yet
    </p>
  )
  return (
    <div className={`grid gap-4 ${
      videos.length === 1 ? 'grid-cols-1 max-w-2xl' :
      videos.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {videos.map((video: any, i: number) => (
        <motion.div key={i} className="group relative overflow-hidden"
          style={{ border: '1px solid rgba(201,168,76,0.1)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
          whileHover={{ borderColor: 'rgba(201,168,76,0.3)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
          <div className="aspect-video bg-black">
            <iframe src={video.url} title={video.title || `Video ${i + 1}`}
              allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full" />
          </div>
          {video.title && (
            <div className="px-4 py-2.5" style={{ background: 'rgba(201,168,76,0.04)' }}>
              <p className="text-[#F5F0E8]/50 text-sm tracking-wide truncate">{video.title}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function SocialMediaPage() {
  const [data, setData]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('information')

  useEffect(() => {
    apiClient.getSocialData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-10 h-10 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  )

  const categories: any[] = data.videoCategories || []
  const socialLinks: any[] = data.socialLinks || []
  const activeCategory = categories.find((c: any) => c.id === activeTab)

  return (
    <main className="min-h-screen bg-[#080808] pt-24 pb-32">

      {/* Gold top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── HERO ── */}
        <motion.div className="text-center mb-16 pt-6"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-5">
            Digital Awareness Initiative
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
            <span className="text-[#C9A84C] text-xs">✦</span>
            <span className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
          </div>
          <h1 className="font-display font-bold text-[#F5F0E8] text-4xl sm:text-5xl leading-tight mb-4 max-w-3xl mx-auto">
            Our Digital Awareness &<br />
            <span style={goldText}>Promotion Initiative</span>
          </h1>
          <p className="text-[#F5F0E8]/35 text-sm max-w-xl mx-auto leading-relaxed">
            FilmIndustryMP showcases Madhya Pradesh as a premier filming destination through cinematic video storytelling.
          </p>
        </motion.div>

        {/* ── VIDEO SECTION ── */}
        {categories.length > 0 && (
          <section className="mb-20">
            {/* Category Tabs */}
            <motion.div className="flex gap-0 mb-10 relative"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((cat: any) => {
                const meta = CATEGORY_META[cat.id] || { icon: '▶', label: cat.label, sub: '' }
                const isActive = activeTab === cat.id
                return (
                  <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                    className="flex-1 flex flex-col items-center gap-1 py-5 px-4 relative transition-all duration-300 group"
                  >
                    {isActive && (
                      <motion.div className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: '#C9A84C' }}
                        layoutId="activeTab"
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-[#C9A84C]' : 'text-[#F5F0E8]/30 group-hover:text-[#F5F0E8]/60'
                      }`}>{meta.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 transition-colors duration-300 ${
                        isActive
                          ? 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C]'
                          : 'bg-[rgba(255,255,255,0.04)] text-[#F5F0E8]/20'
                      }`}>{cat.videos.length}</span>
                    </div>
                    <span className="text-[10px] tracking-widest text-[#F5F0E8]/20 uppercase hidden sm:block">
                      {meta.sub}
                    </span>
                  </button>
                )
              })}
            </motion.div>

            {/* Active Category Videos */}
            {activeCategory && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                    <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                  </div>
                  <h2 className="font-display font-bold text-[#F5F0E8] text-xl">
                    {CATEGORY_META[activeCategory.id]?.label || activeCategory.label}
                    <span className="text-[#C9A84C]/40 text-sm font-normal ml-2">
                      ({activeCategory.videos.length} {activeCategory.videos.length === 1 ? 'video' : 'videos'})
                    </span>
                  </h2>
                </div>
                <VideoGrid videos={activeCategory.videos} />
              </motion.div>
            )}
          </section>
        )}

        {/* Gold divider */}
        <div className="h-px mb-16"
          style={{ background: 'linear-gradient(to right, transparent, #C9A84C40, #C9A84C, #C9A84C40, transparent)' }} />

        {/* ── CONNECT WITH US ── */}
        {socialLinks.length > 0 && (
          <section className="mb-16">
            <motion.div className="text-center mb-10"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-2">Follow Us</p>
              <h2 className="font-display font-bold text-[#F5F0E8] text-3xl">
                Connect With <span style={goldText}>Us</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {socialLinks.map((social: any, i: number) => {
                const Icon = getIcon(social.platform)
                const color = getPlatformColor(social.platform)
                return (
                  <motion.a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center py-7 gap-3 relative overflow-hidden transition-all duration-300"
                    style={{ border: '1px solid rgba(201,168,76,0.08)', background: 'rgba(201,168,76,0.02)' }}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ borderColor: color + '40', background: color + '08' }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                      style={{ background: color }} />
                    <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: 'rgba(245,240,232,0.35)' }} />
                    <span className="text-[9px] tracking-[0.3em] text-[#F5F0E8]/25 uppercase font-medium group-hover:text-[#F5F0E8]/60 transition-colors duration-300">
                      {social.name}
                    </span>
                    <span className="text-[8px] tracking-widest uppercase font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1"
                      style={{ color }}>Visit →</span>
                  </motion.a>
                )
              })}
            </div>
          </section>
        )}

        {/* ── OBJECTIVE ── */}
        <motion.section className="text-center py-14 px-8 relative overflow-hidden"
          style={{ border: '1px solid rgba(201,168,76,0.1)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold pointer-events-none select-none"
            style={{ fontSize: 'clamp(80px,15vw,180px)', color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.05)', letterSpacing: '-0.02em' }}>
            MP
          </span>
          <div className="relative z-10">
            <p className="text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">Our Objective</p>
            <h3 className="font-display font-bold text-[#F5F0E8] text-2xl sm:text-3xl mb-5 max-w-2xl mx-auto leading-snug">
              Positioning Madhya Pradesh as a <span style={goldText}>World-Class</span> Filming Destination
            </h3>
            <p className="text-[#F5F0E8]/30 text-sm leading-relaxed max-w-xl mx-auto mb-7">
              FilmIndustryMP acts as a digital-first bridge between Madhya Pradesh and the global film industry.
            </p>
            <Link href="/about"
              className="inline-flex items-center gap-3 text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase group hover:gap-5 transition-all duration-300">
              Learn More
              <span className="h-px w-8 bg-[#C9A84C] group-hover:w-12 transition-all duration-300" />
            </Link>
          </div>
          <div className="absolute top-3 left-3 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.3)', borderLeft: '1px solid rgba(201,168,76,0.3)' }} />
          <div className="absolute top-3 right-3 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.3)', borderRight: '1px solid rgba(201,168,76,0.3)' }} />
          <div className="absolute bottom-3 left-3 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.3)', borderLeft: '1px solid rgba(201,168,76,0.3)' }} />
          <div className="absolute bottom-3 right-3 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.3)', borderRight: '1px solid rgba(201,168,76,0.3)' }} />
        </motion.section>

      </div>
    </main>
  )
}
