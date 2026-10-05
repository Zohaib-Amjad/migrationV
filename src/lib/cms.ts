import { getPayloadClient } from '@/lib/payload-client'
import type {
  Faq,
  Insight,
  Media,
  Post,
  Service,
  Testimonial,
} from '@/payload-types'

export type FaqPage =
  | 'all'
  | 'home'
  | 'contact'
  | 'services'
  | 'destinations'
  | 'visa-types'

const ASPECT_MAP: Record<string, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[3/2]',
}

export type CmsFaq = {
  id: string | number
  question: string
  answer: string
}

export type CmsTestimonial = {
  id: string | number
  quote: string
  author: string
  role: string
  imageUrl?: string | null
  initial?: string
  avatarBg?: string
  platform?: 'Google' | 'Trustpilot'
  date?: string
}

export type CmsService = {
  id: string | number
  slug: string
  num: string
  title: string
  desc: string
  bullets: string[]
  imageUrl: string
  iconUrl: string | null
  accent?: string
  tint?: string
  category: 'featured' | 'pathway'
  detailContent?: Record<string, any> | null
}

export type CmsCaseStudy = {
  id: string | number
  title: string
  slug: string
  clientName: string
  summary: string
  results: { stat: string; label: string }[]
  imageUrl?: string | null
  storyDetails?: {
    route?: string
    caption?: string
    quote?: string
    prose?: [string, string][]
  } | null
}

export type CmsTeamMember = {
  id: string | number
  name: string
  slug: string
  role: string
  initials: string
  mono: string
  short: string
  group: 'leadership' | 'core'
  facts: [string, string][]
  prose: [string, string][]
}

export type CmsOffice = { id: string | number; city: string; country: string; address: string; phone: string }

export type CmsInsight = {
  id: string | number
  title: string
  desc: string
  imageUrl: string
  aspect: string
  href: string
}

export type CmsPost = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  imageUrl: string | null
  publishedDate: string | null
  content: Post['content']
}

function mediaUrl(media: Media | number | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  const url = media.url
  if (!url) return null

  // Prefer relative paths for next/image localPatterns
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

export async function getFaqs(page?: FaqPage): Promise<CmsFaq[]> {
  try {
    const payload = await getPayloadClient()

    if (page && page !== 'all') {
      const specific = await payload.find({
        collection: 'faqs',
        depth: 0,
        limit: 50,
        sort: 'order',
        where: { page: { equals: page } },
      })
      const shared = await payload.find({
        collection: 'faqs', depth: 0, limit: 50, sort: 'order',
        where: { page: { equals: 'all' } },
      })
      return [...specific.docs, ...shared.docs].map((doc: any) => ({
        id: doc.id,
        question: doc.question,
        answer: doc.answer,
      }))
    }

    const result = await payload.find({
      collection: 'faqs',
      depth: 0,
      limit: 50,
      sort: 'order',
    })

    return result.docs.map((doc: any) => ({
      id: doc.id,
      question: doc.question,
      answer: doc.answer,
    }))
  } catch {
    return []
  }
}

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'testimonials',
      depth: 1,
      limit: 50,
      sort: 'order',
    })

    return result.docs.map((doc: any) => {
      const imageUrl = mediaUrl(doc.image as Media | number | null)
      return {
        id: doc.id,
        quote: doc.quote,
        author: doc.author,
        role: doc.role || '',
        initial: doc.initial || (doc.author ? doc.author[0] : 'S'),
        avatarBg: doc.avatarBg || '#224036',
        platform: doc.platform || 'Google',
        date: doc.date || 'Recent',
        imageUrl,
      }
    })
  } catch {
    return []
  }
}

const DEFAULT_FEATURED_IMAGES: Record<string, string> = {
  'skilled-migration': '/assets/services-v2/skilled-migration.jpg',
  'study-abroad': '/assets/services-v2/study-abroad.jpg',
  'family-sponsorship': '/assets/services-v2/family-sponsorship.jpg',
  'usa-visas': '/assets/services-v2/usa-visas.jpg',
  'europe-visas': '/assets/services-v2/europe-visas.jpg',
}

export async function getServices(
  category?: 'featured' | 'pathway',
): Promise<CmsService[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 50,
      sort: 'order',
      ...(category
        ? { where: { category: { equals: category } } }
        : {}),
    })

    return result.docs.map((doc: any, index: number) => {
      const slug = doc.slug || (doc.title ? doc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '')
      return {
        id: doc.id,
        slug,
        num: doc.numberLabel || `0${index + 1}`,
        title: doc.title,
        desc: doc.description,
        bullets: (doc.bullets || []).map((b: any) => b.text),
        imageUrl:
          mediaUrl(doc.image as Media | number | null) ||
          DEFAULT_FEATURED_IMAGES[slug] ||
          '/assets/services-v2/skilled-migration.jpg',
        iconUrl: mediaUrl(doc.icon as Media | number | null),
        accent: doc.accent || '#0095FF',
        tint: doc.tint || '#DFEDF7',
        category: doc.category || 'featured',
        detailContent: doc.detailContent || null,
      }
    })
  } catch {
    return []
  }
}

export async function getCaseStudies(): Promise<CmsCaseStudy[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'case-studies',
      depth: 1,
      limit: 10,
    })

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      clientName: doc.clientName,
      summary: doc.summary || '',
      results: (doc.results || []).map((r: any) => ({
        stat: r.stat,
        label: r.label,
      })),
      imageUrl: mediaUrl(doc.featuredImage as Media | number | null),
      storyDetails: doc.storyDetails || null,
    }))
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<CmsService | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'services', depth: 1, limit: 1,
      where: { slug: { equals: slug } },
    })
    const doc: any = result.docs[0]
    if (!doc) return null
    const mediaImage = mediaUrl(doc.image as Media | number | null)
    return {
      id: doc.id,
      slug: doc.slug || slug,
      num: doc.numberLabel || '01',
      title: doc.title,
      desc: doc.description || '',
      bullets: (doc.bullets || []).map((b: any) => b.text),
      imageUrl: mediaImage || DEFAULT_FEATURED_IMAGES[slug] || '',
      iconUrl: mediaUrl(doc.icon as Media | number | null),
      accent: doc.accent || '#0095FF',
      tint: doc.tint || '#DFEDF7',
      category: doc.category || 'featured',
      detailContent: doc.detailContent || null,
    }
  } catch {
    return null
  }
}

export async function getTeamMembers(): Promise<CmsTeamMember[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'team-members', depth: 0, limit: 100, sort: 'order' })
    return result.docs as CmsTeamMember[]
  } catch {
    return []
  }
}

export async function getOffices(): Promise<CmsOffice[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'offices', depth: 0, limit: 100, sort: 'order' })
    return result.docs as CmsOffice[]
  } catch {
    return []
  }
}

export async function getInsights(): Promise<CmsInsight[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'insights',
      depth: 1,
      limit: 12,
      sort: 'order',
    })

    return result.docs
      .map((doc: Insight) => {
        const imageUrl = mediaUrl(doc.image as Media | number | null)
        if (!imageUrl) return null

        let href = '/blog'
        if (doc.link && typeof doc.link === 'object' && 'slug' in doc.link) {
          href = `/blog/${doc.link.slug}`
        }

        return {
          id: doc.id,
          title: doc.title,
          desc: doc.description,
          imageUrl,
          aspect: ASPECT_MAP[doc.aspectRatio || 'square'] || 'aspect-square',
          href,
        }
      })
      .filter(Boolean) as CmsInsight[]
  } catch {
    return []
  }
}

export async function getPosts(limit = 20): Promise<CmsPost[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: '-publishedDate',
      where: {
        status: { equals: 'published' },
      },
    })

    return result.docs.map((doc: Post) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || '',
      imageUrl: mediaUrl(doc.featuredImage as Media | number | null),
      publishedDate: doc.publishedDate || null,
      content: doc.content,
    }))
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
    })

    const doc = result.docs[0] as Post | undefined
    if (!doc) return null

    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || '',
      imageUrl: mediaUrl(doc.featuredImage as Media | number | null),
      publishedDate: doc.publishedDate || null,
      content: doc.content,
    }
  } catch {
    return null
  }
}
