import Link from 'next/link'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'

import { getPageContent, getServices } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services | HOF Migration',
  description:
    'Explore our five core migration and education services across Canada, Australia, the UK, the US, and Europe.',
}

export default async function ServicesPage() {
  const [cmsServices, contentData] = await Promise.all([getServices(), getPageContent('services')])
  const content = contentData as {
    hero?: { eyebrow?: string; titleLine1?: string; titleLine2?: string; lede?: string; destinations?: string }
    cardCta?: string
  } | null
  const displayServices = cmsServices.map((s) => ({
        slug: s.slug,
        routeSlug: s.slug,
        title: s.title,
        cardText: s.desc,
        image: s.imageUrl,
        alt: s.title,
        tint: s.tint || '#DFEDF7',
        accent: s.accent || '#0095FF',
      }))

  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">{content?.hero?.eyebrow || ''}</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">{content?.hero?.eyebrow || ''}</span>
            <h1 className="page-head__title">
              {content?.hero?.titleLine1 || ''}
              <br />
              {content?.hero?.titleLine2 || ''}
            </h1>
            <p className="page-head__lede">{content?.hero?.lede || ''}</p>
            <div className="page-head__meta">
              <span className="page-head__chip">{displayServices.length} services</span>
              <span className="page-head__chip">{content?.hero?.destinations || ''}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="page-main">
        <section className="section-block">
          <div className="wrap">
            <div className="svc-index">
              {displayServices.map((svc) => (
                <Link
                  key={svc.slug}
                  className="svc-index__card"
                  href={`/services/${svc.routeSlug}`}
                  style={{
                    '--card-bg': svc.tint,
                    '--card-accent': svc.accent,
                  }}
                >
                  <span className="svc-index__media">
                    <img src={svc.image} alt={svc.alt} />
                  </span>
                  <h2 className="svc-index__title">{svc.title}</h2>
                  <p className="svc-index__text">{svc.cardText}</p>
                  <span className="svc-index__link">{content?.cardCta || ''}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ConsultationForm />
        <FeedbackSection />
      </main>
    </div>
  )
}
