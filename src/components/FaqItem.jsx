import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  const answerId = useId()
  const questionId = useId()
  const shouldReduceMotion = useReducedMotion()
  const transition = {
    duration: shouldReduceMotion ? 0.01 : 0.32,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <div className="faq-item">
      <button
        aria-controls={answerId}
        aria-expanded={isOpen}
        className="faq-question"
        id={questionId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {question}
      </button>
      <motion.div
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        aria-hidden={!isOpen}
        aria-labelledby={questionId}
        className="faq-answer"
        id={answerId}
        inert={!isOpen}
        initial={false}
        role="region"
        transition={transition}
      >
        <p>{answer}</p>
      </motion.div>
    </div>
  )
}
