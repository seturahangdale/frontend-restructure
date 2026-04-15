'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { apiClient } from "@/lib/api-client"

const goldText = {
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const inputCls = "w-full px-4 py-3 bg-[#0d0d0d] border border-[rgba(201,168,76,0.15)] text-[#F5F0E8] text-sm placeholder:text-[rgba(245,240,232,0.18)] outline-none transition-colors duration-200 focus:border-[#C9A84C] rounded-none"
const labelCls = "block text-xs tracking-[0.35em] text-[#C9A84C]/60 uppercase font-semibold mb-2"
const selectStyle = { background: '#0d0d0d', color: '#F5F0E8', appearance: 'none' as const }

const STEPS = [
  { num: 1, label: 'Your Info',       sub: 'Personal details'     },
  { num: 2, label: 'Project',         sub: 'About your project'   },
  { num: 3, label: 'Overview',        sub: 'Budget & crew'        },
]

export function ApplyContent() {
  const [formStep, setFormStep]         = useState(1)
  const [submitted, setSubmitted]       = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData]         = useState({
    name: '', email: '', phone: '', company: '',
    projectTitle: '', projectType: '', shootLocation: '', shootDate: '',
    budget: '', crewSize: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await apiClient.submitApplication({
        fullName:          formData.name,
        email:             formData.email,
        phone:             formData.phone,
        productionCompany: formData.company,
        projectTitle:      formData.projectTitle,
        projectType:       formData.projectType,
        preferredLocation: formData.shootLocation,
        estimatedBudget:   formData.budget,
        additionalNotes:   `Message: ${formData.message}\nShoot Date: ${formData.shootDate}\nCrew Size: ${formData.crewSize}`,
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormStep(1)
        setFormData({ name:'',email:'',phone:'',company:'',projectTitle:'',projectType:'',shootLocation:'',shootDate:'',budget:'',crewSize:'',message:'' })
      }, 5000)
    } catch {
      alert("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080808]">

      {/* Gold top line */}
      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0 min-h-[calc(100vh-96px)]">

          {/* ══ LEFT SIDEBAR ══ */}
          <motion.div
            className="py-10 lg:py-14 lg:pr-12 flex flex-col gap-10"
            style={{ borderRight: '1px solid rgba(201,168,76,0.08)' }}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            {/* Branding */}
            <div>
              <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase font-medium mb-4">Film Industry MP</p>
              <h1 className="font-display font-bold text-[#F5F0E8] text-3xl sm:text-4xl leading-snug mb-3">
                Apply for<br /><span style={goldText}>Filming in MP</span>
              </h1>
              <div className="h-px w-12 mt-4" style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
              <p className="text-[#F5F0E8]/30 text-sm leading-relaxed mt-4">
                Start your production journey in Madhya Pradesh. Complete the form — takes under 3 minutes.
              </p>
            </div>

            {/* Steps */}
            <div>
              <p className="text-xs tracking-[0.4em] text-[#C9A84C]/35 uppercase font-medium mb-5">Application Steps</p>
              <div className="space-y-1">
                {STEPS.map((step) => {
                  const isActive   = formStep === step.num
                  const isComplete = formStep > step.num
                  return (
                    <div key={step.num}
                      className="flex items-center gap-4 px-4 py-3.5 transition-all duration-300 relative"
                      style={{
                        background: isActive ? 'rgba(201,168,76,0.04)' : 'transparent',
                        borderLeft: isActive ? '2px solid #C9A84C' : '2px solid transparent',
                      }}
                    >
                      <div className="w-7 h-7 shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={{
                          border: `1px solid ${isComplete || isActive ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                          background: isComplete ? '#C9A84C' : 'transparent',
                          color: isComplete ? '#080808' : isActive ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                        }}>
                        {isComplete ? <Check className="w-3.5 h-3.5" /> : step.num}
                      </div>
                      <div>
                        <p className="text-xs font-semibold leading-none mb-1"
                          style={{ color: isActive ? '#F5F0E8' : isComplete ? 'rgba(201,168,76,0.7)' : 'rgba(245,240,232,0.25)' }}>
                          {step.label}
                        </p>
                        <p className="text-[10px] tracking-widest uppercase"
                          style={{ color: isActive ? 'rgba(201,168,76,0.5)' : 'rgba(245,240,232,0.12)' }}>
                          {step.sub}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-5 px-1">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] tracking-widest text-[#F5F0E8]/20 uppercase">Progress</span>
                  <span className="text-[10px] tracking-widest text-[#C9A84C]/50 font-bold">{Math.round((formStep / 3) * 100)}%</span>
                </div>
                <div className="h-px w-full" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <motion.div className="h-full"
                    style={{ background: 'linear-gradient(to right, #C9A84C, #E8C97A)' }}
                    animate={{ width: `${(formStep / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Contact help */}
            <div className="mt-auto pt-6" style={{ borderTop: '1px solid rgba(201,168,76,0.07)' }}>
              <p className="text-xs tracking-[0.4em] text-[#C9A84C]/35 uppercase font-medium mb-3">Need Help?</p>
              <p className="text-[#F5F0E8]/25 text-sm leading-relaxed mb-3">Our team is ready to assist you with your application.</p>
              <a href="mailto:info@filmindustrymp.com" className="block text-sm text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors mb-1">
                info@filmindustrymp.com
              </a>
              <a href="tel:+919977110001" className="block text-sm text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors">
                +91 99771 10001
              </a>
            </div>
          </motion.div>

          {/* ══ RIGHT FORM ══ */}
          <motion.div
            className="py-10 lg:py-14 lg:pl-12"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="h-full flex flex-col">

              <AnimatePresence mode="wait">

                {/* ── STEP 1 ── */}
                {formStep === 1 && (
                  <motion.div key="s1"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }} className="flex-1"
                  >
                    <div className="mb-8">
                      <p className="text-xs tracking-[0.5em] text-[#C9A84C]/40 uppercase font-medium mb-2">Step 01 of 03</p>
                      <h2 className="font-display font-bold text-[#F5F0E8] text-2xl sm:text-3xl">Tell us about yourself</h2>
                      <p className="text-[#F5F0E8]/25 text-sm mt-2">Your contact and company information.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input className={inputCls} type="text" name="name" value={formData.name}
                          onChange={handleChange} placeholder="Your full name" required />
                      </div>
                      <div>
                        <label className={labelCls}>Email Address *</label>
                        <input className={inputCls} type="email" name="email" value={formData.email}
                          onChange={handleChange} placeholder="your@email.com" required />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input className={inputCls} type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                      </div>
                      <div>
                        <label className={labelCls}>Production Company *</label>
                        <input className={inputCls} type="text" name="company" value={formData.company}
                          onChange={handleChange} placeholder="Company name" required />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2 ── */}
                {formStep === 2 && (
                  <motion.div key="s2"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }} className="flex-1"
                  >
                    <div className="mb-8">
                      <p className="text-xs tracking-[0.5em] text-[#C9A84C]/40 uppercase font-medium mb-2">Step 02 of 03</p>
                      <h2 className="font-display font-bold text-[#F5F0E8] text-2xl sm:text-3xl">About your project</h2>
                      <p className="text-[#F5F0E8]/25 text-sm mt-2">Tell us what you're shooting and where.</p>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className={labelCls}>Project Title *</label>
                        <input className={inputCls} type="text" name="projectTitle" value={formData.projectTitle}
                          onChange={handleChange} placeholder="Working title of your project" required />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>Project Type *</label>
                          <select className={inputCls} name="projectType" value={formData.projectType}
                            onChange={handleChange} required style={selectStyle}>
                            <option value="">Select type</option>
                            <option>Hindi Film</option>
                            <option>International Film</option>
                            <option>Web Series</option>
                            <option>Documentary</option>
                            <option>TV Commercial</option>
                            <option>Music Video</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Preferred Location *</label>
                          <select className={inputCls} name="shootLocation" value={formData.shootLocation}
                            onChange={handleChange} required style={selectStyle}>
                            <option value="">Select location</option>
                            <option>Khajuraho</option>
                            <option>Orchha</option>
                            <option>Pachmarhi</option>
                            <option>Gwalior Fort</option>
                            <option>Sanchi</option>
                            <option>Mandu</option>
                            <option>Bhopal</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Intended Shoot Date *</label>
                        <input className={inputCls} type="month" name="shootDate" value={formData.shootDate}
                          onChange={handleChange} required style={{ colorScheme: 'dark' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3 ── */}
                {formStep === 3 && (
                  <motion.div key="s3"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }} className="flex-1"
                  >
                    <div className="mb-8">
                      <p className="text-xs tracking-[0.5em] text-[#C9A84C]/40 uppercase font-medium mb-2">Step 03 of 03</p>
                      <h2 className="font-display font-bold text-[#F5F0E8] text-2xl sm:text-3xl">Budget & overview</h2>
                      <p className="text-[#F5F0E8]/25 text-sm mt-2">Final details before we review your application.</p>
                    </div>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>Estimated Budget *</label>
                          <select className={inputCls} name="budget" value={formData.budget}
                            onChange={handleChange} required style={selectStyle}>
                            <option value="">Select budget</option>
                            <option>Below ₹1 Crore</option>
                            <option>₹1-5 Crore</option>
                            <option>₹5-10 Crore</option>
                            <option>₹10-25 Crore</option>
                            <option>₹25-50 Crore</option>
                            <option>Above ₹50 Crore</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Estimated Crew Size *</label>
                          <select className={inputCls} name="crewSize" value={formData.crewSize}
                            onChange={handleChange} required style={selectStyle}>
                            <option value="">Select size</option>
                            <option>10-30 people</option>
                            <option>30-50 people</option>
                            <option>50-100 people</option>
                            <option>100-200 people</option>
                            <option>200+ people</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Additional Notes</label>
                        <textarea className={inputCls} name="message" value={formData.message}
                          onChange={handleChange} rows={6}
                          placeholder="Tell us more about your project, special requirements, or any questions..." />
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Success */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="mt-6 p-5 flex items-start gap-4"
                    style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.04)' }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#C9A84C] font-semibold text-sm mb-1">Application Submitted</p>
                      <p className="text-[#F5F0E8]/40 text-xs leading-relaxed">
                        Thank you. Our team will review your application and be in touch within 24–48 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav */}
              <div className="flex items-center justify-between mt-10 pt-6"
                style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                {formStep > 1 ? (
                  <motion.button type="button" onClick={() => setFormStep(s => s - 1)}
                    className="flex items-center gap-2 text-[#C9A84C]/50 hover:text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </motion.button>
                ) : <div />}

                {formStep < 3 ? (
                  <motion.button type="button" onClick={() => setFormStep(s => s + 1)}
                    className="flex items-center gap-3 px-9 py-3.5 text-[#080808] text-xs font-bold tracking-[0.3em] uppercase"
                    style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}
                    whileHover={{ opacity: 0.88 }} whileTap={{ scale: 0.98 }}
                  >
                    Continue <ChevronRight className="w-3.5 h-3.5" />
                  </motion.button>
                ) : (
                  <motion.button type="submit" disabled={submitted || isSubmitting}
                    className="flex items-center gap-3 px-9 py-3.5 text-[#080808] text-[10px] font-bold tracking-[0.35em] uppercase disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}
                    whileHover={{ opacity: isSubmitting ? 1 : 0.88 }} whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting
                      ? <><div className="w-3.5 h-3.5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" /> Submitting</>
                      : <><Send className="w-3.5 h-3.5" /> Submit Application</>
                    }
                  </motion.button>
                )}
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
