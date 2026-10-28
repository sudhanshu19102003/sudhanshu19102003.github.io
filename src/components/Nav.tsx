import { useState } from 'react'
import { NAV_LINKS, CONTACT_LINKS } from '../data'

const ICON_PROPS = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
} as const

const ICONS: Record<string, React.ReactElement> = {
  Email: (
    <svg {...ICON_PROPS}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  Phone: (
    <svg {...ICON_PROPS}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
  ),
  GitHub: (
    <svg {...ICON_PROPS}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
  ),
  LinkedIn: (
    <svg {...ICON_PROPS}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>
  ),
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav>
      {/* Desktop Navigation */}
      <ul className="nav-links">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      {/* Quick contact icons */}
      <div className="nav-icons">
        {CONTACT_LINKS.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            className="nav-icon"
            aria-label={label}
            title={`${label}: ${value}`}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {ICONS[label]}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="nav-hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`nav-mobile-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>

      {/* Mobile Menu Drawer */}
      <div className={`nav-mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul className="nav-mobile-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={handleLinkClick}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
