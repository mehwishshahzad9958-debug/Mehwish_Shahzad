import type { CreativeFile } from '../../data/creativity'

/**
 * Preview helpers kept apart from the components so file metadata (data/creativity.ts) and
 * rendering stay separate. Nothing here guesses a URL: it only reads or transforms URLs you supplied.
 */

const CLOUDINARY_IMAGE_PDF = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)\.pdf(\?.*)?$/i

/**
 * Image URL of a file's real preview, or undefined when none can be produced.
 * - an explicit, verified `thumbnail` / `poster` always wins;
 * - a PDF served by Cloudinary as image/upload can render its first page (`pg_1`) as a JPEG;
 * - anything else has no generated preview and shows the file-type tile.
 */
export function previewUrl(file?: CreativeFile): string | undefined {
  if (!file) return undefined
  if (file.kind === 'video') return file.poster
  if (file.thumbnail) return file.thumbnail
  if (file.kind === 'pdf' && file.url) {
    const m = CLOUDINARY_IMAGE_PDF.exec(file.url)
    if (m) return `${m[1]}pg_1,f_jpg,w_900/${m[2]}.jpg`
  }
  return undefined
}

/** Width / height of a card's media when no image size is known. A PDF page is portrait. */
export function fallbackRatio(file?: CreativeFile): number {
  if (!file) return 1
  if (file.kind === 'pdf') return file.width && file.height ? file.width / file.height : 0.72
  if (file.kind === 'video') return file.width && file.height ? file.width / file.height : 1.78
  return 0.8
}

export function fileLabel(file: CreativeFile): string {
  if (file.kind === 'pdf') return 'PDF'
  if (file.kind === 'video') return 'Video'
  return file.label ?? 'File'
}
