import { useEffect, useState } from 'react'
import { usePageTitle } from '../../hooks'
import { initialTabs, type FileId } from '../../data/workspace'
import type { OverviewState } from './experience/ExperienceOverview'
import ActivityBar from './components/ActivityBar'
import Explorer from './components/Explorer'
import EditorTabs from './components/EditorTabs'
import EditorWorkspace from './components/EditorWorkspace'
import Terminal from './components/Terminal'
import StatusBar from './components/StatusBar'
import './technical-career.css'

/**
 * Technical & Career: a workspace inspired by a code editor.
 * Explorer + tabs + editor + terminal share one piece of state, so a click, a tab
 * or a terminal command all open files the same way (and never duplicate a tab).
 */
export default function TechnicalCareerPage() {
  usePageTitle('Technical & Career')
  const [tabs, setTabs] = useState<FileId[]>(initialTabs)
  const [active, setActive] = useState<FileId | null>('welcome')
  const [overview, setOverview] = useState<OverviewState>({ employer: 'indus', section: 'overview' })
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [explorerOpen, setExplorerOpen] = useState(() => (typeof window === 'undefined' ? true : window.innerWidth >= 900))

  // On small screens start with a shorter terminal so the editor keeps room.
  useEffect(() => {
    if (window.innerWidth < 600) setTerminalOpen(false)
  }, [])

  const open = (id: FileId) => {
    setTabs((t) => (t.includes(id) ? t : [...t, id]))
    setActive(id)
    if (window.innerWidth < 900) setExplorerOpen(false)
  }

  const close = (id: FileId) => {
    setTabs((t) => {
      const i = t.indexOf(id)
      const next = t.filter((x) => x !== id)
      if (active === id) setActive(next.length ? next[Math.min(i, next.length - 1)] : null)
      return next
    })
  }

  return (
    <div className="tc" data-explorer={explorerOpen ? 'open' : 'closed'}>
      <ActivityBar
        explorerOpen={explorerOpen}
        terminalOpen={terminalOpen}
        onToggleExplorer={() => setExplorerOpen((v) => !v)}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
      />
      {explorerOpen && <Explorer activeId={active} openIds={tabs} onOpen={open} />}
      {explorerOpen && <button type="button" className="tc-scrim" aria-label="Close Explorer" onClick={() => setExplorerOpen(false)} />}
      <div className="tc-main">
        <EditorTabs tabs={tabs} activeId={active} onSelect={setActive} onClose={close} />
        <EditorWorkspace activeId={active} overview={overview} onOverview={setOverview} onOpenFile={open} />
      </div>
      <Terminal open={terminalOpen} onToggle={() => setTerminalOpen((v) => !v)} onOpenFile={open} />
      <StatusBar activeId={active} />
    </div>
  )
}
