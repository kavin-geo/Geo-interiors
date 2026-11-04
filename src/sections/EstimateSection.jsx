import { useState } from 'react'
import { motion } from 'motion/react'
import ArrowIcon from '../components/ArrowIcon'
import SectionHeading from '../components/SectionHeading'
import { estimatePackages, estimatePrices, homeScopes, materialTiers } from '../data/estimates'
import { whatsAppUrl } from '../utils/contact'
import { revealProps } from '../utils/revealProps'

export default function EstimateSection({ shouldReduceMotion }) {
  const [homeScope, setHomeScope] = useState('2bhk')
  const [materialTier, setMaterialTier] = useState('standard')
  const selectedScope = homeScopes.find((scope) => scope.value === homeScope)
  const selectedTier = materialTiers.find((tier) => tier.value === materialTier)
  const selectedPackage = estimatePackages[materialTier]
  const estimatePrice = estimatePrices[homeScope][materialTier]
  const formattedEstimateAmount = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(estimatePrice)
  const formattedEstimate = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(estimatePrice)
  const estimateMessage = `Hello Geo Interiors! Please share an itemized estimate for ${selectedScope.label} at the ${selectedTier.label} level. The website shows ${formattedEstimate} as an indicative starting figure.`

  return (
    <section className="estimate-section" id="estimate">
      <div className="estimate-inner section-wrap max-[901px]:grid-cols-1">
        <div>
          <SectionHeading
            direction="left"
            eyebrow="A CLEAR PLACE TO START"
            shouldReduceMotion={shouldReduceMotion}
            title="Explore an indicative budget."
          />
        </div>
        <motion.div
          aria-live="polite"
          className="estimate-card"
          {...revealProps(shouldReduceMotion, { delay: 0.1 })}
        >
          <div className="estimate-selectors max-[1201px]:grid-cols-1">
            <label className="estimate-field">
              <span>Home size or scope</span>
              <select value={homeScope} onChange={(event) => setHomeScope(event.target.value)}>
                {homeScopes.map((scope) => (
                  <option key={scope.value} value={scope.value}>{scope.label}</option>
                ))}
              </select>
            </label>
            <label className="estimate-field">
              <span>Material and finish</span>
              <select value={materialTier} onChange={(event) => setMaterialTier(event.target.value)}>
                {materialTiers.map((tier) => (
                  <option key={tier.value} value={tier.value}>{tier.label}</option>
                ))}
              </select>
            </label>
          </div>
          <span className="estimate-card-kicker">{selectedTier.label} · {selectedScope.label}</span>
          <motion.strong
            aria-label={`${formattedEstimate} indicative starting estimate`}
            className="estimate-amount"
            key={`${homeScope}-${materialTier}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: 'easeOut' }}
          >
            <span aria-hidden="true" className="estimate-currency">₹</span>
            <span aria-hidden="true" className="estimate-amount">{formattedEstimateAmount}</span>
            <sup aria-hidden="true">*</sup>
          </motion.strong>
          <p>{selectedPackage.description}</p>
          <div className="estimate-includes">
            <span>PACKAGE INCLUDES</span>
            <ul>
              {selectedPackage.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <small>
            *Indicative starting estimate only; actual pricing depends on
            measurements, selected materials and agreed scope.
          </small>
          <a
            className="button button-dark estimate-cta"
            href={whatsAppUrl(estimateMessage)}
            target="_blank"
            rel="noreferrer"
          >
            Ask about this estimate <ArrowIcon diagonal />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
