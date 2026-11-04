import { motion } from 'motion/react'
import ArrowIcon from '../components/ArrowIcon'
import Wordmark from '../components/Wordmark'
import { enquiryServices } from '../data/services'
import siteConfig from '../siteConfig'
import { formatMobileNumber, phone, phoneDisplay, whatsAppUrl } from '../utils/contact'
import { revealProps } from '../utils/revealProps'
import TypingText from '../components/TypingText'
import { InstagramIcon } from '../components/Icons'

function handleContactSubmit(event) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const name = formData.get('name').toString().trim()
  const mobile = formData.get('mobile').toString().trim()
  const email = formData.get('email').toString().trim()
  const service = formData.get('service').toString()
  const location = formData.get('location').toString().trim()
  const project = formData.get('project').toString().trim()
  const message = [
    'Hello Geo Interiors! I would like to request a free consultation.',
    `Name: ${name}`,
    `Mobile: ${formatMobileNumber(mobile)}`,
    email ? `Email: ${email}` : '',
    `Service: ${service}`,
    location ? `Project location: ${location}` : '',
    `Project details: ${project}`,
  ].filter(Boolean).join('\n')

  window.open(whatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

export default function ContactSection({ shouldReduceMotion }) {
  return (
    <footer className="contact-section" id="contact">
      <motion.p className="eyebrow" {...revealProps(shouldReduceMotion)}>
        <span /> LET&apos;S TALK ABOUT YOUR HOME
      </motion.p>
      <motion.h2
        aria-label="Ready to make your space work better?"
        {...revealProps(shouldReduceMotion, { delay: 0.08 })}
      >
        <TypingText text="Ready to make" direction="left" shouldReduceMotion={shouldReduceMotion} />
        <br />
        <TypingText text="your space" direction="right" shouldReduceMotion={shouldReduceMotion} />
        {' '}<em><TypingText text="work better?" direction="left" shouldReduceMotion={shouldReduceMotion} /></em>
      </motion.h2>
      <motion.form
        className="contact-form grid gap-4 sm:grid-cols-2"
        onSubmit={handleContactSubmit}
        {...revealProps(shouldReduceMotion, { delay: 0.12 })}
      >
        <label className="contact-field">
          <span>Your name</span>
          <input
            autoComplete="name"
            maxLength="100"
            name="name"
            placeholder="Enter your name"
            required
          />
        </label>
        <label className="contact-field">
          <span>Mobile number</span>
          <input
            autoComplete="tel"
            className="contact-mobile-input"
            inputMode="tel"
            maxLength="20"
            name="mobile"
            pattern="[0-9+ \-]{7,20}"
            placeholder={phoneDisplay}
            required
            title="Enter a valid phone number using digits, spaces, + or hyphens."
            type="tel"
          />
        </label>
        <label className="contact-field">
          <span>Email address <small>(optional)</small></span>
          <input
            autoComplete="email"
            maxLength="254"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </label>
        <label className="contact-field">
          <span>Service you need</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>Select a service</option>
            {enquiryServices.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="contact-field sm:col-span-2">
          <span>Project town or PIN code <small>(optional)</small></span>
          <input
            autoComplete="postal-code"
            maxLength="100"
            name="location"
            placeholder="e.g. Dharapuram"
          />
        </label>
        <label className="contact-field sm:col-span-2">
          <span>Tell us about your project</span>
          <textarea
            maxLength="500"
            name="project"
            placeholder="Which rooms or services are you interested in?"
            required
            rows="3"
          />
        </label>
        <button className="button button-dark contact-submit sm:col-span-2" type="submit">
          Send enquiry via WhatsApp <ArrowIcon diagonal />
        </button>
      </motion.form>
      <motion.div className="contact-actions" {...revealProps(shouldReduceMotion)}>
        <a className="button button-dark" href={`tel:${phone}`}>
          Call <span className="contact-phone-number">{phoneDisplay}</span><ArrowIcon />
        </a>
        <a
          className="button button-outline"
          href={whatsAppUrl()}
          target="_blank"
          rel="noreferrer"
        >
          Chat on WhatsApp <ArrowIcon diagonal />
        </a>
      </motion.div>
      <motion.div
        className="footer-bottom"
        {...revealProps(shouldReduceMotion, { delay: 0.14 })}
      >
        <Wordmark footer />
        <span>Direct factory. Skilled hands. Homes made to work.</span>
        <div className="footer-socials" aria-label="Social media">
          {siteConfig.social.instagramUrl ? (
            <a
              aria-label="Geo Interiors on Instagram"
              href={siteConfig.social.instagramUrl}
              rel="noreferrer"
              target="_blank"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
          ) : (
            <span
              aria-label="Instagram profile URL not configured"
              className="is-unconfigured"
              role="img"
              title="Add the Instagram URL in src/siteConfig.js"
            >
              <InstagramIcon />
            </span>
          )}
        </div>
        <a href="#home">Back to top ↑</a>
        <span>© {new Date().getFullYear()} Geo Interiors</span>
      </motion.div>
    </footer>
  )
}
