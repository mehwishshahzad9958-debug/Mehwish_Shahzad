import { Link } from 'react-router-dom'
import { creativityHero, disciplines } from '../../data/creativity'
import { ArrowIcon } from '../../components/Icons'
import { DisciplineArt, Squiggle } from './Illustrations'

const STICKERS = [
  { id: 'painting', word: creativityHero.annotations[0], cls: 'cr-sticker--a' },
  { id: 'crochet', word: creativityHero.annotations[1], cls: 'cr-sticker--b' },
  { id: 'handmade', word: creativityHero.annotations[2], cls: 'cr-sticker--c' },
  { id: 'cooking', word: creativityHero.annotations[3], cls: 'cr-sticker--d' },
] as const

export default function CreativityHero() {
  return (
    <header className="cr-hero">
      <div className="container cr-hero__inner">
        <div className="cr-hero__text">
          <Link to={{ pathname: '/', hash: '#dimensions' }} className="cr-back">
            <ArrowIcon />
            All dimensions
          </Link>
          <p className="cr-kicker">{creativityHero.eyebrow}</p>
          <h1 className="cr-hero__title">
            <span className="cr-word">{creativityHero.headlineStart}</span>{' '}
            <br />
            <span className="cr-word cr-word--emph">
              {creativityHero.headlineEmphasis}
              <Squiggle className="cr-hero__squiggle" />
            </span>
          </h1>
          <p className="cr-hero__lead">{creativityHero.lead}</p>
        </div>

        <div className="cr-collage" aria-hidden="true">
          {STICKERS.map((s) => (
            <figure key={s.id} className={`cr-sticker ${s.cls}`}>
              <span className="cr-tape" />
              <DisciplineArt id={s.id} className="cr-sticker__art" />
              <figcaption>{s.word}</figcaption>
            </figure>
          ))}
          <span className="cr-collage__star">✿</span>
        </div>
      </div>

      <nav className="container cr-index" aria-label="Creative disciplines">
        <span className="cr-index__label">Jump to</span>
        <ul>
          {disciplines.map((d) => (
            <li key={d.id}>
              <Link to={{ hash: `#cr-${d.id}` }} className={`cr-chip cr-chip--${d.id}`}>
                <span aria-hidden="true">{d.number}</span>
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
