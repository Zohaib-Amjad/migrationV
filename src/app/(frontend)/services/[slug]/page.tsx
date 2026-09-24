import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { SERVICES, HELP_STEPS } from '@/data/site-content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.flatMap((svc) => [
    { slug: svc.routeSlug },
    ...(svc.slug && svc.slug !== svc.routeSlug ? [{ slug: svc.slug }] : []),
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = SERVICES.find((s) => s.routeSlug === slug || s.slug === slug)
  if (!svc) return { title: 'Service Not Found | HOF Migration' }

  return {
    title: `${svc.title} | HOF Migration`,
    description: svc.lede,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const svc = SERVICES.find((s) => s.routeSlug === slug || s.slug === slug)

  if (!svc) {
    notFound()
  }

  return (
    <div
      className="page-shell service-page"
      style={{ '--svc-accent': svc.accent, '--svc-tint': svc.tint } as CSSProperties}
    >
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">{svc.short}</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">Service</span>
            <h1 className="page-head__title">{svc.title}</h1>
            <p className="page-head__lede">{svc.lede}</p>
            <div className="page-head__meta">
              {svc.chips.map((chip, i) => (
                <span key={i} className="page-head__chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="page-main">
        <section className="section-block">
          <div className="wrap">
            <div className="block-head">
              <span className="block-head__num">01</span>
              <h2 className="block-head__title">Visa categories and routes</h2>
              <p className="block-head__note">
                The pathways covered by this service, arranged the way regulators and government
                programs tend to frame them.
              </p>
            </div>

            <div className="svc-split">
              <div className="svc-tree">
                {svc.groups.map((group, idx) => (
                  <div key={idx} className="svc-group">
                    <div className="svc-group__head">
                      <span className="svc-group__flag">{group.code}</span>
                      <h3 className="svc-group__name">{group.name}</h3>
                      <span className="svc-group__count">{group.nodes.length} routes</span>
                    </div>
                    <div className="svc-branch">
                      {group.nodes.map(([title, desc, tag], nIdx) => (
                        <div key={nIdx} className="svc-node">
                          <b>{title}</b>
                          <span>{desc}</span>
                          <span className="svc-node__tag">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <figure className="svc-media">
                <img src={svc.image} alt={svc.alt} />
                <figcaption className="svc-media__plate">
                  <b>{svc.plate[0]}</b>
                  <span>{svc.plate[1]}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section-block svc-types-section">
          <div className="wrap">
            <div className="block-head">
              <span className="block-head__num">02</span>
              <h2 className="block-head__title">What each visa type means</h2>
              <p className="block-head__note">
                Clear, practical explanations of the routes above and the conditions attached to
                them.
              </p>
            </div>

            <div className="svc-types">
              {svc.types.map(([code, name, desc, facts], tIdx) => (
                <article key={tIdx} className="svc-type">
                  <span className="svc-type__code">{code}</span>
                  <h3 className="svc-type__name">{name}</h3>
                  <p className="svc-type__text">{desc}</p>
                  <dl className="svc-type__facts">
                    {facts.map(([label, val], fIdx) => (
                      <div key={fIdx} className="svc-type__fact">
                        <dt>{label}</dt>
                        <dd>{val}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="wrap">
            <div className="block-head">
              <span className="block-head__num">03</span>
              <h2 className="block-head__title">How we can help</h2>
              <p className="block-head__note">
                The same process for every case, from the first assessment to the year after a
                decision.
              </p>
            </div>

            <div className="svc-help">
              {HELP_STEPS.map(([stepTitle, stepDesc], sIdx) => (
                <article key={sIdx} className="svc-help__step">
                  <h3 className="svc-help__title">{stepTitle}</h3>
                  <p className="svc-help__text">{stepDesc}</p>
                </article>
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
