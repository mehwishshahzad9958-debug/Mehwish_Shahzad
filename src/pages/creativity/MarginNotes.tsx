import { marginNotes, marginPrompts } from '../../data/creativity'
import Reveal from '../../components/Reveal'

/** Personal reflections about making things: a corkboard of notes. */
export default function MarginNotes() {
  return (
    <section id="cr-notes" className="cr-notes" aria-labelledby="cr-notes-title">
      <div className="container">
        <Reveal>
          <p className="cr-kicker cr-kicker--light">07 — Reflections</p>
          <h2 id="cr-notes-title" className="cr-notes__title">
            Notes in the <em>margins</em>
          </h2>
          <p className="cr-notes__lead">
            What making things with my hands teaches me, in my own words.
          </p>
        </Reveal>

        {marginNotes.length > 0 ? (
          <ul className="cr-pins">
            {marginNotes.map((n) => (
              <li key={n.title} className="cr-pin">
                <span className="cr-pin__dot" aria-hidden="true" />
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                {n.date && <p className="cr-note">{n.date}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul className="cr-pins">
              {marginPrompts.map((p) => (
                <li key={p} className="cr-pin cr-pin--prompt">
                  <span className="cr-pin__dot" aria-hidden="true" />
                  <p className="cr-note">{p}</p>
                </li>
              ))}
            </ul>
            <p className="cr-notes__empty">Reflections will be pinned here. For now, these are the questions I’m turning over.</p>
          </>
        )}
      </div>
    </section>
  )
}
