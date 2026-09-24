import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { STORIES } from '@/data/site-content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return STORIES.flatMap((story) => [
    { slug: story.routeSlug },
    ...(story.slug && story.slug !== story.routeSlug ? [{ slug: story.slug }] : []),
  ])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = STORIES.find((s) => s.routeSlug === slug || s.slug === slug)
  if (!story) return { title: 'Story Not Found | HOF Migration' }

  return {
    title: `${story.headline} | HOF Migration`,
    description: story.excerpt,
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params
  const story = STORIES.find((s) => s.routeSlug === slug || s.slug === slug)

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
            <span aria-current="page">{story.name}</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">Case study</span>
            <h1 className="page-head__title">{story.headline}</h1>
            <p className="page-head__lede">{story.excerpt}</p>
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
                {story.prose.map(([heading, text], pIdx) => {
                  if (pIdx === 0) {
                    return (
                      <div key={pIdx}>
                        <p>{text}</p>
                        <blockquote className="story-quote">
                          <p>&ldquo;{story.quote}&rdquo;</p>
                          <cite>{story.name}</cite>
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
                {story.facts.map(([factKey, factVal], fIdx) => (
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
