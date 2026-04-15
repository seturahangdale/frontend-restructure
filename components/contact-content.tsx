'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Download, X, Clock, MessageSquare } from 'lucide-react'
import { apiClient, ContactData } from "@/lib/api-client"

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(201,168,76,0.03)',
  border: '1px solid rgba(201,168,76,0.15)',
  borderRadius: 0,
  padding: '16px 20px',
  color: '#F5F0E8',
  fontSize: '15px',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.3s',
}

export function ContactContent() {
  const [submitted, setSubmitted]       = useState(false)
  const [showCard, setShowCard]         = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData]         = useState<ContactData>({
    name: '', email: '', phone: '', subject: 'Select Subject', message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await apiClient.submitContact(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: 'Select Subject', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } catch {
      alert("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] pt-24 pb-20 overflow-hidden">

      {/* Gold top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      {/* Ghost background text */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden flex flex-col justify-center" style={{ zIndex: 0 }}>
        <span
          style={{
            fontSize: 'clamp(130px, 24vw, 320px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(201,168,76,0.08)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            paddingLeft: '3vw',
            display: 'block',
          }}
        >
          GET IN
        </span>
        <span
          style={{
            fontSize: 'clamp(130px, 24vw, 320px)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(201,168,76,0.05)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            paddingLeft: '8vw',
            display: 'block',
          }}
        >
          TOUCH
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── PAGE HEADER ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.6em] text-[#C9A84C] uppercase font-medium mb-3">Film Industry MP</p>
          <h1 className="font-display font-bold text-[#F5F0E8] text-6xl sm:text-7xl leading-tight">
            Get in <span style={goldText}>Touch</span>
          </h1>
          <div className="mt-5 h-px w-full" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.4), transparent)' }} />
        </motion.div>

        {/* ── SPLIT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

          {/* ══ LEFT — Info Panel ══ */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-[#F5F0E8]/40 text-base leading-relaxed max-w-sm">
              Let's discuss your film production project. Fill the form or reach us directly — we respond within 24 hours.
            </p>

            {/* Contact info items */}
            {[
              { icon: Phone,   label: 'Phone',  value: '+91 99771 10001',          href: 'tel:+919977110001' },
              { icon: Mail,    label: 'Email',  value: 'info@filmindustrymp.com',   href: 'mailto:info@filmindustrymp.com' },
              { icon: MapPin,  label: 'Office', value: 'Samarth City, Nainod, Indore', href: 'https://maps.app.goo.gl/MuPqtqD2FqUGdKcm9', target: '_blank' },
              { icon: Clock,   label: 'Hours',  value: 'Mon – Sat, 10am – 7pm',    href: null },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={(item as any).target}
                    rel={(item as any).target ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-5 py-4 border-b transition-all duration-300"
                    style={{ borderColor: 'rgba(201,168,76,0.1)' }}
                  >
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center"
                      style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                      <item.icon className="w-4 h-4 text-[#C9A84C]/60 group-hover:text-[#C9A84C] transition-colors" />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.4em] text-[#C9A84C]/50 uppercase font-medium mb-1">{item.label}</p>
                      <p className="text-[#F5F0E8]/65 text-base group-hover:text-[#F5F0E8]/90 transition-colors">{item.value}</p>
                    </div>
                    <span className="ml-auto text-[#C9A84C]/30 group-hover:text-[#C9A84C] transition-all duration-300 group-hover:translate-x-1">→</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center"
                      style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                      <item.icon className="w-4 h-4 text-[#C9A84C]/60" />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.4em] text-[#C9A84C]/50 uppercase font-medium mb-1">{item.label}</p>
                      <p className="text-[#F5F0E8]/65 text-base">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Visiting Card */}
            <motion.div
              className="group flex items-center gap-5 py-4 border-b cursor-pointer transition-all duration-300"
              style={{ borderColor: 'rgba(201,168,76,0.1)' }}
              onClick={() => setShowCard(true)}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              whileHover={{ x: 3 }}
            >
              <div className="w-10 h-10 shrink-0 flex items-center justify-center text-base"
                style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                📇
              </div>
              <div>
                <p className="text-[9px] tracking-[0.4em] text-[#C9A84C]/40 uppercase font-medium mb-0.5">Visiting Card</p>
                <p className="text-[#F5F0E8]/65 text-sm group-hover:text-[#F5F0E8]/90 transition-colors">Click to View & Download</p>
              </div>
              <span className="ml-auto text-[#C9A84C]/30 group-hover:text-[#C9A84C] transition-all duration-300 group-hover:translate-x-1">→</span>
            </motion.div>

            {/* View Pamphlets */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}
            >
              <a
                href="/pamphlets"
                className="group flex items-center gap-5 py-4 border-b transition-all duration-300"
                style={{ borderColor: 'rgba(201,168,76,0.1)' }}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center text-base"
                  style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                  📋
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.4em] text-[#C9A84C]/40 uppercase font-medium mb-0.5">Resources</p>
                  <p className="text-[#F5F0E8]/65 text-sm group-hover:text-[#F5F0E8]/90 transition-colors">View Pamphlets</p>
                </div>
                <span className="ml-auto text-[#C9A84C]/30 group-hover:text-[#C9A84C] transition-all duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            {/* What we can help with */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-4 h-4 text-[#C9A84C]/50" />
                <p className="text-[10px] tracking-[0.4em] text-[#C9A84C]/50 uppercase font-medium">We Can Help With</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Film Production', 'Locations & Permits', 'Subsidy Guidance', 'Line Producer', 'Celebrity Management', 'OTT Content'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-2">
                    <span className="text-[#C9A84C]/40 text-xs">✦</span>
                    <span className="text-[#F5F0E8]/40 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — Form ══ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-8 lg:p-10"
            style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.015)' }}
          >
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' }} />
            <div className="absolute top-3 right-3 w-5 h-5" style={{ borderTop: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />
            <div className="absolute bottom-3 left-3 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)' }} />
            <div className="absolute bottom-3 right-3 w-5 h-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)' }} />

            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm tracking-[0.4em] text-[#C9A84C] uppercase font-medium shrink-0">Send a Message</p>
              <div className="flex-1 h-px" style={{ background: 'rgba(201,168,76,0.15)' }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name" value={formData.name} onChange={handleChange}
                  placeholder="Your Name" required style={inputStyle}
                  className="placeholder:text-[#F5F0E8]/20"
                  onFocus={e => e.target.style.borderColor = '#C9A84C'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                />
                <input
                  name="email" type="email" value={formData.email} onChange={handleChange}
                  placeholder="Email Address" required style={inputStyle}
                  className="placeholder:text-[#F5F0E8]/20"
                  onFocus={e => e.target.style.borderColor = '#C9A84C'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="Phone Number" required style={inputStyle}
                  className="placeholder:text-[#F5F0E8]/20"
                  onFocus={e => e.target.style.borderColor = '#C9A84C'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                />
                <select
                  name="subject" value={formData.subject} onChange={handleChange} required
                  style={{ ...inputStyle, color: formData.subject === 'Select Subject' ? 'rgba(245,240,232,0.2)' : '#F5F0E8' }}
                  onFocus={e => (e.target as HTMLSelectElement).style.borderColor = '#C9A84C'}
                  onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(201,168,76,0.15)'}
                >
                  <option value="Select Subject" disabled>Select Subject</option>
                  <option value="Film Production" style={{ background: '#111', color: '#F5F0E8' }}>Film Production</option>
                  <option value="Web Series" style={{ background: '#111', color: '#F5F0E8' }}>Web Series</option>
                  <option value="OTT Content" style={{ background: '#111', color: '#F5F0E8' }}>OTT Content</option>
                  <option value="Subsidy Inquiry" style={{ background: '#111', color: '#F5F0E8' }}>Subsidy Inquiry</option>
                  <option value="Celebrity Management" style={{ background: '#111', color: '#F5F0E8' }}>Celebrity Management</option>
                  <option value="Locations & Permits" style={{ background: '#111', color: '#F5F0E8' }}>Locations & Permits</option>
                </select>
              </div>

              <textarea
                name="message" value={formData.message} onChange={handleChange}
                rows={6} placeholder="Tell us about your project..." required
                style={{ ...inputStyle, resize: 'none' }}
                className="placeholder:text-[#F5F0E8]/20"
                onFocus={e => e.target.style.borderColor = '#C9A84C'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
              />

              <motion.button
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 text-[#080808] text-xs font-bold tracking-[0.4em] uppercase disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)' }}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="text-center py-3 text-sm font-medium tracking-wide"
                    style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.06)' }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    ✦ Thank you! We'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

        </div>
      </div>

      {/* ── VISITING CARD MODAL ── */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-300 flex items-center justify-center px-4"
            style={{ background: 'rgba(8,8,8,0.93)' }}
            onClick={() => setShowCard(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-md w-full p-6"
              style={{ border: '1px solid rgba(201,168,76,0.25)', background: '#0f0f0f' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: '1px solid #C9A84C', borderLeft: '1px solid #C9A84C' }} />
              <div className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: '1px solid #C9A84C', borderRight: '1px solid #C9A84C' }} />
              <div className="absolute bottom-3 left-3 w-4 h-4" style={{ borderBottom: '1px solid #C9A84C', borderLeft: '1px solid #C9A84C' }} />
              <div className="absolute bottom-3 right-3 w-4 h-4" style={{ borderBottom: '1px solid #C9A84C', borderRight: '1px solid #C9A84C' }} />

              <button onClick={() => setShowCard(false)}
                className="absolute top-4 right-4 text-[#F5F0E8]/30 hover:text-[#C9A84C] transition-colors z-10">
                <X className="w-4 h-4" />
              </button>

              <p className="text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase font-medium mb-5 text-center">Visiting Card</p>
              <img src="/visitingcard/print Visiting Card.jpg" alt="Visiting Card" className="w-full mb-5"
                style={{ border: '1px solid rgba(201,168,76,0.1)' }} />
              <a href="/visitingcard/print Visiting Card.jpg" download
                className="w-full flex items-center justify-center gap-2 py-3 text-[#080808] text-xs font-bold tracking-[0.3em] uppercase"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}>
                <Download className="w-4 h-4" /> Download
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
