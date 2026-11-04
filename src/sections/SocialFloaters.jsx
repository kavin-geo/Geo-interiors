import { useEffect } from 'react'
import siteConfig from '../siteConfig'
import { InstagramIcon, WhatsAppIcon } from '../components/Icons'
import { whatsAppUrl } from '../utils/contact'

export default function SocialFloaters() {
  useEffect(() => {
    const contactSection = document.querySelector('.contact-section')
    const contentSections = document.querySelectorAll('.about-section')
    if (!('IntersectionObserver' in window)) return undefined

    let contactObserver
    let contentObserver
    const visibleSections = new Set()

    if (contactSection) {
      contactObserver = new IntersectionObserver(([entry]) => {
        document.documentElement.classList.toggle('contact-in-view', entry.isIntersecting)
      })
      contactObserver.observe(contactSection)
    }

    if (contentSections.length) {
      contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target)
          else visibleSections.delete(entry.target)
        })
        document.documentElement.classList.toggle('social-content-in-view', visibleSections.size > 0)
      }, { threshold: 0.01 })

      contentSections.forEach((section) => contentObserver.observe(section))
    }

    return () => {
      contactObserver?.disconnect()
      contentObserver?.disconnect()
      document.documentElement.classList.remove('contact-in-view', 'social-content-in-view')
    }
  }, [])

  return (
    <div className="social-floaters" aria-label="Contact and social media">
      {siteConfig.social.instagramUrl && (
        <a
          className="instagram-float"
          href={siteConfig.social.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Geo Interiors on Instagram"
        >
          <InstagramIcon />
        </a>
      )}
      <a
        className="whatsapp-float"
        href={whatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Geo Interiors on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}
