import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from '../../../components/Icons'
import type { ParsedInstagram } from './instagram'

/**
 * Optional in-page preview. The Instagram iframe is created only after the visitor
 * opens this dialog, so nothing is loaded from Instagram until they ask for it.
 * If it does not load, the link to the original post is always present.
 */
export default function VlogDialog({ item, title, onClose }: { item: ParsedInstagram; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => setSlow(true), 8000)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(t)
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className="vl-dialog"
      aria-label={`Preview: ${title}`}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close() }}
    >
      <div className="vl-dialog__bar">
        <p>{title}</p>
        <button type="button" onClick={() => ref.current?.close()} aria-label="Close preview"><CloseIcon /></button>
      </div>
      <div className="vl-dialog__stage">
        {!loaded && (
          <p className="vl-dialog__wait" role="status">
            {slow ? 'This is taking a while. The preview may be blocked in your browser.' : 'Loading the Instagram preview…'}
          </p>
        )}
        <iframe
          src={item.embedUrl}
          title={`Instagram: ${title}`}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <p className="vl-dialog__foot">
        Preview not working? <a href={item.url} target="_blank" rel="noopener noreferrer">Open it on Instagram</a>
      </p>
    </dialog>
  )
}
