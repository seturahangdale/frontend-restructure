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
    { title: 'Single-Window Professional Facilitation', description: 'One centralized platform for permissions, subsidies, locations, and execution — eliminating confusion, delays, and dependency on multiple intermediaries.' },
    { title: 'Verified Line Producers & Teams', description: 'We work only with experienced and vetted line producers and production professionals who understand large-scale film workflows and industry standards.' },
    { title: 'Policy-Aligned Execution', description: 'Deep understanding of Madhya Pradesh film policies ensures smooth permissions, accurate subsidy guidance, and full compliance.' },
    { title: 'Script-Driven Location Expertise', description: 'Locations are suggested and finalized based on script requirements, visual treatment, budget, and logistics — not guesswork.' },
    { title: 'Strong Government Coordination', description: 'Established coordination with Film Tourism MP and local authorities for faster approvals and smooth on-ground operations.' },
    { title: 'Reliable Vendor & Resource Network', description: 'Access to vetted vendors, equipment, artists, technicians, and services across Madhya Pradesh with proven reliability' },
    { title: 'End-to-End Accountability', description: 'From pre-production to final wrap-up, FilmIndustryMP remains responsible for execution quality, timelines, and coordination.'},
    { title: 'Proven Focus on Repeat Productions', description: 'Our system is designed to build long-term trust so producers confidently return to Madhya Pradesh for future projects.'},
    { title: 'Vision Beyond One Project', description: 'We work with a long-term goal — positioning Madhya Pradesh as a consistent, film-friendly, and globally competitive production destination.'},

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
                  Over the years, Madhya Pradesh has attracted filmmakers from across India and abroad due to its diverse natural landscapes, rich heritage locations, and cost-effective production environment. However, a recurring challenge has been consistently observed in large-scale film productions shot in the state.

Despite a successful first experience, many production houses do not return for subsequent projects. The primary reason is the involvement of unqualified intermediaries and informal local contacts who lack professional film production and line production experience.

These intermediaries often have limited understanding of:
                </p>
                <div className="space-y-4">
                  {[
                    '1. Structured film production workflows',
                    '2. Government permissions, policies, and subsidy framework',
                    '3. Professional line production standards',
                    '4. Vendor management, casting coordination, and location logistics',
                  ].map((problem) => (
                    <div key={problem} className="flex items-start gap-3">
                    
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
                  As a result, production houses—from Bollywood and regional cinema to OTT platforms and international studios—face delays, budget overruns, compliance issues, and operational inefficiencies. Such experiences create uncertainty and discourage repeat filming in Madhya Pradesh.


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
               FilmIndustryMP was established to eliminate this trust gap and execution challenge by creating a professional, centralized, and accountable film facilitation ecosystem in Madhya Pradesh.

Our objective is to build a single-window system, comparable in structure and reliability to established tourism and film boards, where production houses can:

Receive accurate guidance on permissions and film subsidy policies

Connect with verified and experienced line producers

Discover locations aligned with script requirements and budget planning

Execute projects efficiently, transparently, and cost-effectively
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
           <p className="text-2xl text-foreground/70 leading-relaxed mb-16">
           FilmIndustryMP functions as a professional point of contact and execution partner for production houses from India and around the world seeking to shoot in Madhya Pradesh.
           </p>

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
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
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
                Our Long Term  Vision
              </h2>
              <p className="text-2xl text-foreground/70 leading-relaxed">
                Our mission extends beyond facilitating individual film shoots.

FilmIndustryMP aims to build long-term confidence, encouraging production houses to repeatedly choose Madhya Pradesh for feature films, web series, OTT content, television shows, commercials, and international productions.

Through professionalism, transparency, and institutional trust, we are committed to positioning Madhya Pradesh as a film-friendly, dependable, and globally competitive production destination.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
