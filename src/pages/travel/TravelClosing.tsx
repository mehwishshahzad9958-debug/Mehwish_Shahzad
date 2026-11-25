import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { travelClosing } from '../../data/travel'
import { ArrowIcon } from '../../components/Icons'
import Reveal from '../../components/Reveal'
import { Stamp, StampScene } from './Decor'

/** The closing "envelope": airmail border, a stamp, a last line, and the way back. */
export default function TravelClosing() {
  return (
    <section className="tj-closing" aria-labelledby="tj-closing-title">
      <div className="container">
        <Reveal className="tj-envelope">
          <Stamp className="tj-envelope__stamp">
            <StampScene />
          </Stamp>
          <h2 id="tj-closing-title">{travelClosing.statement}</h2>
          <p className="tj-script tj-envelope__sub">{travelClosing.sub}</p>
          <div className="tj-envelope__actions">
            <Link to="/" className="tj-btn">
              Back to the main portfolio
              <ArrowIcon />
            </Link>
            <nav aria-label="Dimensions" className="tj-envelope__more">
              <span>Keep exploring:</span>
              {categories.map((c) => (
                <Link key={c.slug} to={`/${c.slug}`}>
                  {c.title}
                </Link>
              ))}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
