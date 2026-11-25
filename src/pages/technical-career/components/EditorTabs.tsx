import type { KeyboardEvent } from 'react'
import { files, type FileId } from '../../../data/workspace'
import FileGlyph from './FileGlyph'
import { CloseIcon } from './Icons'

interface Props {
  tabs: FileId[]
  activeId: FileId | null
  onSelect: (id: FileId) => void
  onClose: (id: FileId) => void
}

export const tabDomId = (id: FileId) => `tc-tab-${id}`
export const panelDomId = 'tc-panel'

/** Row of open files. Arrow keys move between tabs; Delete closes the focused tab. */
export default function EditorTabs({ tabs, activeId, onSelect, onClose }: Props) {
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, id: FileId, i: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
      onSelect(next)
      document.getElementById(tabDomId(next))?.focus()
    }
    if (e.key === 'Delete') onClose(id)
  }

  return (
    <div className="tc-tabs" role="tablist" aria-label="Open files">
      {tabs.map((id, i) => (
        <div key={id} className={`tc-tab${activeId === id ? ' is-active' : ''}`}>
          <button
            type="button"
            role="tab"
            id={tabDomId(id)}
            aria-selected={activeId === id}
            aria-controls={panelDomId}
            tabIndex={activeId === id ? 0 : -1}
            className="tc-tab__main"
            onClick={() => onSelect(id)}
            onKeyDown={(e) => onKey(e, id, i)}
          >
            <FileGlyph id={id} />
            <span>{files[id].name}</span>
          </button>
          <button type="button" className="tc-tab__close" aria-label={`Close ${files[id].name}`} onClick={() => onClose(id)}>
            <CloseIcon />
          </button>
        </div>
      ))}
    </div>
  )
}
