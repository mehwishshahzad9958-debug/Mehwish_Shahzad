import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import SiteNav from './SiteNav'
import MobileMenu from './MobileMenu'
import { MenuIcon } from './Icons'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)

  // Close the mobile menu whenever the route (or hash) changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.key])

  const close = () => {
    setMenuOpen(false)
    menuButton.current?.focus()
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          {site.name}
        </Link>

        <nav aria-label="Primary" className="header__nav">
          <SiteNav className="header__links" />
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="header__menu-btn"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={close} />
    </header>
  )
}
