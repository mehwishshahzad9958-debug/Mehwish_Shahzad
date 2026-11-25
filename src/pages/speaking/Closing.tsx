import { Link } from 'react-router-dom'
import { speakingClosing } from '../../data/speaking'
import { categories } from '../../data/categories'
import { ArrowIcon } from '../../components/Icons'
import Reveal from '../../components/Reveal'

/** Section 6: a closing statement and the way back to the main portfolio. */
export default function Closing() {
  const others = categories.filter((c) => c.slug !== 'public-speaking')
  return (
    <section className="sp-closing" aria-labelledby="sp-closing-title">
      <div className="container sp-closing__inner">
        <Reveal>
          <h2 id="sp-closing-title" className="sp-closing__statement">
            {speakingClosing.statement}
          </h2>
          <p className="sp-closing__sub">{speakingClosing.sub}</p>
          <div className="sp-closing__actions">
            <Link to="/" className="sp-btn">
              Back to the main portfolio
              <ArrowIcon />
            </Link>
            <nav aria-label="Other dimensions" className="sp-closing__more">
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
