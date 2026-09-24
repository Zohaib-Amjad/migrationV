import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { ALL_TEAM } from '@/data/site-content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ALL_TEAM.map((person) => ({
    slug: person.routeSlug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const person = ALL_TEAM.find((p) => p.routeSlug === slug || p.slug === slug)
  if (!person) return { title: 'Team Member Not Found | HOF Migration' }

  return {
    title: `${person.name} — ${person.role} | HOF Migration`,
    description: person.short,
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params
  const person = ALL_TEAM.find((p) => p.routeSlug === slug || p.slug === slug)

  if (!person) {
    notFound()
  }

  return (
    <div className="page-shell">
      {/* Top Banner Band */}
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <Link href="/about#team">Our Team</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">{person.name}</span>
          </nav>

          <div className="person-page__head">
            <span
              className="person__mono"
              style={{ '--mono': person.mono }}
              aria-hidden="true"
            >
              {person.initials}
            </span>
            <div className="page-head">
              <span className="page-head__eyebrow">{person.role}</span>
              <h1 className="page-head__title">{person.name}</h1>
              <p className="page-head__lede">{person.short}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="page-main">
        <section className="section-block">
          <div className="wrap">
            <div className="person-body">
              <article className="person-prose">
                {person.prose.map(([heading, text], pIdx) => (
                  <div key={pIdx}>
                    {heading && <h2>{heading}</h2>}
                    <p>{text}</p>
                  </div>
                ))}
              </article>

              <dl className="facts">
                <span className="facts__title">At a glance</span>
                {person.facts.map(([label, val], fIdx) => (
                  <div key={fIdx} className="facts__row">
                    <dt>{label}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <ConsultationForm />

        {/* Feedback Section */}
        <FeedbackSection />
      </main>
    </div>
  )
}
