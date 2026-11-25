import { site, availableSocials } from '../data/site'
import SiteNav from './SiteNav'
import SocialLinks from './SocialLinks'
import { SparkIcon } from './Icons'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{site.name}</p>
          <p className="footer__identity">{site.identityLine}</p>
          <p className="footer__location">{site.location}</p>
        </div>

        <div className="footer__connect">
          <h2 className="footer__heading">Let’s Connect</h2>
          <SocialLinks />
          {availableSocials.length < site.socials.length && (
            <p className="footer__note">More ways to get in touch are coming soon.</p>
          )}
        </div>

        <p className="footer__tagline">
          {site.tagline}
          <SparkIcon size={18} />
        </p>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}
        </p>
        <nav aria-label="Footer">
          <SiteNav className="footer__links" />
        </nav>
      </div>

      {/* Decorative curve sits in its own strip at the bottom, so it never crosses text. */}
      <svg className="footer__curve" viewBox="0 0 1280 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 C 380 84, 860 74, 1280 16" fill="none" stroke="#C8693A" strokeWidth="1.6" opacity=".7" />
        <path d="M0 88 C 420 90, 880 86, 1280 40" fill="none" stroke="#C8693A" strokeWidth="1" opacity=".35" />
      </svg>
    </footer>
  )
}
