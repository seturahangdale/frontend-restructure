'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const showreelImages = [
  '/showreel/download.jpg',
  '/showreel/download (3).jpg',
  '/showreel/download (4).jpg',
  '/showreel/download (5).jpg',
  '/showreel/Jai Gangaajal.jpg',
  '/showreel/satyagraha.jpg',
  '/showreel/Sanju.jpg',
  '/showreel/Yamla Pagla Deewana.jpg',
]

export function SubsidySection() {
  const [index, setIndex] = useState(0)
  const x = useMotionValue(0)

  const prev = () =>
    setIndex((i) => (i === 0 ? showreelImages.length - 1 : i - 1))

  const next = () =>
    setIndex((i) => (i + 1) % showreelImages.length)

  const prevIndex =
    index === 0 ? showreelImages.length - 1 : index - 1
  const nextIndex =
    (index + 1) % showreelImages.length

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prev()
    } else if (info.offset.x < -threshold) {
      next()
    }
  }

  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20 bg-background overflow-hidden">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
        Showreel
      </h2>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-4 md:gap-6 lg:gap-10 px-4">

        {/* LEFT IMAGE (BLUR) - Hidden on mobile/tablet */}
        <motion.img
          key={prevIndex}
          src={showreelImages[prevIndex]}
          className="hidden xl:block w-[200px] h-[280px] lg:w-[240px] lg:h-[340px] xl:w-[280px] xl:h-[380px] object-cover rounded-xl blur-sm opacity-40"
          alt="Previous showreel image"
        />

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:left-4 z-20 p-2 sm:p-2.5 md:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 active:bg-black/80 transition-colors touch-manipulation"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>

        {/* CENTER IMAGE - Swipeable on mobile */}
        <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[560px] xl:w-[520px] xl:h-[600px] rounded-xl sm:rounded-2xl bg-black shadow-2xl flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={showreelImages[index]}
              src={showreelImages[index]}
              alt={`Showreel image ${index + 1}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing select-none"
            />
          </AnimatePresence>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:right-4 z-20 p-2 sm:p-2.5 md:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 active:bg-black/80 transition-colors touch-manipulation"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>

        {/* RIGHT IMAGE (BLUR) - Hidden on mobile/tablet */}
        <motion.img
          key={nextIndex}
          src={showreelImages[nextIndex]}
          className="hidden xl:block w-[200px] h-[280px] lg:w-[240px] lg:h-[340px] xl:w-[280px] xl:h-[380px] object-cover rounded-xl blur-sm opacity-40"
          alt="Next showreel image"
        />
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6 sm:mt-8">
        {showreelImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? 'bg-primary w-8' : 'bg-gray-300'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
