'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './scroll-reveal'

export function MPProjectSection() {
  return (
    <section className="w-full bg-background">

      {/* GAP after text banner */}
      <div className="mt-16" />

      {/* 2️⃣ MP PROJECT TEXT (NO OVERLAY) */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-display font-bold text-foreground"
        >
          MP PROJECT
        </motion.h2>
      </div>

      {/* GAP between text & image */}
      <div className="mt-10" />

      {/* 3️⃣ IMAGE (REAL SIZE, NO CROP) */}
      <div className="flex justify-center">
        <img
          src="/mpprojects.jpg"
          alt="MP Project"
          className="w-auto h-auto max-w-full"
        />
      </div>

      {/* Content Section */}
      <div className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
              Film Subsidy Scheme
            </h3>
            <p className="text-xl text-foreground/70 mb-12">
              Madhya Pradesh offers comprehensive support for film productions with subsidies up to 35%
            </p>
            <p className="text-lg font-semibold text-primary">
              Conditions Apply
            </p>
          </ScrollReveal>
        </div>
      </div>

    </section>
  )
}


