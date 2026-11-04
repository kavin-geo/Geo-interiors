import { Fragment } from 'react'
import { motion } from 'motion/react'

export default function TypingText({ text, direction = 'left', shouldReduceMotion }) {
  const words = text.split(' ')
  const characterVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction === 'right' ? 12 : -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.12 : 0.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="typing-text"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: {
            transition: shouldReduceMotion
              ? {
                  delayChildren: 0,
                  staggerChildren: 0.035,
                  staggerDirection: direction === 'right' ? -1 : 1,
                }
              : {
                  delayChildren: direction === 'right' ? 0.52 : 0.12,
                  staggerChildren: 0.04,
                  staggerDirection: direction === 'right' ? -1 : 1,
                },
          },
        }}
      >
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            {wordIndex > 0 && ' '}
            <span className="typing-word">
              {Array.from(word, (character, characterIndex) => (
                <motion.span
                  className="typing-character"
                  key={`${character}-${characterIndex}`}
                  variants={characterVariants}
                >
                  {character}
                </motion.span>
              ))}
            </span>
          </Fragment>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </>
  )
}
