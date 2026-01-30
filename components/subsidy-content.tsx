'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'

export function SubsidyContent() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-balance">
              MP Film Subsidy Scheme
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Up to 35% subsidies to maximize your production value
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Film Subsidy Scheme
            </h2>
            <p className="text-xl text-foreground/70 mb-12">
              Madhya Pradesh offers comprehensive support for film productions with subsidies up to 35%
            </p>
            <p className="text-lg font-semibold text-primary mb-8">
              Conditions Apply
            </p>
            <p className="text-foreground/70">
              For detailed information about eligibility criteria, application process, and subsidy amounts, please contact our team or visit our office.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
