import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, getCategory } from '../data/categories'
import { availableSocials } from '../data/site'
import { usePageTitle } from '../hooks'
import SymbolArt from '../components/SymbolArt'
import EntryList from '../components/EntryList'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'
import NotFoundPage from './NotFoundPage'
import './pages.css'
import './CategoryPage.css'

/**
 * One template, four pages. The URL (/creativity, /public-speaking, ...) tells
 * us which entry of data/categories.ts to show, and its `theme` gives each page
 * its own colours and line drawing.
 */
export default function CategoryPage() {
  const { slug } = useParams()
  const category = slug ? getCategory(slug) : undefined
  usePageTitle(category?.title)

  if (!category) return <NotFoundPage />

  const { theme } = category
  const linkedin = availableSocials.find((s) => s.id === 'linkedin')
  const others = categories.filter((c) => c.slug !== category.slug)

  return (
    <article
      className={`cat cat--${category.motif}`}
      style={
        {
          '--cat-base': theme.base,
          '--cat-soft': theme.soft,
          '--cat-accent': theme.accent,
        } as CSSProperties
      }
    >
      <header className="page-hero cat__hero">
        <div className="container page-hero__inner">
          <div>
            <Link to={{ pathname: '/', hash: '#dimensions' }} className="back-link">
              <ArrowIcon />
              All dimensions
            </Link>
            <p className="eyebrow cat__eyebrow">{category.eyebrow}</p>
            <h1>{category.title}</h1>
            <p className="page-hero__lead">{category.intro}</p>
            {category.showLinkedIn && linkedin && (
              <a className="btn btn--outline" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                View my LinkedIn profile
                <ArrowIcon />
              </a>
            )}
          </div>
          <svg className="cat__art" viewBox="0 0 200 200" aria-hidden="true">
            <SymbolArt motif={category.motif} color={theme.accent} accent="#ffffff" strokeWidth={2} />
          </svg>
        </div>
      </header>

      <section className="page-section" aria-labelledby="focus-title">
        <div className="container">
          <h2 id="focus-title">What lives here</h2>
          <ul className="chips cat__chips">
            {category.focusAreas.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {category.sections.map((s) => (
        <section key={s.title} className="page-section" aria-labelledby={`sec-${s.title}`}>
          <div className="container">
            <Reveal>
              <h2 id={`sec-${s.title}`}>{s.title}</h2>
              <p className="page-section__desc">{s.description}</p>
              <EntryList items={s.items} emptyMessage={s.emptyMessage} />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="page-section" aria-labelledby="others-title">
        <div className="container">
          <h2 id="others-title">Other dimensions</h2>
          <nav aria-label="Other dimensions" className="other-dimensions">
            {others.map((o) => (
              <Link key={o.slug} to={`/${o.slug}`} style={{ backgroundColor: o.theme.base }}>
                {o.title}
                <ArrowIcon />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </article>
  )
}
