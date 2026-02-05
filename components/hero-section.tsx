'use client'

export function HeroSection() {
  return (
    <section className="relative w-full h-[340px] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen overflow-hidden bg-black">
      <video
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-[600px] h-[440px] md:w-full md:h-full object-cover"
      >
        <source src="/newhero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  )
}
