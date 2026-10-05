import { HomePageClient } from './HomePageClient'
import { getFaqs, getServices, getTestimonials, getCaseStudies } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let faqs: any[] = []
  let services: any[] = []
  let testimonials: any[] = []
  let caseStudies: any[] = []

  try {
    const results = await Promise.allSettled([
      getFaqs('home'),
      getServices('featured'),
      getTestimonials(),
      getCaseStudies(),
    ])

    if (results[0].status === 'fulfilled') faqs = results[0].value
    if (results[1].status === 'fulfilled') services = results[1].value
    if (results[2].status === 'fulfilled') testimonials = results[2].value
    if (results[3].status === 'fulfilled') caseStudies = results[3].value
  } catch (error) {
    console.error('HomePage CMS fetch error:', error)
  }

  return (
    <HomePageClient
      faqs={faqs}
      services={services}
      testimonials={testimonials}
      caseStudies={caseStudies}
    />
  )
}

