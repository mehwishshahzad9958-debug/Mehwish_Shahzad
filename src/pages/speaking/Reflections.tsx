import { reflectionPrompts, reflections } from '../../data/speaking'
import Reveal from '../../components/Reveal'

function fmt(d: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  return d
}

/** Section 5: a journal. Entries open and close in place. */
export default function Reflections() {
  return (
    <section id="sp-reflections" className="sp-section sp-refl" aria-labelledby="sp-refl-title">
      <div className="container sp-refl__inner">
        <Reveal className="sp-refl__head">
          <p className="sp-eyebrow sp-eyebrow--dark">04 — Reflect</p>
          <h2 id="sp-refl-title" className="sp-h2">
            Speaking <em>reflections</em>
          </h2>
          <p className="sp-section__lead">
            Notes from the other side of the microphone: what I learned, what I would change, and what stayed with me.
          </p>
        </Reveal>

        {reflections.length > 0 ? (
          <ul className="sp-journal">
            {reflections.map((r) => (
              <li key={r.title + r.date}>
                <details className="sp-entry">
                  <summary>
                    <span className="sp-meta">
                      <time dateTime={r.date}>{fmt(r.date)}</time>
                    </span>
                    <span className="sp-entry__title">{r.title}</span>
                    <span className="sp-entry__summary">{r.summary}</span>
                    <span className="sp-entry__more" aria-hidden="true" />
                  </summary>
                  {r.body && (
                    <div className="sp-entry__body">
                      {r.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
                  {r.tags && (
                    <ul className="sp-tags">
                      {r.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <div className="sp-notebook">
            <p className="sp-notebook__title">The first page is still blank.</p>
            <p className="sp-empty__msg">Reflections will be written here. Until then, these are the questions I’m carrying:</p>
            <ul className="sp-prompts">
              {reflectionPrompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
