import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import HeroArt from './HeroArt'
import { ArrowIcon } from './Icons'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="hero__eyebrow">
            {site.dimensions.map((d, i) => (
              <span key={d}>
                {i > 0 && <i aria-hidden="true">·</i>}
                {d}
              </span>
            ))}
          </p>
          <h1 id="hero-title" className="hero__title">
            Different passions.
            <br />
            One curious mind.
          </h1>
          <p className="hero__intro">{site.heroIntro}</p>
          <Link to={{ pathname: '/', hash: '#dimensions' }} className="btn btn--dark">
            Explore My World
            <ArrowIcon size={18} />
          </Link>
        </motion.div>

        <HeroArt />
      </div>
    </section>
  )
}
