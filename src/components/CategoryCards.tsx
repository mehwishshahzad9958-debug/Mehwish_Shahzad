import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { ArrowIcon } from './Icons'
import Reveal from './Reveal'
import './CategoryCards.css'

/** "Explore My Dimensions": the four category cards. Each opens its own page. */
export default function CategoryCards() {
  return (
    <section id="dimensions" className="dimensions" aria-labelledby="dimensions-title">
      <div className="container">
        <div className="dimensions__head">
          <h2 id="dimensions-title">Explore My Dimensions</h2>
          <span className="dimensions__rule" aria-hidden="true" />
          <p>Four paths, one story — all parts of me.</p>
        </div>

        <ul className="dimensions__grid">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.08} className="dimensions__item">
                <Link
                  to={`/${c.slug}`}
                  className="card"
                  style={{ backgroundColor: c.theme.base }}
                  aria-label={`${c.title}: ${c.cardDescription}`}
                >
                  <div className="card__photo">
                    <img src={c.image} alt="" loading="lazy" />
                    <span className="card__number" aria-hidden="true">
                      {c.number}
                    </span>
                  </div>
                  <div className="card__body">
                    <h3>{c.title}</h3>
                    <p>{c.cardDescription}</p>
                    <span className="card__arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
