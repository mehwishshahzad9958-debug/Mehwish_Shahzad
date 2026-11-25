import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { speakingHero } from '../../data/speaking'
import SymbolArt from '../../components/SymbolArt'
import { ArrowIcon } from '../../components/Icons'

const BUBBLES = [
  { text: 'Why?', className: 'sp-bubble--a' },
  { text: 'Imagine…', className: 'sp-bubble--b' },
  { text: 'Here’s how.', className: 'sp-bubble--c' },
]

/** Splits a phrase into words so each can react to the pointer. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span className="sp-word">{w}</span>
        </span>
      ))}
    </>
  )
}

export default function SpeakingHero() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const { verbs } = speakingHero

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setI((n) => (n + 1) % verbs.length), 2200)
    return () => window.clearInterval(id)
  }, [reduce, verbs.length])

  return (
    <header className="sp-hero">
      <div className="container sp-hero__inner">
        <div className="sp-hero__text">
          <Link to={{ pathname: '/', hash: '#dimensions' }} className="sp-back">
            <ArrowIcon />
            All dimensions
          </Link>
          <p className="sp-eyebrow">{speakingHero.eyebrow}</p>

          <h1 className="sp-hero__title">
            <Words text={speakingHero.headlineStart} />{' '}
            <span className="sp-word sp-word--emph">
              {speakingHero.headlineEmphasis}
              <svg className="sp-underline" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 12 C 60 2, 110 18, 160 8 S 260 4, 297 11" />
              </svg>
            </span>
          </h1>

          <p className="sp-hero__lead">{speakingHero.lead}</p>

          <p className="sp-verbline" aria-hidden={!reduce}>
            <span className="sp-verbline__lead">I like to</span>
            {reduce ? (
              <span className="sp-verbline__static">{verbs.join(' · ')}</span>
            ) : (
              <span className="sp-verbline__slot">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={verbs[i]}
                    className="sp-verbline__word"
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    {verbs[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
            )}
          </p>

          <ul className="sp-themes" aria-label="Themes on this page">
            {speakingHero.themes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="sp-hero__visual" aria-hidden="true">
          <div className="sp-rings">
            <span /> <span /> <span /> <span />
          </div>
          <div className="sp-mic">
            <svg viewBox="0 0 200 200">
              <SymbolArt motif="wave" color="#2b1912" accent="#f7f0e7" strokeWidth={3} />
            </svg>
          </div>
          {BUBBLES.map((b) => (
            <span key={b.text} className={`sp-bubble ${b.className}`}>
              {b.text}
            </span>
          ))}
        </div>
      </div>

      <nav className="container sp-index" aria-label="On this page">
        <Link to={{ hash: '#sp-presentations' }}>Presentations</Link>
        <Link to={{ hash: '#sp-talks' }}>Talks</Link>
        <Link to={{ hash: '#sp-communication' }}>Communication</Link>
        <Link to={{ hash: '#sp-reflections' }}>Reflections</Link>
      </nav>
    </header>
  )
}
