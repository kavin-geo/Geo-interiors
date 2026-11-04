import { motion } from 'motion/react'
import HeroImageCarousel from '../components/HeroImageCarousel'
import TypingText from '../components/TypingText'
import { heroSlides } from '../data/heroSlides'
import { PhoneIcon } from '../components/Icons'
import { phone, whatsAppUrl } from '../utils/contact'
import { revealProps } from '../utils/revealProps'

function HomeIcon({ className }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 20V8l8-5 8 5v12h-6v-7h-4v7H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function EstimateIcon({ className }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18m5-14.5c-.8-1-2.2-1.5-4-1.5-2.5 0-4 1.2-4 3s1.3 2.8 4 3.5 4 1.7 4 3.5-1.6 3-4 3c-1.9 0-3.5-.6-4.5-1.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function LocationIcon({ className }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

const heroActions = [
  {
    href: '#services',
    label: 'Our Services',
    Icon: HomeIcon,
    primary: true,
  },
  {
    href: whatsAppUrl('Hello Geo Interiors! I would like to know about your indicative home interior estimate.'),
    label: 'Free Estimate',
    Icon: EstimateIcon,
    external: true,
  },
  {
    href: whatsAppUrl('Hi, I would like to book a free site visit.'),
    label: 'Free Site Visit',
    Icon: LocationIcon,
    external: true,
  },
  {
    href: `tel:${phone}`,
    label: 'Call Now',
    Icon: null,
  },
]

export default function HeroSection({ shouldReduceMotion }) {
  return (
    <section className="hero-section" id="home">
      <motion.div className="hero-copy" {...revealProps(shouldReduceMotion)}>
        <p className="eyebrow"><span /> DIRECT FACTORY · SKILLED CARPENTRY</p>
        <h1 aria-label="Home interiors, built by hand.">
          <TypingText text="Home interiors," direction="left" shouldReduceMotion={shouldReduceMotion} />
          <br />
          <span>
            <TypingText text="built by hand." direction="right" shouldReduceMotion={shouldReduceMotion} />
          </span>
        </h1>
        <div className="hero-actions">
          {heroActions.map(({ href, label, Icon, primary, external }) => (
            <a
              className={`button ${primary ? 'button-dark' : 'button-outline'}`}
              href={href}
              key={label}
              rel={external ? 'noreferrer' : undefined}
              target={external ? '_blank' : undefined}
            >
              {Icon ? <Icon className="hero-action-icon" /> : <PhoneIcon className="hero-action-icon" />}
              <span>{label}</span>
            </a>
          ))}
        </div>
        <div className="hero-trust">
          <span>Free site measurement</span>
          <span>Itemized estimates</span>
          <span>In-house carpenters</span>
        </div>
      </motion.div>
      <motion.div className="hero-visual" {...revealProps(shouldReduceMotion, { image: true })}>
        <HeroImageCarousel slides={heroSlides} shouldReduceMotion={shouldReduceMotion} />
      </motion.div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to learn about Geo Interiors">
        <span>BUILT BY OUR TEAM, FROM THE FIRST MEASURE</span>
        <span className="scroll-line" />
      </a>
    </section>
  )
}
