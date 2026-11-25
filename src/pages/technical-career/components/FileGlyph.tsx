import { files, type FileId } from '../../../data/workspace'
import { FolderIcon, MdIcon, TsIcon, ViewIcon } from './Icons'

export default function FileGlyph({ id }: { id: FileId }) {
  const k = files[id].kind
  if (k === 'ts') return <TsIcon />
  if (k === 'md') return <MdIcon />
  if (k === 'folder') return <FolderIcon />
  return <ViewIcon />
}
