import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router changes the page but does not move the scroll position by itself.
 * This component runs after every navigation and either scrolls to the element
 * named in the URL hash (e.g. /#dimensions) or back to the top of the page.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
