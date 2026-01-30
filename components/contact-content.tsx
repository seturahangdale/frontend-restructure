'use client'

import React from "react"

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 99771 10001',
      href: 'tel:+919977110001',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@filmindustrymp.com',
      href: 'mailto:info@filmindustrymp.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Madhya Pradesh, India',
      href: '#',
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-balance">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Let's discuss your film production project
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={info.label} delay={index * 0.15}>
                <motion.a
                  href={info.href}
                  whileHover={{ y: -8 }}
                  className="film-card p-8 text-center hover:border-accent transition-colors block"
                >
                  <info.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {info.label}
                  </h3>
                  <p className="text-foreground/70 hover:text-accent transition-colors">
                    {info.value}
                  </p>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
              Send us a Message
            </h2>
            <p className="text-center text-lg opacity-90 mb-12">
              Fill out the form below and our team will get back to you shortly
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-6 py-4 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:border-accent focus:bg-secondary-foreground/20 transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-6 py-4 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:border-accent focus:bg-secondary-foreground/20 transition-all"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-6 py-4 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:border-accent focus:bg-secondary-foreground/20 transition-all"
                  />
                </motion.div>

                {/* Subject */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:border-accent focus:bg-secondary-foreground/20 transition-all appearance-none"
                  >
                    <option value="">Select Subject</option>
                    <option value="Film Production">Film Production</option>
                    <option value="Web Series">Web Series</option>
                    <option value="OTT Content">OTT Content</option>
                    <option value="Location Scout">Location Scout</option>
                    <option value="Subsidy Inquiry">Subsidy Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:border-accent focus:bg-secondary-foreground/20 transition-all resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-secondary-foreground flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </motion.div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/20 border border-accent rounded-lg text-accent text-center font-semibold"
                >
                  Thank you! We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
              Visit Us
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-lg overflow-hidden h-96 border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5819904331157!2d74.6349!3d23.1815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396e9c4e8c3c3c3d%3A0x1234567890abcdef!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
