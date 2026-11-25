import { useState } from 'react'
import { categories } from '../../../data/categories'
import { files, placeholders, type FileId } from '../../../data/workspace'
import ExperienceOverview, { type OverviewState } from '../experience/ExperienceOverview'
import ExperienceDetail from '../experience/ExperienceDetail'
import ProjectsView from '../projects/ProjectsView'
import { EditorHost } from './EditorHost'
import { panelDomId, tabDomId } from './EditorTabs'

interface Props {
  activeId: FileId | null
  overview: OverviewState
  onOverview: (s: OverviewState) => void
  onOpenFile: (id: FileId) => void
}

const intro = categories.find((c) => c.slug === 'technical-career')!.intro

function Welcome({ onOpenFile }: { onOpenFile: (id: FileId) => void }) {
  return (
    <div className="tc-doc">
      <p className="tc-code" aria-hidden="true"><span className="k">// </span>Welcome</p>
      <h1 className="tc-title">Technical &amp; Career</h1>
      <p className="tc-lead">{intro}</p>
      <h2 className="tc-h4">Start here</h2>
      <div className="tc-quick">
        <button type="button" onClick={() => onOpenFile('experience')}>Experience overview</button>
        <button type="button" onClick={() => onOpenFile('indus')}>Indus Towers.ts</button>
        <button type="button" onClick={() => onOpenFile('peltown')}>Peltown.ts</button>
        <button type="button" onClick={() => onOpenFile('projects')}>Projects</button>
      </div>
      <p className="tc-note">Prefer typing? Use the terminal below and run <code>help</code>.</p>
    </div>
  )
}

function Placeholder({ id }: { id: FileId }) {
  const p = placeholders[id]
  return (
    <div className="tc-doc">
      <p className="tc-code" aria-hidden="true"><span className="k">// </span>{files[id].name}</p>
      <h2 className="tc-title">{p?.title}</h2>
      <div className="tc-empty">
        <p className="tc-empty__title">Nothing here yet</p>
        <p>{p?.message}</p>
      </div>
    </div>
  )
}

/** Shows whichever file is active. The pane element is shared so the photo viewer can open inside it. */
export default function EditorWorkspace({ activeId, overview, onOverview, onOpenFile }: Props) {
  const [pane, setPane] = useState<HTMLDivElement | null>(null)
  let view = (
    <div className="tc-doc">
      <div className="tc-empty">
        <p className="tc-empty__title">No file open</p>
        <p>Pick a file in the Explorer, or type a command in the terminal.</p>
      </div>
    </div>
  )
  if (activeId === 'welcome') view = <Welcome onOpenFile={onOpenFile} />
  else if (activeId === 'experience') view = <ExperienceOverview state={overview} onChange={onOverview} onOpenFile={onOpenFile} />
  else if (activeId === 'indus' || activeId === 'peltown') view = <ExperienceDetail key={activeId} id={activeId} />
  else if (activeId === 'projects') view = <ProjectsView />
  else if (activeId) view = <Placeholder id={activeId} />

  return (
    <div className="tc-pane" ref={setPane}>
      <EditorHost.Provider value={pane}>
        <div
          className="tc-editor"
          id={panelDomId}
          role="tabpanel"
          aria-labelledby={activeId ? tabDomId(activeId) : undefined}
          tabIndex={0}
        >
          {view}
        </div>
      </EditorHost.Provider>
    </div>
  )
}
