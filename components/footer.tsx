'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
} from 'lucide-react'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Services', href: '/projects' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Showcase', href: '/social-media' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
]

const ImdbIcon = (_props: any) => (
  <img
    src="/logo/Screenshot 2026-03-25 114202.png"
    alt="IMDb"
    width={32}
    height={16}
    style={{ objectFit: 'contain', borderRadius: 2, opacity: 0.7 }}
    className="group-hover:opacity-100 transition-opacity duration-300"
  />
)

const socials = [
  { href: 'https://www.instagram.com/filmindustrymp?igsh=YnJyM2U4NHNrOTB3', Icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/share/1CHzuqUf36/', Icon: Facebook, label: 'Facebook' },
  { href: 'https://youtube.com/@filmindustrymp?si=lNSyA34X9dHteR1N', Icon: Youtube, label: 'YouTube' },
  { href: 'https://www.linkedin.com/in/filmindustry-mp-05506966', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/FilmIndustryMP', Icon: Twitter, label: 'Twitter' },
  { href: 'https://www.imdb.com/name/nm8970775/?ref_=fn_i_1', Icon: ImdbIcon, label: 'IMDb' },
]

const GoldDivider = () => (
  <div className="flex items-center justify-center gap-3 my-8">
    <div className="h-px bg-gradient-to-r from-transparent to-[#c9a84c] w-24" />
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" fill="#c9a84c" />
    </svg>
    <div className="h-px bg-gradient-to-l from-transparent to-[#c9a84c] w-24" />
  </div>
)

export function Footer() {
  return (
    <footer className="bg-[#080808] text-white relative overflow-hidden">

      {/* subtle gold corner ornament top */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, #c9a84c, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, #c9a84c, transparent 70%)' }} />

      {/* top gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">

        {/* CENTER BRAND BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12"
        >
          <img
            src="/new logo/logo11 (1).png"
            alt="Film Industry MP"
            className="h-32 mb-6 opacity-90 w-auto object-contain"
          />
          <p className="text-[#c9a84c] tracking-[0.3em] text-xs uppercase mb-3">
            Madhya Pradesh · The Heart of India
          </p>
          <p className="text-white/40 text-sm max-w-md leading-relaxed">
            Your single-window partner for premium film production across Madhya Pradesh.
          </p>
        </motion.div>

        <GoldDivider />

        {/* THREE COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#c9a84c] tracking-[0.25em] text-xs uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-[#c9a84c] transition-colors duration-300 text-sm"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#c9a84c] transition-all duration-300 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#c9a84c] tracking-[0.25em] text-xs uppercase mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {[
                { Icon: Phone, value: '+91 99771 10001', href: 'tel:+919977110001' },
                { Icon: Mail, value: 'info@filmindustrymp.com', href: 'mailto:info@filmindustrymp.com' },
                { Icon: Mail, value: 'madhyapradeshfilmindustry@gmail.com', href: 'mailto:madhyapradeshfilmindustry@gmail.com' },
                { Icon: MapPin, value: 'Madhya Pradesh, India', href: '#' },
              ].map(({ Icon, value, href }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    className="flex items-start gap-3 text-white/50 hover:text-[#c9a84c] transition-colors duration-300 text-sm group"
                  >
                    <Icon className="w-4 h-4 mt-0.5 shrink-0 text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors" />
                    <span>{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SOCIAL + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#c9a84c] tracking-[0.25em] text-xs uppercase mb-6">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-10">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-9 h-9 border border-white/10 hover:border-[#c9a84c] flex items-center justify-center text-white/40 hover:text-[#c9a84c] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <Link
              href="/apply"
              className="inline-block px-8 py-3 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
            >
              Start Your Project
            </Link>
          </motion.div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25 tracking-wider">
            <p>© 2026 Film Industry MP. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-[#c9a84c] transition-colors uppercase tracking-widest">
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <Link href="#" className="hover:text-[#c9a84c] transition-colors uppercase tracking-widest">
                Terms of Service
              </Link>
              <span className="text-white/10">|</span>
              <Link href="/admin" className="hover:text-[#c9a84c] transition-colors uppercase tracking-widest">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
