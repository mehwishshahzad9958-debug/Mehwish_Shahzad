import { Link } from 'react-router-dom'
import { aboutSummary } from '../data/about'
import { exploringNow } from '../data/exploring'
import { getCategory } from '../data/categories'
import Collage from './Collage'
import YarnIllustration from './YarnIllustration'
import Reveal from './Reveal'
import { ArrowIcon, SparkIcon } from './Icons'
import './AboutSection.css'

/** Two connected-but-distinct blocks: "A little more about me" and "Currently Exploring". */
export default function AboutSection() {
  return (
    <section className="about" aria-label="About me and what I’m exploring">
      <div className="container about__grid">
        <Reveal className="about__card about__card--me">
          <div className="about__text">
            <h2 id="about-me">
              A little more
              <br />
              about me…
            </h2>
            <p>{aboutSummary}</p>
            <Link to="/about" className="btn btn--dark">
              Know More
              <ArrowIcon />
            </Link>
          </div>
          <Collage />
        </Reveal>

        <Reveal className="about__card about__card--exploring" delay={0.1}>
          <div className="exploring__content">
            <div className="exploring__title">
              <SparkIcon size={26} className="exploring__spark" />
              <h2>Currently Exploring</h2>
            </div>
            <ul className="exploring__list">
              {exploringNow.map((item) => (
                <li key={item.label}>
                  <span
                    className="exploring__dot"
                    style={{ backgroundColor: getCategory(item.category)?.theme.base }}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
            <Link to="/journal" className="text-link">
              <span>Read My Journal</span>
              <ArrowIcon />
            </Link>
          </div>
          <YarnIllustration className="exploring__yarn" />
        </Reveal>
      </div>
    </section>
  )
}
