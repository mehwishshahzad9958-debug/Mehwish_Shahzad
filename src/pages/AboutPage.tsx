import { Link } from 'react-router-dom'
import { aboutPage } from '../data/about'
import { categories } from '../data/categories'
import { availableSocials, site } from '../data/site'
import { usePageTitle } from '../hooks'
import Collage from '../components/Collage'
import { ArrowIcon, PinIcon } from '../components/Icons'
import './pages.css'
import './AboutPage.css'

export default function AboutPage() {
  usePageTitle('About')
  const linkedin = availableSocials.find((s) => s.id === 'linkedin')

  return (
    <>
      <header className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <Link to="/" className="back-link">
              <ArrowIcon />
              Home
            </Link>
            <p className="eyebrow about-page__eyebrow">About</p>
            <h1>A little more about me</h1>
            <p className="page-hero__lead">{aboutPage.lead}</p>
            <p className="about-page__location">
              <PinIcon /> {site.location}
            </p>
            {linkedin && (
              <a className="btn btn--dark" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
                <ArrowIcon />
              </a>
            )}
          </div>
          <Collage />
        </div>
      </header>

      <section className="page-section" aria-labelledby="story-title">
        <div className="container about-page__story">
          <h2 id="story-title">The thread that connects it all</h2>
          <div>
            {aboutPage.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="identity-title">
        <div className="container">
          <h2 id="identity-title">What I do professionally</h2>
          <ul className="chips about-page__chips">
            {site.professionalIdentity.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="dims-title">
        <div className="container">
          <h2 id="dims-title">Four dimensions</h2>
          <nav aria-label="Dimensions" className="other-dimensions about-page__dims">
            {categories.map((c) => (
              <Link key={c.slug} to={`/${c.slug}`} style={{ backgroundColor: c.theme.base }}>
                {c.title}
                <ArrowIcon />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  )
}
