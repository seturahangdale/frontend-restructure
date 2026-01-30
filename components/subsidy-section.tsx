'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from './ui/button'
import { ScrollReveal } from './scroll-reveal'

export function SubsidySection() {
  const subsidies = [
    { type: 'Hindi Films', amount: '₹5 Cr', percentage: '35%' },
    { type: 'International Films', amount: '₹10 Cr', percentage: '35%' },
    { type: 'Web Series & OTT', amount: '₹3 Cr', percentage: '30%' },
  ]

  return (
    <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              MP Film Subsidy Scheme
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Maximize your production value with our comprehensive subsidy program
            </p>
          </div>
        </ScrollReveal>

        {/* Subsidy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subsidies.map((subsidy, index) => (
            <ScrollReveal key={subsidy.type} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -8, rotate: 0 }}
                initial={{ rotate: -1 }}
                className="bg-secondary-foreground/10 backdrop-blur border border-secondary-foreground/20 rounded-lg p-8 text-center hover:border-accent/50 transition-colors"
              >
                <h3 className="text-2xl font-display font-bold mb-4">
                  {subsidy.type}
                </h3>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <p className="text-5xl font-display font-bold text-accent">
                    {subsidy.percentage}
                  </p>
                  <p className="text-sm opacity-80">Subsidy</p>
                  <p className="text-2xl font-semibold pt-2">Up to {subsidy.amount}</p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA and Terms */}
        <ScrollReveal>
          <div className="text-center space-y-6">
            <p className="text-lg opacity-90">Terms and conditions apply</p>
            <Link href="/subsidy">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Learn More About Subsidies
                </Button>
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
