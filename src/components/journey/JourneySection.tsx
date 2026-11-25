import { Link } from 'react-router-dom'
import { educationTimeline } from '../../data/educationJourney'
import { destinations } from '../../data/journeyShared'
import Reveal from '../Reveal'
import Timeline from './Timeline'
import Bookshelf from './bookshelf/Bookshelf'
import './journey.css'

/** Homepage "My Journey": the professional journey as a bookshelf, then the education timeline. */
export default function JourneySection() {
  const career = destinations.careerEvolution as { label: string; path?: string }
  return (
    <section id="journey" className="journey" aria-labelledby="journey-title">
      <div className="container">
        <Reveal className="journey__head">
          <p className="eyebrow">My journey</p>
          <h2 id="journey-title">
            From the classroom
            <br />
            to the code.
          </h2>
          <p>How study, teaching, management and technical work have shaped the way I work, in the order they happened.</p>
        </Reveal>

        <div className="journey__pro">
          <h3 className="journey__col-title"><span>Professional journey</span></h3>
          <Bookshelf />
        </div>

        <div className="journey__edu">
          <h3 className="journey__col-title"><span>Education journey</span></h3>
          <Timeline label="Education journey" items={educationTimeline} missingDescription="" />
        </div>

        <div className="journey__foot">
          {career.path ? (
            <Link className="btn btn--dark" to={career.path}>Explore Career Evolution</Link>
          ) : (
            <p className="jr-soon jr-soon--big">
              Explore Career Evolution
              <em>Coming soon</em>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
