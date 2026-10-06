import Link from 'next/link'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { getCaseStudies, getPageContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Success Stories | HOF Migration',
  description:
    'Four real client stories, including the setbacks and pivots that shaped their journeys. Names and details are shared with permission.',
}

export const dynamic = 'force-dynamic'

export default async function SuccessStoriesPage() {
  const [stories, contentData] = await Promise.all([getCaseStudies(), getPageContent('success-stories')])
  const content = contentData as {
    pageLabel?: string
    hero?: { titleLine1?: string; titleLine2?: string; lede?: string; destinations?: string; countLabel?: string }
    storyEyebrow?: string
    storyCta?: string
    watchStory?: string
  } | null
  return (
    <div className="story-page">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">{content?.pageLabel || ''}</span>
          </nav>

          <div className="page-head">
            <h1 className="page-head__title">
              {content?.hero?.titleLine1 || ''}
              <br />
              {content?.hero?.titleLine2 || ''}
            </h1>
            <p className="page-head__lede">{content?.hero?.lede || ''}</p>
            <div className="page-head__meta">
              <span className="page-head__chip">{stories.length} {content?.hero?.countLabel || ''}</span>
              <span className="page-head__chip">{content?.hero?.destinations || ''}</span>
            </div>
          </div>
        </div>
      </div>

      <main>
        <section className="section-block">
          <div className="wrap">
            <div className="story-list">
              {stories.map((story) => (
                <article key={story.slug} className="story-card reveal is-in">
                  <div className="stories__video">
                    <div className="stories__video-noise"></div>
                    <button type="button" className="stories__play" aria-label={content?.storyEyebrow || ''}>
                      <svg viewBox="0 0 24 24" fill="#14161a">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <span className="stories__video-caption">{story.storyDetails?.caption || (content?.watchStory || '').replace('{name}', story.clientName)}</span>
                  </div>

                  <div className="story-card__body">
                    <span className="story-card__eyebrow">{content?.storyEyebrow || ''}</span>
                    <h2 className="story-card__name">{story.title}</h2>
                    <span className="story-card__route">{story.storyDetails?.route || story.clientName}</span>
                    <p className="story-card__text">{story.summary}</p>
                    <Link
                      className="story-card__link"
                      href={`/success-stories/${story.slug}`}
                    >
                      {content?.storyCta || ''}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ConsultationForm />
    </div>
  )
}
