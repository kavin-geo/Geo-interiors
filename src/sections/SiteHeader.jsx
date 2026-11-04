import { useEffect, useState } from 'react'
import { phone } from '../utils/contact'
import Wordmark from '../components/Wordmark'
import { PhoneIcon } from '../components/Icons'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 40)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header max-[901px]:px-[5%] max-[681px]:px-[22px] ${headerScrolled ? 'is-scrolled' : ''}`}>
      <Wordmark />
      <button
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="menu-toggle max-[901px]:ml-auto max-[901px]:mr-3 max-[901px]:block"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
      </button>
      <nav
        className={`main-nav max-[901px]:absolute max-[901px]:left-0 max-[901px]:right-0 max-[901px]:top-full max-[901px]:z-10 max-[901px]:m-0 max-[901px]:flex-col max-[901px]:gap-0 max-[901px]:border-t max-[901px]:border-[var(--line)] max-[901px]:bg-[var(--paper)] max-[901px]:px-[22px] max-[901px]:pt-2 max-[901px]:pb-[15px] max-[901px]:shadow-[0_12px_20px_rgb(39_44_37_/_8%)] ${menuOpen ? 'max-[901px]:!flex' : 'max-[901px]:hidden'}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#estimate" onClick={closeMenu}>Estimate</a>
        <a href="#process" onClick={closeMenu}>Our process</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <a className="header-cta" href={`tel:${phone}`} aria-label="Call us">
        <PhoneIcon />
      </a>
    </header>
  )
}
