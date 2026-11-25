import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { site } from '../data/site'
import type { MotifId } from '../data/categories'
import { symbols, symbolOrder } from '../data/symbols'
import SymbolArt from './SymbolArt'
import './HeroArt.css'

/** Time each symbol stays on screen, in milliseconds. */
const SLOT_MS = 4200

const WORDS = ['Build', 'Create', 'Speak', 'Explore']
const LABELS = site.dimensions

const INK = '#2b1912'
const CREAM = '#fff1e2'

/** One symbol that draws itself in and retracts when `motif` changes. */
function AnimatedSymbol({ motif, transform, accent }: { motif: MotifId; transform: string; accent: string }) {
  return (
    <AnimatePresence>
      <motion.g key={motif} transform={transform}>
        {symbols[motif].main.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={INK}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut', delay: i * 0.12 }}
          />
        ))}
        {symbols[motif].accent.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.5 + i * 0.12 }}
          />
        ))}
      </motion.g>
    </AnimatePresence>
  )
}

/**
 * The hero animation: one continuous line that keeps becoming something new —
 * a laptop (engineer), a paintbrush (creator), a microphone (speaker),
 * a compass (explorer) — then starts over.
 *
 * How it works: `active` says which symbol is showing. A timer moves it along
 * every few seconds. Each line is a <motion.path>; animating `pathLength` from
 * 0 to 1 "draws" it, and from 1 back to 0 makes it retract like a thread.
 */
export default function HeroArt() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % symbolOrder.length)
    }, SLOT_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const motif = symbolOrder[active]
  const hasPortrait = Boolean(site.heroPortrait)

  return (
    <div
      className={`hero-art${site.heroPortrait ? ' hero-art--portrait' : ''}`}
      {...(site.heroPortrait
        ? {}
        : {
            role: 'img',
            'aria-label':
              'An animated line that draws a laptop, a paintbrush, a microphone and a compass, one after another.',
          })}
    >
      <div className="hero-art__blob hero-art__blob--sand" />
      <div className="hero-art__blob hero-art__blob--leaf" />
      <div className="hero-art__circle">
        {site.heroPortrait && (
          <img
            src={site.heroPortrait}
            alt="Portrait of Mehwish Shahzad"
            className="hero-art__portrait"
            width={476}
            height={822}
            fetchPriority="high"
          />
        )}
      </div>

      <svg className="hero-art__svg" viewBox="0 0 520 520" aria-hidden="true">
        {/* Outline ring */}
        <ellipse cx="262" cy="250" rx="214" ry="190" fill="none" stroke="#b5552e" strokeWidth="1" opacity=".5" transform="rotate(-14 262 250)" />

        {/* The thread: draws itself once, then a faint dashed copy keeps drifting. */}
        {!hasPortrait && (
        <motion.path
          d="M-10 410 C 80 330, 150 470, 250 390 S 420 300, 530 370"
          fill="none"
          stroke={CREAM}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0.9 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        )}
        {!hasPortrait && !reduceMotion && (
          <motion.path
            d="M-10 410 C 80 330, 150 470, 250 390 S 420 300, 530 370"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            strokeDasharray="2 12"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -56] }}
            transition={{ duration: 3.5, ease: 'linear', repeat: Infinity }}
          />
        )}

        {!hasPortrait && (
          reduceMotion ? (
            // Reduced motion: show all four symbols at once, perfectly still.
            symbolOrder.map((m, i) => {
              const x = i % 2 === 0 ? 60 : 250
              const y = i < 2 ? 50 : 200
              return (
                <g key={m} transform={`translate(${x} ${y}) scale(1)`}>
                  <SymbolArt motif={m} color={INK} accent={CREAM} />
                </g>
              )
            })
          ) : (
            <AnimatedSymbol motif={motif} transform="translate(82 72) scale(1.78)" accent={CREAM} />
          )
        )}
      </svg>

      {/* With a portrait, the animated line drawing lives in a small badge so it never covers the face. */}
      {hasPortrait && (
        <div className="hero-art__badge" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            {reduceMotion ? (
              <g transform="translate(18 18) scale(.82)">
                <SymbolArt motif={symbolOrder[0]} color={INK} accent="#b5552e" />
              </g>
            ) : (
              <AnimatedSymbol motif={motif} transform="translate(18 18) scale(.82)" accent="#b5552e" />
            )}
          </svg>
        </div>
      )}

      {/* The four script words; the one matching the current symbol is highlighted. */}
      <ul className="hero-art__words" aria-hidden="true">
        {WORDS.map((w, i) => (
          <li key={w} className={!reduceMotion && i === active ? 'is-active' : undefined}>
            {w}
          </li>
        ))}
      </ul>

      <p className="hero-art__label" aria-hidden="true">
        {reduceMotion ? LABELS.join(' · ') : LABELS[active]}
      </p>
    </div>
  )
}
