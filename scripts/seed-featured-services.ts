/**
 * Replace homepage featured Services in Payload with Section 4 content.
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env scripts/seed-featured-services.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const FEATURED = [
  {
    numberLabel: '[01]',
    title: 'Case Consultancy',
    description:
      'HoF Migration provides you professional, one-on-one evaluations. Our consultants will assess your eligibility to develop a personalized roadmap to choose the ideal immigration or study pathway. We analyze your qualifications to ensure high approval chances right from the start.',
    bullets: [
      'Complete Profile & Eligibility Evaluation',
      'Custom Immigration & Study Roadmap',
      'Document Review & Risk Spotting',
    ],
    order: 1,
  },
  {
    numberLabel: '[02]',
    title: 'Early Appointment Booking',
    description:
      'Priority scheduling assistance for embassy, consulate, and VFS interview slots. We track real-time slot availability to secure early appointments, keeping your application on schedule without unnecessary delays. Our appointment booking services include:',
    bullets: [
      'Priority Biometrics & Embassy Slot Tracking',
      'Fast-Track Appointment Booking Assistance',
      'Emergency & Urgent Travel Appointment Scheduling',
    ],
    order: 2,
  },
  {
    numberLabel: '[03]',
    title: 'Case Migration & Transfer',
    description:
      'Smooth transition support for ongoing visa or immigration cases. Stuck in a complex process or moving your application from another provider? HoF Migration manages your file transfer without losing progress. How we assist with your case transfer:',
    bullets: [
      'Smooth File & Application Transfer to Our Desk',
      'Complete Audit of Existing Case Documents & Status',
      'Error Correction & Embassy Refusal Appeals',
    ],
    order: 3,
  },
  {
    numberLabel: '[04]',
    title: 'Petition Writing & Legal Statements',
    description:
      'Expert drafting of Statements of Purpose (SOP), Letters of Explanation, and legal cover notes built to embassy standards. We write compelling, authentic stories that highlight your strengths and meet strict visa criteria. Key documents we draft for your application:',
    bullets: [
      'Personalized Statement of Purpose (SOP) & Motivation Letters',
      'Visa Refusal Rebuttal & Explanation Letters',
      'Complete Cover Letter & Legal Submission Writing',
    ],
    order: 4,
  },
  {
    numberLabel: '[05]',
    title: 'IELTS & Language Preparation',
    description:
      'Targeted coaching designed to help you score high on the IELTS or PTE exams. Our structured training gives you the language skills needed to boost your migration points and qualify for top university admissions. What our language training covers:',
    bullets: [
      'Focused Academic & General Training Modules',
      'Flexible Online & In-Person Study Schedules',
      'Full Mock Tests with Individual Performance Reviews',
    ],
    order: 5,
  },
] as const

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'services',
    where: { category: { equals: 'featured' } },
    limit: 100,
    depth: 0,
  })

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'services', id: doc.id })
    console.log(`Deleted featured service: ${doc.title} (${doc.id})`)
  }

  for (const item of FEATURED) {
    const created = await payload.create({
      collection: 'services',
      data: {
        title: item.title,
        description: item.description,
        category: 'featured',
        numberLabel: item.numberLabel,
        bullets: item.bullets.map((text) => ({ text })),
        order: item.order,
      },
    })
    console.log(`Created: ${created.numberLabel} ${created.title}`)
  }

  console.log('Done. Featured services seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
