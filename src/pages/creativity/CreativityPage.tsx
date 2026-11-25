import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { Link } from 'react-router-dom'
import { creativityClosing, creativityHero } from '../../data/creativity'
import { usePageTitle } from '../../hooks'
import CreativeGallery from './CreativeGallery'
import './creativity.css'
import './gallery.css'

/**
 * The Creativity page: one continuous, filterable, Pinterest-style board.
 * Content lives in data/creativity.ts; gallery styling is scoped under `.cg`.
 * (The earlier per-discipline section components remain in this folder, unused.)
 */
export default function CreativityPage() {
  usePageTitle('Creativity')
  return (
    <article className="cr cg-page">
      <header className="cg-head">
        <div className="container">
          <Link to={{ pathname: '/', hash: '#dimensions' }} className="cg-back">
            ← All dimensions
          </Link>
          <p className="cg-eyebrow">{creativityHero.eyebrow}</p>
          <h1>
            {creativityHero.headlineStart} <em>{creativityHero.headlineEmphasis}</em>
          </h1>
          <p className="cg-lead">{creativityHero.lead}</p>
        </div>
      </header>
      <CreativeGallery />
      <footer className="cg-foot">
        <div className="container">
          <p>{creativityClosing.statement}</p>
        </div>
      </footer>
    </article>
  )
}
