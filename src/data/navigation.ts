export interface NavItem {
  label: string
  /** Route to open. */
  path: string
  /** Optional element id on that page to scroll to. */
  hash?: string
  /** 'current' means: stay on the current page (used for the footer Contact anchor). */
  samePage?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Categories', path: '/', hash: 'dimensions' },
  { label: 'Journal', path: '/journal' },
  { label: 'Contact', path: '/', hash: 'contact', samePage: true },
]
