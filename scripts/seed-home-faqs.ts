/**
 * Replace homepage FAQs in Payload (page = home).
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env scripts/seed-home-faqs.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import { HOME_FAQS } from '../src/data/fallbacks/faqs'

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'faqs',
    where: { page: { equals: 'home' } },
    limit: 100,
    depth: 0,
  })

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'faqs', id: doc.id })
    console.log(`Deleted home FAQ: ${doc.question}`)
  }

  for (const [index, faq] of HOME_FAQS.entries()) {
    const created = await payload.create({
      collection: 'faqs',
      data: {
        question: faq.question,
        answer: faq.answer,
        page: 'home',
        order: index + 1,
      },
    })
    console.log(`Created [${created.order}]: ${created.question}`)
  }

  console.log('Done. Homepage FAQs seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
