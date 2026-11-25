import type { Experience } from '../../../data/experience'

export function Empty({ title, children }: { title: string; children: string }) {
  return (
    <div className="tc-empty">
      <p className="tc-empty__title">{title}</p>
      <p>{children}</p>
    </div>
  )
}

export function StorySection({ exp }: { exp: Experience }) {
  return (
    <>
      <p className="tc-lead">{exp.summary}</p>
      {exp.progression.length > 0 ? (
        <ol className="tc-path" aria-label="Career progression">
          {exp.progression.map((s, i) => (
            <li key={s.label}>
              <span className="tc-path__dot" aria-hidden="true">{i + 1}</span>
              <strong>{s.label}</strong>
              {s.note && <small>{s.note}</small>}
            </li>
          ))}
        </ol>
      ) : (
        exp.roleContext && <p className="tc-note">{exp.roleContext}</p>
      )}
    </>
  )
}

const caseFields: [keyof import('../../../data/experience').CaseStudy, string][] = [
  ['problem', 'Problem or objective'],
  ['responsibility', 'My responsibility'],
  ['approach', 'Approach and execution'],
  ['stakeholders', 'Stakeholders involved'],
  ['outcome', 'Outcome and impact'],
]

export function ProjectsSection({ exp }: { exp: Experience }) {
  if (exp.projects.length === 0) {
    return <Empty title="Case studies coming soon">Projects from this role will be written up here: the problem, my part, the approach, who was involved and the outcome.</Empty>
  }
  return (
    <div className="tc-cases">
      {exp.projects.map((p) => (
        <article key={p.title} className="tc-case">
          <h4>{p.title}</h4>
          <dl>
            {caseFields.map(([k, label]) => {
              const v = p[k]
              const text = Array.isArray(v) ? v.join(', ') : v
              return (
                <div key={k}>
                  <dt>{label}</dt>
                  <dd className={text ? '' : 'is-missing'}>{text || 'Not added yet'}</dd>
                </div>
              )
            })}
          </dl>
        </article>
      ))}
    </div>
  )
}

export function AchievementsSection({ exp }: { exp: Experience }) {
  if (exp.achievements.length === 0) {
    return <Empty title="Nothing listed yet">Outcomes and measurable results will appear here once they are confirmed.</Empty>
  }
  const figs = exp.achievements.filter((a) => a.figure)
  return (
    <>
      {figs.length > 0 && (
        <ul className="tc-figs">
          {figs.map((a) => (
            <li key={a.figure!.label}><b>{a.figure!.value}</b><span>{a.figure!.label}</span></li>
          ))}
        </ul>
      )}
      <ul className="tc-list">{exp.achievements.map((a) => <li key={a.text}>{a.text}</li>)}</ul>
    </>
  )
}

export function LearningsSection({ exp }: { exp: Experience }) {
  if (exp.learnings.length === 0) {
    return <Empty title="Reflections to come">Key learnings from this role will be added here.</Empty>
  }
  return <ul className="tc-list">{exp.learnings.map((l) => <li key={l}>{l}</li>)}</ul>
}
