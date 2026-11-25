import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../data/navigation'

interface SiteNavProps {
  className?: string
  linkClassName?: string
  /** Called after a link is clicked (the mobile menu uses this to close itself). */
  onNavigate?: () => void
  /** Optional extra content rendered inside each link (e.g. an arrow). */
  renderAfter?: () => React.ReactNode
}

/**
 * The main links. Used by the header, the mobile menu and the footer so the
 * labels and destinations are defined in exactly one place (data/navigation.ts).
 */
export default function SiteNav({ className, linkClassName, onNavigate, renderAfter }: SiteNavProps) {
  const location = useLocation()

  return (
    <ul className={className}>
      {navItems.map((item) => {
        // "samePage" items (Contact) scroll to the footer of whichever page you're on.
        const pathname = item.samePage ? location.pathname : item.path
        const to = { pathname, hash: item.hash ? `#${item.hash}` : '' }
        const isCurrent =
          !item.hash && (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/')))
        return (
          <li key={item.label}>
            <Link
              to={to}
              className={linkClassName}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={onNavigate}
            >
              <span>{item.label}</span>
              {renderAfter?.()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
