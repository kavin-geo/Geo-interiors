import { motion } from 'motion/react'
import FaqItem from '../components/FaqItem'
import SectionHeading from '../components/SectionHeading'
import { faqs } from '../data/faqs'
import { revealProps } from '../utils/revealProps'

export default function FaqSection({ shouldReduceMotion }) {
  return (
    <section className="faq-section section-wrap" id="faqs">
      <SectionHeading
        direction="left"
        eyebrow="BEFORE YOU GET STARTED"
        shouldReduceMotion={shouldReduceMotion}
        title="A few useful details."
      />
      <motion.div className="faq-list" {...revealProps(shouldReduceMotion)}>
        {faqs.map((faq) => <FaqItem key={faq.question} {...faq} />)}
      </motion.div>
    </section>
  )
}
