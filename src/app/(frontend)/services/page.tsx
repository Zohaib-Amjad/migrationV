import Link from 'next/link'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { SERVICES } from '@/data/site-content'

export const metadata: Metadata = {
  title: 'Services | HOF Migration',
  description:
    'Explore our five core migration and education services across Canada, Australia, the UK, the US, and Europe.',
}

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Services</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">Services</span>
            <h1 className="page-head__title">
              Immigration and
              <br />
              education advisory services
            </h1>
            <p className="page-head__lede">
              Five services, each built around a different question: are you eligible, where are you
              truly competitive, and what the path looks like once a decision is made.
            </p>
            <div className="page-head__meta">
              <span className="page-head__chip">5 services</span>
              <span className="page-head__chip">Canada &bull; Australia &bull; UK &bull; US &bull; Europe</span>
            </div>
          </div>
        </div>
      </div>

      <main className="page-main">
        <section className="section-block">
          <div className="wrap">
            <div className="svc-index">
              {SERVICES.map((svc) => (
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
                  <span className="svc-index__link">See how we can help</span>
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
