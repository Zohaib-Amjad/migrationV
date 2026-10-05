import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { getCaseStudies } from '@/lib/cms'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = (await getCaseStudies()).find((s) => s.slug === slug)
  const story = entry && entry.storyDetails
  if (!story) return { title: 'Story Not Found | HOF Migration' }

  return {
    title: `${entry.title} | HOF Migration`,
    description: entry.summary,
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params
  const entry = (await getCaseStudies()).find((s) => s.slug === slug)
  const story = entry?.storyDetails

  if (!story) {
    notFound()
  }

  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <Link href="/success-stories">Success Stories</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">{entry.clientName}</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">Case study</span>
            <h1 className="page-head__title">{entry.title}</h1>
            <p className="page-head__lede">{entry.summary}</p>
            <div className="page-head__meta">
              <span className="page-head__chip">{story.route}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="page-main">
        <section className="section-block section-block--tight">
          <div className="wrap">
            <div className="story-stage">
              <div className="stories__video">
                <div className="stories__video-noise"></div>
                <button type="button" className="stories__play" aria-label="Play video">
                  <svg viewBox="0 0 24 24" fill="#14161a">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span className="stories__video-caption">{story.caption}</span>
                <span className="story-stage__note">Documentary case study</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block section-block--tight">
          <div className="wrap">
            <div className="story-body">
              <article className="story-prose">
                {(story.prose || []).map(([heading, text], pIdx) => {
                  if (pIdx === 0) {
                    return (
                      <div key={pIdx}>
                        <p>{text}</p>
                        <blockquote className="story-quote">
                          <p>&ldquo;{story.quote}&rdquo;</p>
                          <cite>{entry.clientName}</cite>
                        </blockquote>
                      </div>
                    )
                  }
                  return (
                    <div key={pIdx}>
                      {heading && <h2>{heading}</h2>}
                      <p>{text}</p>
                    </div>
                  )
                })}
              </article>

              <dl className="facts">
                <span className="facts__title">Case summary</span>
                {(entry.results || []).map(({ label: factKey, stat: factVal }, fIdx) => (
                  <div key={fIdx} className="facts__row">
                    <dt>{factKey}</dt>
                    <dd>{factVal}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <ConsultationForm />
        <FeedbackSection />
      </main>
    </div>
  )
}
