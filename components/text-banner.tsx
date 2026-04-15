'use client'

const items = [
  'Plan. Shoot. Wrap.',
  'Madhya Pradesh – The Heart of India.',
  'Locations. Subsidies. Permits.',
  'Feel the Heartbeat of India.',
  'From Forests to Forts.',
  'Script to Screen.',
  'Land of Heritage & Harmony.',
  'Nature. Culture. Tradition.',
  'Discover the Soul of India.',
  'Pure. Proud. Madhya Pradesh.',
]

// Tripled for seamless infinite loop
const display = [...items, ...items, ...items]

export function TextBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808]">
      {/* Top gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C60, #C9A84C, #C9A84C60, transparent)' }} />

      <div className="py-5 sm:py-6 relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />

        {/* Scrolling track */}
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 60s linear infinite' }}>
          {display.map((text, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <span className="font-display italic text-base sm:text-lg tracking-wide"
                style={{ color: i % 3 === 0 ? '#C9A84C' : i % 3 === 1 ? '#E8C97A' : '#9A7A35' }}>
                {text}
              </span>
              {/* Separator */}
              <span className="mx-8 sm:mx-12 text-[#C9A84C]/30 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C60, #C9A84C, #C9A84C60, transparent)' }} />

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
