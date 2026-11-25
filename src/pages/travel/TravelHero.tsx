import { Link } from 'react-router-dom'
import { travelHero } from '../../data/travel'
import { ArrowIcon } from '../../components/Icons'
import { journalPaths } from '../journal/paths'
import { Postmark, Stamp, StampScene } from './Decor'

/** Illustrated desk: a folded map, a postcard and a blank boarding pass. Nothing here claims a real trip. */
export default function TravelHero() {
  return (
    <header className="tj-hero">
      <div className="container tj-hero__inner">
        <div className="tj-hero__text">
          <Link to={journalPaths.root} className="tj-back">
            <ArrowIcon />
            The Journal
          </Link>
          <p className="tj-kicker">{travelHero.eyebrow}</p>
          <h1 className="tj-hero__title">
            {travelHero.beats.map((b, i) => (
              <span key={b} className={`tj-beat tj-beat--${i}`}>
                {b}{' '}
              </span>
            ))}
          </h1>
          <p className="tj-hero__lead">{travelHero.lead}</p>
          <ul className="tj-index" aria-label="On this page">
            <li>
              <Link to={{ hash: '#tj-timeline' }}>The timeline</Link>
            </li>
            <li>
              <Link to={{ hash: '#tj-things' }}>Little things</Link>
            </li>
            <li>
              <Link to={{ hash: '#tj-pocket' }}>Pocket of paper</Link>
            </li>
            <li>
              <Link to={{ hash: '#tj-sketchbook' }}>Sketchbook</Link>
            </li>
          </ul>
        </div>

        <div className="tj-desk" aria-hidden="true">
          <div className="tj-foldmap">
            <svg viewBox="0 0 300 220" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M100 0 V220 M200 0 V220" strokeOpacity=".2" />
              <path d="M24 70 C50 40 96 44 120 70 C140 92 120 124 86 128 C50 132 14 104 24 70 Z" fill="var(--tj-olive)" fillOpacity=".25" />
              <path d="M180 40 C220 20 268 40 274 80 C280 120 240 140 206 126 C176 112 160 60 180 40 Z" fill="var(--tj-blue)" fillOpacity=".2" />
              <path className="tj-route" d="M50 90 C90 60 120 130 160 110 S230 60 252 96" stroke="var(--tj-red)" strokeWidth="3" strokeDasharray="2 9" />
              <path d="M240 150 l14 14 M254 150 l-14 14" stroke="var(--tj-red)" strokeWidth="3.5" />
            </svg>
          </div>

          <div className="tj-postcard">
            <div className="tj-postcard__msg">
              <span>wish you were here</span>
              <i />
              <i />
              <i />
            </div>
            <div className="tj-postcard__addr">
              <Stamp className="tj-postcard__stamp">
                <StampScene />
              </Stamp>
              <Postmark top="— — —" bottom="— — — —" className="tj-postcard__mark" />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="tj-ticket">
            <div className="tj-ticket__main">
              <p className="tj-ticket__band">Boarding pass · Admit one</p>
              <dl>
                <div>
                  <dt>From</dt>
                  <dd>— — — —</dd>
                </div>
                <div>
                  <dt>To</dt>
                  <dd>— — — —</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>— — —</dd>
                </div>
              </dl>
            </div>
            <div className="tj-ticket__stub">
              <span className="tj-ticket__bars" />
            </div>
          </div>
        </div>
      </div>
      <div className="tj-airmail" aria-hidden="true" />
    </header>
  )
}
