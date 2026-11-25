import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '../data/site'
import SiteNav from './SiteNav'
import SocialLinks from './SocialLinks'
import { ArrowIcon, CloseIcon } from './Icons'
import './MobileMenu.css'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/** Full-screen navigation for small screens. */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  // While open: lock page scroll, move focus inside, close on Escape, keep Tab inside the menu.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const focusable = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="mobile-menu__top">
            <Link to="/" className="brand" onClick={onClose}>
              {site.name}
            </Link>
            <button
              ref={closeButton}
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Mobile">
            <p className="eyebrow mobile-menu__label">Menu</p>
            <SiteNav
              className="mobile-menu__links"
              linkClassName="mobile-menu__link"
              onNavigate={onClose}
              renderAfter={() => <ArrowIcon size={20} />}
            />
          </nav>

          <div className="mobile-menu__bottom">
            <SocialLinks />
            <p className="mobile-menu__tagline">{site.tagline}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
