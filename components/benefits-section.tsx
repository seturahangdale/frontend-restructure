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
]

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Why Choose Film Industry MP?
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              We provide comprehensive solutions for seamless film production in
              Madhya Pradesh
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                className="film-card p-8 md:p-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-8 h-8 text-accent" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
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
