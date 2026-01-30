'use client'

import { motion } from 'framer-motion'

interface AdminSidebarProps {
  activeSection: string
  onSelectSection: (section: string) => void
}

const sections = [
  { id: 'logo', label: 'Logo' },
  { id: 'homepage-video', label: 'Homepage Video' },
  { id: 'images', label: 'Images' },
  { id: 'pamphlets', label: 'Pamphlets' },
  { id: 'text-content', label: 'Text Content' },
  { id: 'film-categories', label: 'Film Categories' },
  { id: 'projects', label: 'Projects' },
]

export function AdminSidebar({ activeSection, onSelectSection }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-primary text-white p-8 overflow-y-auto">
      <h2 className="text-2xl font-display font-bold mb-8">Admin Panel</h2>
      
      <nav className="space-y-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === section.id
                ? 'bg-accent text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {section.label}
          </motion.button>
        ))}
      </nav>
    </aside>
  )
}
