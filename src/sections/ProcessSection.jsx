import { motion } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import { processSteps } from '../data/processSteps'
import { revealProps } from '../utils/revealProps'

export default function ProcessSection({ shouldReduceMotion }) {
  return (
    <section className="process-section section-wrap" id="process">
      <SectionHeading
        eyebrow="FROM VISIT TO HANDOVER"
        shouldReduceMotion={shouldReduceMotion}
        title="Five steps. No surprises."
      />
      <div className="process-grid max-[901px]:grid-cols-3 max-[681px]:grid-cols-2">
        {processSteps.map((step, index) => (
          <motion.article
            className="process-card"
            key={step.title}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            {...revealProps(shouldReduceMotion, { delay: index * 0.075 })}
          >
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
