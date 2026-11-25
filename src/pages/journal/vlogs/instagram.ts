export type InstagramKind = 'reel' | 'p' | 'tv'

export interface ParsedInstagram {
  kind: InstagramKind
  code: string
  /** Clean public link, opened when a card is clicked. */
  url: string
  /** Embeddable address used by the optional preview dialog. */
  embedUrl: string
  label: string
}

/** Accepts instagram.com/{reel|reels|p|tv}/CODE and /username/{reel|p|tv}/CODE. Returns null otherwise. */
export function parseInstagram(input: string): ParsedInstagram | null {
  let u: URL
  try {
    u = new URL(input.trim())
  } catch {
    return null
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null
  const host = u.hostname.toLowerCase()
  if (host !== 'instagram.com' && host !== 'www.instagram.com') return null
  const parts = u.pathname.split('/').filter(Boolean)
  const i = parts.findIndex((p) => ['reel', 'reels', 'p', 'tv'].includes(p))
  const code = i >= 0 ? parts[i + 1] : undefined
  if (!code || !/^[A-Za-z0-9_-]+$/.test(code)) return null
  const kind: InstagramKind = parts[i] === 'reels' ? 'reel' : (parts[i] as InstagramKind)
  const url = `https://www.instagram.com/${kind}/${code}/`
  return {
    kind,
    code,
    url,
    embedUrl: `${url}embed`,
    label: kind === 'reel' ? 'Instagram reel' : kind === 'tv' ? 'Instagram video' : 'Instagram post',
  }
}
