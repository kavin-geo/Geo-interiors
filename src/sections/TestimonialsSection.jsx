import { motion } from 'motion/react'
import { testimonials } from '../data/testimonials'
import { siteAsset } from '../utils/siteAssets'
import { revealProps } from '../utils/revealProps'

export default function TestimonialsSection({ shouldReduceMotion }) {
  return (
    <section className="testimonial-section" aria-label="Sample testimonials">
      <motion.div className="testimonial-marquee" {...revealProps(shouldReduceMotion)}>
        <div className="testimonial-track">
          {[false, true].map((isDuplicate) => (
            <div
              aria-hidden={isDuplicate}
              className="testimonial-group"
              key={isDuplicate ? 'duplicate' : 'original'}
            >
              {testimonials.map((testimonial) => (
                <article
                  className="testimonial-card"
                  key={`${testimonial.name}-${testimonial.location}`}
                >
                  <img
                    alt=""
                    className="testimonial-avatar"
                    src={siteAsset('testimonial-avatar-placeholder.svg')}
                  />
                  <div className="testimonial-content">
                    <blockquote className="testimonial-quote">{testimonial.quote}</blockquote>
                    <p className="testimonial-attribution">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
