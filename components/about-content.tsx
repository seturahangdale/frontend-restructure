'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'
import { CheckCircle, Target } from 'lucide-react'

export function AboutContent() {
  const solutions = [
    { title: 'Line Producer Assignment', icon: '👥' },
    { title: 'Location Scouting by Script', icon: '🎬' },
    { title: 'Government Coordination', icon: '🏛️' },
    { title: 'Casting & Local Talent', icon: '⭐' },
    { title: 'Vendors & Production Crew', icon: '🔧' },
    { title: 'On-Ground Execution Support', icon: '📋' },
  ]

  const advantages = [
    { title: 'Professional Line Producers', description: 'Experienced crew with deep local knowledge' },
    { title: 'Government Aligned Execution', description: 'Smooth approvals and regulatory compliance' },
    { title: 'Transparent Budgeting', description: 'Clear cost structures and no hidden expenses' },
    { title: 'Verified Vendors & Locations', description: 'Curated partners meeting international standards' },
    { title: 'Cost-effective Execution', description: 'Maximum value with optimized resources' },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-balance">
              Transforming Madhya Pradesh Into a Global Filming Hub
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Our mission is to bridge the trust and execution gap in film production
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                  The Problem
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  Despite Madhya Pradesh's unparalleled locations and rich heritage, many
                  productions never return after their first shoot.
                </p>
                <div className="space-y-4">
                  {[
                    'Unqualified local intermediaries',
                    'Poor understanding of film workflows',
                    'Lack of subsidy & permission knowledge',
                    'Inefficient vendor & location handling',
                  ].map((problem) => (
                    <div key={problem} className="flex items-start gap-3">
                      <span className="text-red-500 font-bold text-xl mt-0.5">✕</span>
                      <p className="text-foreground/70">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-8 md:p-10">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  The Result
                </h3>
                <p className="text-lg text-foreground/70">
                  Delays, cost overruns, loss of trust, and missed repeat opportunities—
                  preventing Madhya Pradesh from becoming a preferred filming destination.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Objective */}
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Our Objective
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                To eliminate the trust and execution gap by building a single-window
                professional ecosystem—similar to a Tourism Board model—that manages
                the entire production lifecycle from script to release.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
              Our Solution
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <ScrollReveal key={solution.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="film-card p-8 text-center"
                >
                  <div className="text-6xl mb-4">{solution.icon}</div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {solution.title}
                  </h3>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
              Why Film Industry MP?
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {advantages.map((advantage, index) => (
              <ScrollReveal key={advantage.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-6 bg-secondary-foreground/10 rounded-lg hover:bg-secondary-foreground/20 transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">
                      {advantage.title}
                    </h3>
                    <p className="opacity-80">{advantage.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center space-y-8">
              <Target className="w-16 h-16 mx-auto text-primary" />
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Our Vision
              </h2>
              <p className="text-2xl text-foreground/70 leading-relaxed">
                To transform Madhya Pradesh into a globally trusted, film-friendly
                production destination for repeated projects across films, OTT, TV,
                and international cinema.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
