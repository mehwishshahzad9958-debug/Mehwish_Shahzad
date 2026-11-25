import { githubProfileUrl, projects, type Project } from '../../../data/projects'
import './projects.css'

const hostOf = (url: string) => new URL(url).host

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
const CodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
  </svg>
)

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const titleId = `project-${p.id}`
  return (
    <article className="tcp-card" aria-labelledby={titleId} style={{ animationDelay: `${index * 90}ms` }}>
      <a
        className="tcp-shot"
        href={p.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.title} live (opens in a new tab)`}
      >
        <span className="tcp-shot__bar" aria-hidden="true">
          <i /><i /><i />
          <span>{hostOf(p.liveUrl)}</span>
        </span>
        <img src={p.image} alt={p.imageAlt} width={1389} height={868} loading="lazy" decoding="async" />
      </a>

      <div className="tcp-body">
        <p className="tc-code"><span className="k">// </span>{String(index + 1).padStart(2, '0')} · {p.category}</p>
        <h3 className="tcp-title" id={titleId}>{p.title}</h3>
        <p className="tcp-desc">{p.description}</p>

        <h4 className="tc-h4">My contribution</h4>
        <ul className="tc-list">{p.contribution.map((c) => <li key={c}>{c}</li>)}</ul>

        <h4 className="tc-h4">Built with</h4>
        <ul className="tc-chips" aria-label={`Technologies used in ${p.title}`}>
          {p.stack.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <div className="tcp-actions">
          <a className="tc-btn tcp-link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
            View Live Project <ExternalIcon />
            <span className="tcp-sr"> (opens in a new tab)</span>
          </a>
          {p.repoUrl && (
            <a className="tc-btn tc-btn--ghost tcp-link" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
              <CodeIcon /> View Source Code
              <span className="tcp-sr"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/** The Projects file: a curated set of case-file style cards, driven entirely by data/projects.ts. */
export default function ProjectsView() {
  return (
    <div className="tc-doc tcp-doc">
      <p className="tc-code" aria-hidden="true"><span className="k">// </span>Projects</p>
      <h2 className="tc-title">Projects</h2>
      <p className="tc-lead">
        Websites I have designed and developed. Each one is live: open a project to see it running, or read the code where the repository is public.
      </p>
      <ul className="tc-meta" aria-label="Summary">
        <li>{projects.length} projects</li>
        <li className="is-live">all live</li>
      </ul>

      <div className="tcp">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      <p className="tc-note">
        More work lives on my <a className="tcp-inline" href={githubProfileUrl} target="_blank" rel="noopener noreferrer">GitHub profile<span className="tcp-sr"> (opens in a new tab)</span></a>.
      </p>
    </div>
  )
}
