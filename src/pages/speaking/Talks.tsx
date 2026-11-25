import { talkFields, talks, type Talk } from '../../data/speaking'
import Reveal from '../../components/Reveal'
import { ArrowIcon } from '../../components/Icons'

function formatDate(d: string) {
  // ISO dates are shown nicely; free text ('Spring 2026') is left as written.
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(d)) {
    const dt = new Date(d + (d.length === 7 ? '-01' : '') + 'T00:00:00')
    return dt.toLocaleDateString('en-GB', d.length === 7 ? { month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' })
  }
  return d
}

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <li>
      <article className="sp-talk">
        <div className="sp-talk__media">
          {talk.image ? (
            <img src={talk.image} alt={talk.imageAlt ?? ''} loading="lazy" />
          ) : (
            <span aria-hidden="true" className="sp-talk__spot" />
          )}
        </div>
        <div className="sp-talk__body">
          <p className="sp-meta">
            <time dateTime={talk.date}>{formatDate(talk.date)}</time> · {talk.event}
          </p>
          <h3>{talk.title}</h3>
          <p className="sp-talk__topic">{talk.topic}</p>
          <p>{talk.description}</p>
          <div className="sp-talk__links">
            {talk.recordingUrl && (
              <a className="sp-link" href={talk.recordingUrl} target="_blank" rel="noopener noreferrer">
                Watch the recording <ArrowIcon />
              </a>
            )}
            {talk.presentationUrl && (
              <a className="sp-link" href={talk.presentationUrl} target="_blank" rel="noopener noreferrer">
                View the presentation <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </article>
    </li>
  )
}

/** Section 3: the speaking portfolio. Empty until real sessions are added to data/speaking.ts. */
export default function Talks() {
  return (
    <section id="sp-talks" className="sp-section sp-talks" aria-labelledby="sp-talks-title">
      <div className="container">
        <Reveal>
          <p className="sp-eyebrow">02 — Speak</p>
          <h2 id="sp-talks-title" className="sp-h2">
            Talks &amp; <em>speaking sessions</em>
          </h2>
          <p className="sp-section__lead">
            A record of the sessions I have given: what I spoke about, where, and the material that goes with it.
          </p>
        </Reveal>

        {talks.length > 0 ? (
          <ul className="sp-talklist">
            {talks.map((t) => (
              <TalkCard key={t.title + t.date} talk={t} />
            ))}
          </ul>
        ) : (
          <div className="sp-stage">
            <svg className="sp-stage__art" viewBox="0 0 240 200" aria-hidden="true">
              <path className="sp-stage__beam" d="M120 0 L40 190 H200 Z" />
              <path d="M50 180 H190" />
              <path d="M120 180 V120" />
              <rect x="96" y="104" width="48" height="16" rx="3" />
              <path d="M120 104 V70" />
              <rect x="110" y="42" width="20" height="30" rx="10" />
            </svg>
            <div className="sp-stage__text">
              <h3>The stage is being set.</h3>
              <p className="sp-empty__msg">
                Talks will be listed here once there are real sessions to share. Nothing is added until it is confirmed.
              </p>
              <p className="sp-stage__label">Each entry will show</p>
              <ul className="sp-fields">
                {talkFields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
