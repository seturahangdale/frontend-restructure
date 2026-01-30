'use client'

import { useEffect } from 'react'

export function HeroSection() {
  useEffect(() => {
    console.log('[v0] HeroSection mounted')
    const video = document.querySelector('#hero-video') as HTMLVideoElement
    if (video) {
      console.log('[v0] Video element found:', video)
      console.log('[v0] Video src:', video.src)
      console.log('[v0] Video readyState:', video.readyState)
      console.log('[v0] Video networkState:', video.networkState)
    } else {
      console.log('[v0] Video element NOT found')
    }
  }, [])

  return (
    <section
      style={{
        width: '98vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}
    >
      <video
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src="/hero.mp4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  )
}
