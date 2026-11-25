import { Link } from 'react-router-dom'
import { moments } from '../data/moments'
import Reveal from './Reveal'
import { ArrowIcon } from './Icons'
import './RecentMoments.css'

/** A compact strip of recent photos. */
export default function RecentMoments() {
  return (
    <section id="moments" className="moments" aria-labelledby="moments-title">
      <div className="container">
        <Reveal className="moments__panel">
          <div className="moments__intro">
            <p className="eyebrow">Recent moments</p>
            <h2 id="moments-title">
              A glimpse of
              <br />
              what I’ve been up to.
            </h2>
            <Link to="/journal" className="text-link">
              <span>View all</span>
              <ArrowIcon />
            </Link>
          </div>
          <ul className="moments__list">
            {moments.map((m) => (
              <li key={m.image}>
                <figure>
                  <img src={m.image} alt={m.alt} loading="lazy" />
                  <figcaption>{m.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
