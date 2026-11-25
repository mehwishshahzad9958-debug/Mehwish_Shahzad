import { useRef, useState } from 'react'
import type { BoardItem } from '../../data/creativity'
import { DisciplineArt } from './Illustrations'
import EntryDialog, { type EntryDialogHandle } from './EntryDialog'
import { fallbackRatio, fileLabel, previewUrl } from './filePreview'

/** Width/height of a card's media, used for balancing columns and reserving space. */
export function ratioOf(item: BoardItem): number {
  const c = item.entry.images?.[0]
  if (c?.width && c?.height) return c.width / c.height
  if (c) return 0.8
  if (item.entry.file) return fallbackRatio(item.entry.file)
  return 1
}

/**
 * One pin: the real media with its natural proportions, rounded corners, and the title only on
 * hover or focus. Activating it opens the entry's detail view (story, project, document or lightbox).
 *
 * Media comes from the entry itself: its first photo, or a preview of its file (a PDF's first page, a
 * video's poster). If a file has no preview, a plain file-type tile is shown, never an invented image.
 */
export default function PinCard({ item }: { item: BoardItem }) {
  const dialog = useRef<EntryDialogHandle>(null)
  const { entry } = item
  const cover = entry.images?.[0]
  const fileImg = cover ? undefined : previewUrl(entry.file)
  const [failed, setFailed] = useState(false)
  const [natural, setNatural] = useState<number>()
  const ratio = natural ?? ratioOf(item)
  const showFileImg = fileImg && !failed

  const directUrl = entry.openAs === 'file' ? entry.file?.url : undefined

  const media = (
    <span className="cg-pin__media" style={{ aspectRatio: String(ratio) }}>
      {cover ? (
        <img src={cover.src} alt={cover.alt} loading="lazy" width={cover.width} height={cover.height} />
      ) : showFileImg ? (
        <img
          src={fileImg}
          alt={`${entry.file?.kind === 'pdf' ? 'First page of ' : 'Preview of '}${entry.file?.title ?? entry.title}`}
          loading="lazy"
          onLoad={(e) => setNatural(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
          onError={() => setFailed(true)}
        />
      ) : entry.file ? (
        <span className="cg-tile">
          <span className="cg-tile__badge">{fileLabel(entry.file)}</span>
          <span className="cg-tile__name">{entry.file.title ?? entry.title}</span>
        </span>
      ) : (
        <DisciplineArt id={item.discipline} className="cg-pin__art" />
      )}
      {entry.file?.kind === 'video' && showFileImg && <span className="cg-pin__play" aria-hidden="true" />}
    </span>
  )

  const hasInfo = Boolean(entry.subtitle || entry.meta)
  const info = hasInfo && (
    <span className="cg-pin__info">
      <span className="cg-pin__name">{entry.title}</span>
      {entry.subtitle && <span className="cg-pin__sub">{entry.subtitle}</span>}
      {entry.meta && <span className="cg-pin__meta">{entry.meta}</span>}
    </span>
  )

  // A card that opens its file directly: one plain link, no dialog.
  if (directUrl) {
    return (
      <a className={`cg-pin cg-pin--link cg-pin--${item.discipline}`} href={directUrl} target="_blank" rel="noopener noreferrer" aria-label={`${entry.title}${entry.file ? `, ${fileLabel(entry.file)}` : ''}, opens in a new tab`}>
        {media}
        <span className="cg-pin__open" aria-hidden="true">Open {entry.file ? fileLabel(entry.file) : 'file'} ↗</span>
        {info}
      </a>
    )
  }

  return (
    <>
      <button type="button" className={`cg-pin cg-pin--${item.discipline}`} onClick={() => dialog.current?.open()} aria-haspopup="dialog" aria-label={`${entry.title}, ${item.category}`}>
        {media}
        <span className="cg-pin__veil" aria-hidden="true">
          <span className="cg-pin__title">{entry.title}</span>
          <span className="cg-pin__cat">{item.category}</span>
        </span>
        {info}
        {!hasInfo && <span className="cg-pin__cap">{entry.title}</span>}
      </button>
      <EntryDialog ref={dialog} entry={entry} />
    </>
  )
}
