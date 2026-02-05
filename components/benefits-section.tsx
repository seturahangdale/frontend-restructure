'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { CheckCircle } from 'lucide-react'

const benefits = [
  {
    title: 'Obtain Ease of Permissions',
    description:
      'Rapid clearances for locations, incentives, subsidies, and government support',
    icon: '✓',
  },
  {
    title: 'Hire Verified Line Producers',
    description:
      'Experienced, trustworthy local crew for seamless filming execution',
    icon: '✓',
  },
  {
    title: 'Access Ideal Locations',
    description:
      'Scenic sites aligned to your script with cost-effective logistics',
    icon: '✓',
  },
  {
    title: 'Local Crew, Artists & Resources',
    description:
      'Well-trained local technicians, artists, junior artists, and production staff — reducing cost and increasing subsidy benefits',

    icon: '✓',
  },
  {
    title: 'Cost-Effective Production Planning',
    description:
      'Smart budgeting, local vendor tie-ups, and subsidy-aligned planning to maximize savings without compromising quality',
    icon: '✓',
  },
  {
    title: 'Experience with Films, OTT & Ad Shoots',
    description:
      'Proven support for feature films, web series, OTT content, TV shows, documentaries, and advertisement films.',
    icon: '✓',
  },
  {
    title: 'Fast Turnaround & Transparent Process',
    description:
      'Clear communication, realistic timelines, and transparent costing — no hidden surprises.',
    icon: '✓',
  },
  {
    title: 'Strong Local Presence in Madhya Pradesh',
    description:
      'Deep understanding of regional culture, locations, and administration ensures smooth on-ground execution.',
    icon: '✓',
  },
  {
    title: 'Creative & Production-Friendly Approach',
    description:
      'We respect the creative vision of filmmakers while managing practical production challenges efficiently.',
    icon: '✓',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-5 md:mb-6 text-foreground px-4">
              Why Choose Film Industry MP?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
              We provide comprehensive solutions for seamless film production in
              Madhya Pradesh
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="film-card p-6 sm:p-7 md:p-8 lg:p-10 h-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6"
                >
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground mb-3 sm:mb-4">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
