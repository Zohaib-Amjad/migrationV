import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import {
  ALL_TEAM,
  FAQS,
  HELP_STEPS,
  LEADERSHIP,
  OFFICES,
  REVIEWS,
  SERVICES,
  STORIES,
} from '../src/data/site-content'
import { PAGE_CONTENT_SEED } from '../src/data/page-content'

async function seed() {
  console.log('🌱 Starting Payload CMS database seed...')
  const payload = await getPayload({ config })

  // Import local site assets into Payload Media once. Existing records keep any
  // editor changes; the sourcePath keeps each public URL resolvable.
  console.log('Seeding site media...')
  const publicRoot = path.resolve(process.cwd(), 'public')
  const mediaExtensions = new Set(['.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.webp'])
  const getMediaFiles = async (directory: string): Promise<string[]> => {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    const nested = await Promise.all(
      entries.map((entry) => {
        const fullPath = path.join(directory, entry.name)
        if (entry.isDirectory()) return getMediaFiles(fullPath)
        return mediaExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : []
      }),
    )
    return nested.flat()
  }

  const publicFiles = await getMediaFiles(publicRoot)
  for (const filePath of publicFiles) {
    const sourcePath = `/${path.relative(publicRoot, filePath).split(path.sep).join('/')}`
    const existing = await payload.find({
      collection: 'media',
      where: { sourcePath: { equals: sourcePath } },
      limit: 1,
    })

    if (existing.totalDocs > 0) continue

    const filename = path.basename(filePath, path.extname(filePath))
    const alt = filename.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
    await payload.create({
      collection: 'media',
      data: { sourcePath, alt },
      filePath,
    })
    console.log(`  + Imported ${sourcePath}`)
  }

  // Seed page headings and copy as editable Payload page data. Repeated runs
  // only fill empty page content, leaving editor updates intact.
  console.log('Seeding page content...')
  for (const pageSeed of PAGE_CONTENT_SEED) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageSeed.slug } },
      limit: 1,
    })
    const page = existing.docs[0]

    if (!page) {
      await payload.create({
        collection: 'pages',
        data: {
          title: pageSeed.title,
          slug: pageSeed.slug,
          contentData: pageSeed.contentData,
        },
      })
      console.log(`  + Created page content: ${pageSeed.slug}`)
    } else if (!page.contentData) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { contentData: pageSeed.contentData },
      })
      console.log(`  ~ Added page content: ${pageSeed.slug}`)
    }
  }

  // 1. Seed FAQs
  console.log('Seeding FAQs...')
  for (let i = 0; i < FAQS.length; i++) {
    const faq = FAQS[i]
    const existing = await payload.find({
      collection: 'faqs',
      where: { question: { equals: faq.q } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'faqs',
        data: {
          question: faq.q,
          answer: faq.a,
          page: 'home',
          order: i + 1,
        },
      })
      console.log(`  + Created FAQ: "${faq.q.substring(0, 40)}..."`)
    } else {
      console.log(`  = FAQ already exists: "${faq.q.substring(0, 40)}..."`)
    }
  }

  // 2. Seed Testimonials / Reviews
  console.log('Seeding Testimonials...')
  for (let i = 0; i < REVIEWS.length; i++) {
    const r = REVIEWS[i]
    const existing = await payload.find({
      collection: 'testimonials',
      where: { author: { equals: r.name } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'testimonials',
        data: {
          author: r.name,
          quote: r.text,
          role: r.platform ? `${r.platform} Review` : 'Verified Client',
          initial: r.initial || r.name[0],
          avatarBg: r.avatarBg || '#224036',
          platform: (r.platform as 'Google' | 'Trustpilot') || 'Google',
          date: r.date || 'Recent',
          order: i + 1,
        },
      })
      console.log(`  + Created Testimonial: "${r.name}"`)
    } else {
      console.log(`  = Testimonial already exists: "${r.name}"`)
    }
  }

  // 3. Seed Services
  console.log('Seeding Services...')
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i]
    const serviceMedia = await payload.find({
      collection: 'media',
      where: { sourcePath: { equals: s.image } },
      limit: 1,
    })
    const imageId = serviceMedia.docs[0]?.id
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: s.title } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        data: {
          title: s.title,
          navTitle: s.navName,
          navDescription: s.navDescription,
          slug: s.routeSlug,
          description: s.cardText || s.lede,
          category: 'featured',
          numberLabel: `0${i + 1}`,
          accent: s.accent,
          tint: s.tint,
          ...(imageId ? { image: imageId } : {}),
          bullets: s.chips.map((chip) => ({ text: chip })),
          detailContent: { ...s, helpSteps: HELP_STEPS },
          order: i + 1,
        },
      })
      console.log(`  + Created Service: "${s.title}"`)
    } else {
      const doc = existing.docs[0] as any
      const data: Record<string, unknown> = {}
      if (!doc.slug) data.slug = s.routeSlug
      if (!doc.navTitle) data.navTitle = s.navName
      if (!doc.navDescription) data.navDescription = s.navDescription
      if (!doc.accent) data.accent = s.accent
      if (!doc.tint) data.tint = s.tint
      if (!doc.numberLabel) data.numberLabel = `0${i + 1}`
      if (!doc.image && imageId) data.image = imageId
      if (!doc.bullets?.length) data.bullets = s.chips.map((chip) => ({ text: chip }))
      if (!doc.detailContent) data.detailContent = { ...s, helpSteps: HELP_STEPS }
      if (Object.keys(data).length > 0) {
        await payload.update({ collection: 'services', id: doc.id, data })
        console.log(`  ~ Filled missing service fields: "${s.title}"`)
      } else {
        console.log(`  = Service already complete: "${s.title}"`)
      }
    }
  }

  // 4. Seed Case Studies / Stories
  console.log('Seeding Case Studies...')
  for (let i = 0; i < STORIES.length; i++) {
    const story = STORIES[i]
    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: story.routeSlug } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'case-studies',
        data: {
          title: story.headline,
          slug: story.routeSlug,
          clientName: story.name,
          summary: story.excerpt,
          results: story.facts.map(([label, stat]) => ({
            label,
            stat,
          })),
          storyDetails: {
            route: story.route,
            caption: story.caption,
            quote: story.quote,
            prose: story.prose,
          },
        },
      })
      console.log(`  + Created Case Study: "${story.headline}"`)
    } else {
      const doc = existing.docs[0] as any
      const data: Record<string, unknown> = {}
      if (!doc.storyDetails) {
        data.storyDetails = {
          route: story.route,
          caption: story.caption,
          quote: story.quote,
          prose: story.prose,
        }
      }
      if (!doc.summary) data.summary = story.excerpt
      if (!doc.results?.length) {
        data.results = story.facts.map(([label, stat]) => ({ label, stat }))
      }
      if (Object.keys(data).length > 0) {
        await payload.update({ collection: 'case-studies', id: doc.id, data })
        console.log(`  ~ Filled missing story fields: "${story.headline}"`)
      } else {
        console.log(`  = Case Study already complete: "${story.headline}"`)
      }
    }
  }

  // 5. Seed team profiles used by the About and team detail pages
  console.log('Seeding team members...')
  for (let i = 0; i < ALL_TEAM.length; i++) {
    const person = ALL_TEAM[i]
    const existing = await payload.find({
      collection: 'team-members',
      where: { slug: { equals: person.routeSlug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'team-members',
        data: {
          name: person.name,
          slug: person.routeSlug,
          role: person.role,
          initials: person.initials,
          mono: person.mono,
          short: person.short,
          group: LEADERSHIP.includes(person) ? 'leadership' : 'core',
          facts: person.facts,
          prose: person.prose,
          order: i + 1,
        },
      })
    }
  }

  // 6. Seed contact offices
  console.log('Seeding offices...')
  for (let i = 0; i < OFFICES.length; i++) {
    const office = OFFICES[i]
    const existing = await payload.find({
      collection: 'offices',
      where: { city: { equals: office.city } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'offices',
        data: { ...office, order: i + 1 },
      })
    }
  }

  console.log('✨ Payload CMS Database Seeding Completed Successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
