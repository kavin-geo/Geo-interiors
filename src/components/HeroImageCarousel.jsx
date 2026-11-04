import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function HeroImageCarousel({ slides, shouldReduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((index) => (index + 1) % slides.length)
      }
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  useEffect(() => {
    slides.forEach((slide, index) => {
      if (index === activeIndex) return
      const image = new Image()
      image.src = slide.image
    })
  }, [activeIndex, slides])

  return (
    <div
      aria-label="Geo Interiors room photography"
      aria-roledescription="carousel"
      className="hero-image-carousel"
      role="group"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          alt={activeSlide.alt}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-image-slide"
          exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
          fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
          key={activeSlide.image}
          src={activeSlide.image}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.65, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}
