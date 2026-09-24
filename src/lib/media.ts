import type { Media } from '@/payload-types'

/** Resolve a Payload media relation (object or ID) to a public URL. */
export function getMediaUrl(
  media: Media | number | string | null | undefined,
  size?: 'thumbnail' | 'medium' | 'large',
): string | null {
  if (!media || typeof media === 'number' || typeof media === 'string') return null

  const url: string | null | undefined =
    size && media.sizes?.[size]?.url ? media.sizes[size].url : media.url

  if (!url) return null

  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url)
      return parsed.pathname + parsed.search
    }
  } catch {
    // keep as-is
  }

  return url
}

export function getMediaAlt(media: Media | number | string | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'number' || typeof media === 'string') return fallback
  return media.alt || fallback
}
