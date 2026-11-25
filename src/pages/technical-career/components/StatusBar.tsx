import { files, type FileId } from '../../../data/workspace'

export default function StatusBar({ activeId }: { activeId: FileId | null }) {
  return (
    <footer className="tc-status">
      <span>MEHWISH.DEV</span>
      <span className="tc-status__sp" />
      <span>{activeId ? files[activeId].language : 'No file open'}</span>
      <span className="tc-status__hide">UTF-8</span>
    </footer>
  )
}
