import { motion } from 'motion/react'
import { siteAsset } from '../utils/siteAssets'
import { revealProps } from '../utils/revealProps'
import TypingText from '../components/TypingText'

const values = [
  {
    title: 'Our own team',
    detail: 'No subcontracting. Skilled in-house carpenters handle the work.',
  },
  {
    title: 'Genuine materials',
    detail: 'BWP marine ply, Century or Greenply and Hettich hardware.',
  },
  {
    title: 'Clear estimates',
    detail: 'Itemized costs shared before work begins.',
  },
  {
    title: 'Timely handover',
    detail: 'A committed 30–45 day completion timeline.',
  },
]

export default function AboutSection({ shouldReduceMotion }) {
  return (
    <>
      <section
        className="intro-strip max-[901px]:px-[5%] max-[681px]:flex-col max-[681px]:items-start max-[681px]:gap-2 max-[681px]:p-[22px]"
        id="about"
      >
        <motion.p {...revealProps(shouldReduceMotion, { delay: 0.05 })}>GEO INTERIORS</motion.p>
        <motion.p className="intro-emphasis" {...revealProps(shouldReduceMotion, { delay: 0.12 })}>
          Made for real homes. Made by our own hands.
        </motion.p>
        <motion.p {...revealProps(shouldReduceMotion, { delay: 0.19 })}>
          DHARAPURAM · TAMIL NADU
        </motion.p>
      </section>

      <section className="about-section section-wrap max-[901px]:gap-[6%] max-[681px]:grid-cols-1">
        <motion.div className="about-heading" {...revealProps(shouldReduceMotion)}>
          <p className="eyebrow"><span /> WHO WE ARE</p>
          <h2 aria-label="Good work starts with the right hands.">
            <TypingText text="Good work starts" direction="left" shouldReduceMotion={shouldReduceMotion} />
            <br />
            <TypingText text="with the right hands." direction="right" shouldReduceMotion={shouldReduceMotion} />
          </h2>
          <motion.img
            alt="Geo Interiors carpentry and fitting team at work"
            className="team-photo"
            loading="lazy"
            src={siteAsset('about-team-installation.png')}
            {...revealProps(shouldReduceMotion, { image: true })}
          />
        </motion.div>
        <motion.div className="about-copy" {...revealProps(shouldReduceMotion, { delay: 0.12 })}>
          <p>
            At Geo Interiors, we believe every family deserves a solid,
            functional and beautiful home interior without inflated designer
            commissions.
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                {...revealProps(shouldReduceMotion, { delay: (index + 1) * 0.05 })}
              >
                <h3>{value.title}</h3>
                <p>{value.detail}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  )
}
