'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Projects', href: '/projects' },
  { label: 'Subsidy', href: '/subsidy' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
  { label: 'Admin', href: '/admin' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* ✅ LOGO (HOVER SCALE FIXED) */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.25 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Image
                src="/logo.png"
                height={45}
                width={65}
                alt="logo"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className="text-[#6B4F4F] font-bold hover:text-primary transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  className="block px-4 py-2 rounded hover:bg-primary/10 text-foreground"
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
