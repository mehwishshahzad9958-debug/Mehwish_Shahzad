import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import { creativityClosing } from '../../data/creativity'
import { ArrowIcon } from '../../components/Icons'
import Reveal from '../../components/Reveal'

export default function Closing() {
  const others = categories.filter((c) => c.slug !== 'creativity')
  return (
    <section className="cr-closing" aria-labelledby="cr-closing-title">
      <div className="container">
        <Reveal className="cr-closing__card">
          <span className="cr-tape cr-tape--big" aria-hidden="true" />
          <h2 id="cr-closing-title">{creativityClosing.statement}</h2>
          <p className="cr-note cr-closing__sub">{creativityClosing.sub}</p>
          <div className="cr-closing__actions">
            <Link to="/" className="cr-btn">
              Back to the main portfolio
              <ArrowIcon />
            </Link>
            <nav aria-label="Other dimensions" className="cr-closing__more">
              <span>Keep exploring:</span>
              {others.map((o) => (
                <Link key={o.slug} to={`/${o.slug}`}>
                  {o.title}
                </Link>
              ))}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
