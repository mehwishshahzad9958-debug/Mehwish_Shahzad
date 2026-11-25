import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { exploringNow } from '../data/exploring'
import { categories, getCategory } from '../data/categories'
import { journalHero, journalSections, type JournalSectionId } from '../data/journal'
import { blogPosts } from '../data/blogs'
import { vlogs } from '../data/vlogs'
import { parseInstagram } from './journal/vlogs/instagram'
import { galleryPhotos } from '../data/gallery'
import { travelEntries } from '../data/travel'
import { usePageTitle } from '../hooks'
import { ArrowIcon, SparkIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import './pages.css'
import './JournalPage.css'
import './journal/journal.css'

const counts: Record<JournalSectionId, number> = {
  blogs: blogPosts.length,
  travel: travelEntries.length,
  vlogs: vlogs.filter((v) => parseInstagram(v.url)).length,
  gallery: galleryPhotos.length,
}

/** Decorative backgrounds, one per section. Purely visual (aria-hidden). */
const art: Record<JournalSectionId, ReactNode> = {
  blogs: (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="0" x2="400" y1={150 + i * 16} y2={150 + i * 16} stroke="#c9b98f" strokeOpacity=".45" />
      ))}
      <line x1="46" x2="46" y1="0" y2="340" stroke="#b4412f" strokeOpacity=".35" />
      <text x="250" y="130" fontFamily="Newsreader, serif" fontStyle="italic" fontSize="130" fill="#b4412f" fillOpacity=".14">Aa</text>
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d="M-10 300 C 80 220, 140 300, 210 230 S 330 150, 410 90" fill="none" stroke="#b4412f" strokeWidth="2.5" strokeDasharray="3 9" strokeLinecap="round" />
      <circle cx="210" cy="230" r="6" fill="#b4412f" />
      <circle cx="342" cy="130" r="26" fill="none" stroke="#2f5f8a" strokeOpacity=".5" strokeWidth="2" />
      <circle cx="342" cy="130" r="19" fill="none" stroke="#2f5f8a" strokeOpacity=".35" strokeDasharray="2 3" />
      <rect x="296" y="30" width="64" height="76" rx="3" fill="none" stroke="#b4412f" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 4" transform="rotate(6 328 68)" />
    </svg>
  ),
  vlogs: (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <rect x="14" y={14 + i * 38} width="14" height="20" rx="3" fill="#f5ecdc" fillOpacity=".12" />
          <rect x="372" y={14 + i * 38} width="14" height="20" rx="3" fill="#f5ecdc" fillOpacity=".12" />
        </g>
      ))}
      <circle cx="300" cy="120" r="54" fill="none" stroke="#e8a27c" strokeOpacity=".45" strokeWidth="2" />
      <path d="M288 96 L326 120 L288 144 Z" fill="#e8a27c" fillOpacity=".5" />
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="230" y="26" width="70" height="92" fill="#d9cdb9" stroke="#fff" strokeWidth="5" />
      <rect x="310" y="26" width="64" height="56" fill="#cbb9a0" stroke="#fff" strokeWidth="5" />
      <rect x="310" y="92" width="64" height="86" fill="#e2d6c3" stroke="#fff" strokeWidth="5" />
      <rect x="230" y="128" width="70" height="50" fill="#bfae95" stroke="#fff" strokeWidth="5" />
    </svg>
  ),
}

/** The Journal landing: introduces its four sections, then what I'm exploring now. */
export default function JournalPage() {
  usePageTitle('Journal')
  return (
    <div className="jl">
      <header className="jl__hero">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowIcon />
            Home
          </Link>
          <p className="eyebrow" style={{ marginTop: 28 }}>{journalHero.eyebrow}</p>
          <h1 className="jl__title">
            {journalSections.map((s, i) => (
              <span key={s.id}>
                <Link to={s.path}>{i % 2 ? <i>{s.verb}.</i> : `${s.verb}.`}</Link>{' '}
              </span>
            ))}
          </h1>
          <p className="jl__lead">{journalHero.lead}</p>
        </div>
      </header>

      <section aria-labelledby="jl-sections">
        <div className="container">
          <h2 id="jl-sections" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            The four sections of the Journal
          </h2>
          <div className="jl__grid">
            {journalSections.map((s, i) => {
              const n = counts[s.id]
              return (
                <Reveal key={s.id} delay={(i % 2) * 0.08}>
                  <Link to={s.path} className={`jl-card jl-card--${s.id}`}>
                    <span className="jl-card__art">{art[s.id]}</span>
                    <span className="jl-card__num">{s.number}</span>
                    <span className="jl-card__title">{s.title}</span>
                    <span className="jl-card__desc">{s.description}</span>
                    <span className="jl-card__foot">
                      <span className="jl-card__count">{n === 0 ? 'Coming soon' : `${n} ${n === 1 ? s.unit[0] : s.unit[1]}`}</span>
                      <span className="jl-card__go">
                        Open <ArrowIcon />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="now-title">
        <div className="container">
          <h2 id="now-title" className="journal__now-title">
            <SparkIcon size={24} className="journal__spark" />
            Currently exploring
          </h2>
          <ul className="journal__now">
            {exploringNow.map((item) => (
              <li key={item.label}>
                <span style={{ backgroundColor: getCategory(item.category)?.theme.base }} aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="jdims-title">
        <div className="container">
          <h2 id="jdims-title">Explore the dimensions</h2>
          <nav aria-label="Dimensions" className="other-dimensions journal__dims">
            {categories.map((c) => (
              <Link key={c.slug} to={`/${c.slug}`} style={{ backgroundColor: c.theme.base }}>
                {c.title}
                <ArrowIcon />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  )
}
