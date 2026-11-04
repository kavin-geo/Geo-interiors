import { motion } from 'motion/react'
import { revealProps } from '../utils/revealProps'
import TypingText from './TypingText'

export default function SectionHeading({
  eyebrow,
  title,
  direction = 'right',
  shouldReduceMotion,
}) {
  return (
    <motion.div
      className="section-heading max-[681px]:flex-col max-[681px]:items-start"
      {...revealProps(shouldReduceMotion)}
    >
      <div>
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h2>
          <TypingText
            direction={direction}
            shouldReduceMotion={shouldReduceMotion}
            text={title}
          />
        </h2>
      </div>
    </motion.div>
  )
}
