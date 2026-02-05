'use client'

import { motion } from 'framer-motion'

export function TextBanner() {
  const textLines = [
    'Plan. Shoot. Wrap.',
    'Madhya Pradesh – The Heart of India.',
    'Feel the Heartbeat of India.',
    'Madhya Pradesh – Where History Lives.',
    'Nature, Culture, Tradition – Madhya Pradesh.',
    'Discover the Soul of India.',
    'Madhya Pradesh – Land of Heritage and Harmony.',
    'From Forests to Forts – Madhya Pradesh.',
    'The Heart That Makes India Beat.',
    'Script to Shoot',
    'Pure. Proud. Madhya Pradesh.',
    'In the Heart, Forever.',
  ]

  // Double the array for seamless loop
  const displayLines = [...textLines, ...textLines]

  return (
    <section className="w-full bg-primary text-white py-4 sm:py-6 md:py-8 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap gap-4 sm:gap-6 md:gap-8"
        animate={{ x: [0, -50 + '%'] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {displayLines.map((line, index) => (
          <span
            key={index}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide flex-shrink-0"
          >
            {line}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
