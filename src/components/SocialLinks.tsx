import { availableSocials } from '../data/site'
import { SocialIcon } from './Icons'
import './SocialLinks.css'

/** Round icon buttons. Only socials that have a real URL are shown. */
export default function SocialLinks({ className }: { className?: string }) {
  if (availableSocials.length === 0) return null
  return (
    <ul className={className ?? 'socials'}>
      {availableSocials.map((s) => (
        <li key={s.id}>
          <a
            className="socials__link"
            href={s.url}
            aria-label={s.label}
            {...(s.id !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <SocialIcon id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  )
}
