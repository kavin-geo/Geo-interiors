import { motion } from 'motion/react'
import ServiceCategoryGallery from '../components/ServiceCategoryGallery'
import SectionHeading from '../components/SectionHeading'
import TypingText from '../components/TypingText'
import { serviceGroups } from '../data/services'
import { revealProps } from '../utils/revealProps'

export default function ServicesSection({ shouldReduceMotion }) {
  return (
    <section className="work-section section-wrap" id="services">
      <SectionHeading
        eyebrow="WHAT WE DO"
        shouldReduceMotion={shouldReduceMotion}
        title="From first cut to final fitting."
      />
      <div className="service-groups">
        {serviceGroups.map((group, groupIndex) => (
          <motion.section
            className="service-group"
            key={group.title}
            {...revealProps(shouldReduceMotion, { delay: groupIndex * 0.08 })}
          >
            <motion.div
              className="service-group-heading"
              {...revealProps(shouldReduceMotion, { delay: groupIndex * 0.08 })}
            >
              <div>
                <h3>
                  <TypingText
                    direction={groupIndex % 2 ? 'right' : 'left'}
                    shouldReduceMotion={shouldReduceMotion}
                    text={group.title}
                  />
                </h3>
              </div>
            </motion.div>
            <ServiceCategoryGallery
              categories={group.categories}
              shouldReduceMotion={shouldReduceMotion}
            />
          </motion.section>
        ))}
      </div>
    </section>
  )
}
