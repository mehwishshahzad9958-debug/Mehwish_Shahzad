import { useState } from 'react'
import { tree, files, type FileId } from '../../../data/workspace'
import FileGlyph from './FileGlyph'
import { ChevronIcon, FolderIcon } from './Icons'

interface Props {
  activeId: FileId | null
  openIds: FileId[]
  onOpen: (id: FileId) => void
}

/** Interactive file tree. Clicking a file opens (or focuses) its tab. */
export default function Explorer({ activeId, openIds, onOpen }: Props) {
  const [expanded, setExpanded] = useState(true)
  const [root, setRoot] = useState(true)

  const row = (id: FileId, label: string, depth: number) => (
    <li key={id} role="none">
      <button
        type="button"
        role="treeitem"
        aria-selected={activeId === id}
        className={`tc-tree__row${activeId === id ? ' is-active' : ''}${openIds.includes(id) ? ' is-open' : ''}`}
        style={{ paddingLeft: 12 + depth * 16 }}
        onClick={() => onOpen(id)}
      >
        <FileGlyph id={id} />
        <span>{label}</span>
      </button>
    </li>
  )

  return (
    <aside className="tc-side" aria-label="Explorer">
      <p className="tc-side__title">Explorer</p>
      <button type="button" className="tc-side__root" aria-expanded={root} onClick={() => setRoot(!root)}>
        <ChevronIcon open={root} />
        MEHWISH.DEV
      </button>
      {root && (
        <ul className="tc-tree" role="tree" aria-label="MEHWISH.DEV">
          {tree.map((n) =>
            n.children ? (
              <li key={n.id} role="none">
                <div className="tc-tree__folder">
                  <button type="button" className="tc-tree__row" role="treeitem" aria-expanded={expanded} aria-selected={activeId === n.id} style={{ paddingLeft: 12 }} onClick={() => { setExpanded(!expanded); onOpen(n.id) }}>
                    <ChevronIcon open={expanded} />
                    <FolderIcon open={expanded} />
                    <span>{n.label}</span>
                  </button>
                </div>
                {expanded && (
                  <ul role="group">
                    {n.children.map((c) => row(c, files[c].name, 2))}
                  </ul>
                )}
              </li>
            ) : (
              row(n.id, n.label, 1)
            ),
          )}
        </ul>
      )}
    </aside>
  )
}
