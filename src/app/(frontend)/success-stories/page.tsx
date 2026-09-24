import Link from 'next/link'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { STORIES } from '@/data/site-content'

export const metadata: Metadata = {
  title: 'Success Stories | HOF Migration',
  description:
    'Four real client stories, including the setbacks and pivots that shaped their journeys. Names and details are shared with permission.',
}

export default function SuccessStoriesPage() {
  return (
    <div className="story-page">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Success Stories</span>
          </nav>

          <div className="page-head">
            <h1 className="page-head__title">
              The People Behind
              <br />
              the Applications
            </h1>
            <p className="page-head__lede">
              Four journeys told as they happened — including the parts that went wrong at first.
              Names and details are used with their permission.
            </p>
            <div className="page-head__meta">
              <span className="page-head__chip">4 stories</span>
              <span className="page-head__chip">Canada · United States · United Kingdom · Australia</span>
            </div>
          </div>
        </div>
      </div>

      <main>
        <section className="section-block">
          <div className="wrap">
            <div className="story-list">
              {STORIES.map((story) => (
                <article key={story.slug} className="story-card reveal is-in">
                  <div className="stories__video">
                    <div className="stories__video-noise"></div>
                    <button type="button" className="stories__play" aria-label="Play video">
                      <svg viewBox="0 0 24 24" fill="#14161a">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <span className="stories__video-caption">{story.caption}</span>
                  </div>

                  <div className="story-card__body">
                    <span className="story-card__eyebrow">Success story</span>
                    <h2 className="story-card__name">{story.headline}</h2>
                    <span className="story-card__route">{story.route}</span>
                    <p className="story-card__text">{story.excerpt}</p>
                    <Link
                      className="story-card__link"
                      href={`/success-stories/${story.routeSlug}`}
                    >
                      Read the full story
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
