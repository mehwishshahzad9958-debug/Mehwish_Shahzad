import {
  communicationPrinciples,
  experiments,
  knowledgeInterests,
  topicsToExplain,
} from '../../data/speaking'
import Reveal from '../../components/Reveal'
import { ArrowIcon } from '../../components/Icons'

/** Section 4: how I communicate, what I like explaining, and experiments. */
export default function Communication() {
  return (
    <section id="sp-communication" className="sp-section sp-comm" aria-labelledby="sp-comm-title">
      <div className="container">
        <Reveal>
          <p className="sp-eyebrow sp-eyebrow--dark">03 — Explain</p>
          <h2 id="sp-comm-title" className="sp-h2">
            Communication &amp; <em>ideas</em>
          </h2>
          <p className="sp-section__lead">
            Clear explanations are made, not found. This is how I try to make them.
          </p>
        </Reveal>

        <h3 className="sp-h3">How I explain complex ideas</h3>
        <ol className="sp-principles">
          {communicationPrinciples.map((p, i) => (
            <li key={p.number}>
              <Reveal delay={i * 0.07}>
                <span className="sp-principle__num" aria-hidden="true">
                  {p.number}
                </span>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="sp-twocol">
          <div>
            <h3 className="sp-h3">Topics I enjoy explaining</h3>
            <ul className="sp-pills">
              {topicsToExplain.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sp-h3">Knowledge-sharing interests</h3>
            <ul className="sp-pills sp-pills--alt">
              {knowledgeInterests.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="sp-h3">Communication experiments</h3>
        {experiments.length > 0 ? (
          <ul className="sp-experiments">
            {experiments.map((e) => (
              <li key={e.title}>
                {e.status && <p className="sp-meta">{e.status}</p>}
                <h4>{e.title}</h4>
                <p>{e.description}</p>
                {e.href && (
                  <a className="sp-link sp-link--dark" href={e.href} target="_blank" rel="noopener noreferrer">
                    See the experiment <ArrowIcon />
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="sp-quiet">
            Experiments, like explaining one idea three different ways, will be logged here as I run them.
          </p>
        )}
      </div>
    </section>
  )
}
