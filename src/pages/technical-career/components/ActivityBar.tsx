import { Link } from 'react-router-dom'
import { BackIcon, FilesIcon, TerminalIcon } from './Icons'

interface Props {
  explorerOpen: boolean
  terminalOpen: boolean
  onToggleExplorer: () => void
  onToggleTerminal: () => void
}

/** Narrow icon rail on the far left. */
export default function ActivityBar({ explorerOpen, terminalOpen, onToggleExplorer, onToggleTerminal }: Props) {
  return (
    <nav className="tc-act" aria-label="Workspace">
      <button type="button" className="tc-act__btn" aria-pressed={explorerOpen} aria-label="Explorer" title="Explorer" onClick={onToggleExplorer}>
        <FilesIcon size={22} />
      </button>
      <button type="button" className="tc-act__btn" aria-pressed={terminalOpen} aria-label="Terminal" title="Terminal" onClick={onToggleTerminal}>
        <TerminalIcon size={22} />
      </button>
      <Link to={{ pathname: '/', hash: '#dimensions' }} className="tc-act__btn tc-act__back" aria-label="Back to all dimensions" title="All dimensions">
        <BackIcon size={22} />
      </Link>
    </nav>
  )
}
