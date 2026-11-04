import './App.css'
import { motion, useReducedMotion, useScroll } from 'motion/react'
import AboutSection from './sections/AboutSection'
import ContactSection from './sections/ContactSection'
import EstimateSection from './sections/EstimateSection'
import FaqSection from './sections/FaqSection'
import HeroSection from './sections/HeroSection'
import ProcessSection from './sections/ProcessSection'
import ServicesSection from './sections/ServicesSection'
import SiteHeader from './sections/SiteHeader'
import SocialFloaters from './sections/SocialFloaters'
import TestimonialsSection from './sections/TestimonialsSection'

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  return (
    <main>
      <motion.div
        aria-hidden="true"
        className="scroll-progress"
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      />
      <SiteHeader />
      <HeroSection shouldReduceMotion={shouldReduceMotion} />
      <AboutSection shouldReduceMotion={shouldReduceMotion} />
      <ServicesSection shouldReduceMotion={shouldReduceMotion} />
      <EstimateSection shouldReduceMotion={shouldReduceMotion} />
      <ProcessSection shouldReduceMotion={shouldReduceMotion} />
      <TestimonialsSection shouldReduceMotion={shouldReduceMotion} />
      <FaqSection shouldReduceMotion={shouldReduceMotion} />
      <ContactSection shouldReduceMotion={shouldReduceMotion} />
      <SocialFloaters />
    </main>
  )
}
