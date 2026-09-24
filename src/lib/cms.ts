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
  imageUrl: string
}

export type CmsService = {
  id: string | number
  num: string
  title: string
  desc: string
  bullets: string[]
  imageUrl: string
  iconUrl: string | null
  category: 'featured' | 'pathway'
}

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

    // Exact page match only — homepage FAQs (page: home) must not appear elsewhere.
    // Non-home pages with no CMS entries return [] so FaqSection can show dummy FALLBACK_FAQS.
    if (page && page !== 'all') {
      const specific = await payload.find({
        collection: 'faqs',
        depth: 0,
        limit: 50,
        sort: 'order',
        where: { page: { equals: page } },
      })

      return specific.docs.map((doc: Faq) => ({
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
      where: { page: { equals: 'all' } },
    })

    return result.docs.map((doc: Faq) => ({
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

    return result.docs
      .map((doc: Testimonial) => {
        const imageUrl = mediaUrl(doc.image as Media | number | null)
        if (!imageUrl) return null
        return {
          id: doc.id,
          quote: doc.quote,
          author: doc.author,
          role: doc.role || '',
          imageUrl,
        }
      })
      .filter(Boolean) as CmsTestimonial[]
  } catch {
    return []
  }
}

const DEFAULT_FEATURED_IMAGES = [
  '/assets/services-v2/australia.jpg',
  '/assets/services-v2/canada.jpg',
  '/assets/services-v2/uk.jpg',
  '/assets/services-v2/usa.jpg',
  '/assets/services-v2/europe.jpg',
]

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

    return result.docs.map((doc: Service, index: number) => ({
      id: doc.id,
      num: doc.numberLabel || '',
      title: doc.title,
      desc: doc.description,
      bullets: (doc.bullets || []).map((b) => b.text),
      imageUrl:
        mediaUrl(doc.image as Media | number | null) ||
        (doc.category === 'featured'
          ? DEFAULT_FEATURED_IMAGES[index % DEFAULT_FEATURED_IMAGES.length]
          : ''),
      iconUrl: mediaUrl(doc.icon as Media | number | null),
      category: doc.category,
    }))
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
