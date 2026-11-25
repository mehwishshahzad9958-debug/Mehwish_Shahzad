import { getExperience, type ExperienceId } from '../../../data/experience'
import { AchievementsSection, LearningsSection, ProjectsSection } from './ExperienceSections'
import ExperienceGallery from './ExperienceGallery'

const sections = [
  { id: 'overview', n: '01', label: 'Overview' },
  { id: 'role', n: '02', label: 'Career progression' },
  { id: 'resp', n: '03', label: 'Responsibilities' },
  { id: 'projects', n: '04', label: 'Projects and case studies' },
  { id: 'ach', n: '05', label: 'Achievements and impact' },
  { id: 'learn', n: '06', label: 'Key learnings' },
  { id: 'gallery', n: '07', label: 'Experience Gallery' },
] as const

/** The detailed view opened by "Indus Towers.ts" and "Peltown.ts". */
export default function ExperienceDetail({ id }: { id: ExperienceId }) {
  const exp = getExperience(id)!
  const jump = (sid: string) => {
    const el = document.getElementById(`${id}-${sid}`)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el?.focus({ preventScroll: true })
  }
  const sec = (sid: string, n: string, label: string, body: React.ReactNode) => (
    <section key={sid} id={`${id}-${sid}`} tabIndex={-1} className="tc-sec" aria-labelledby={`${id}-${sid}-h`}>
      <h3 id={`${id}-${sid}-h`}><span>{n}</span>{label}</h3>
      {body}
    </section>
  )

  return (
    <div className="tc-doc">
      <p className="tc-code" aria-hidden="true">
        <span className="k">export const</span> <span className="v">{id}</span> = {'{'}
      </p>
      <h2 className="tc-title">{exp.company}</h2>
      <p className="tc-role">{exp.role}</p>
      <ul className="tc-meta">
        {exp.location && <li>{exp.location}</li>}
        <li>{exp.period}</li>
        {exp.current && <li className="is-live">Current</li>}
      </ul>
      <nav className="tc-outline" aria-label={`${exp.company} sections`}>
        {sections.map((s) => (
          <button key={s.id} type="button" onClick={() => jump(s.id)}>{s.label}</button>
        ))}
      </nav>

      {sec('overview', '01', 'Overview', <p className="tc-lead">{exp.summary}</p>)}
      {sec('role', '02', exp.progression.length ? 'Career progression' : 'Role context',
        exp.progression.length > 0 ? (
          <ol className="tc-path" aria-label="Career progression">
            {exp.progression.map((s, i) => (
              <li key={s.label}><span className="tc-path__dot" aria-hidden="true">{i + 1}</span><strong>{s.label}</strong>{s.note && <small>{s.note}</small>}</li>
            ))}
          </ol>
        ) : (
          <p className="tc-note">{exp.roleContext}</p>
        ))}
      {sec('resp', '03', 'Responsibilities', (
        <>
          <ul className="tc-list">{exp.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
          <h4 className="tc-h4">Tools used</h4>
          {exp.tools.length ? <ul className="tc-chips">{exp.tools.map((t) => <li key={t}>{t}</li>)}</ul> : <p className="tc-note">No technologies listed yet.</p>}
        </>
      ))}
      {sec('projects', '04', 'Projects and case studies', <ProjectsSection exp={exp} />)}
      {sec('ach', '05', 'Achievements and impact', <AchievementsSection exp={exp} />)}
      {sec('learn', '06', 'Key learnings', <LearningsSection exp={exp} />)}
      {sec('gallery', '07', 'Experience Gallery', <ExperienceGallery exp={exp} />)}
      <p className="tc-code" aria-hidden="true">{'}'}</p>
    </div>
  )
}
