'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { PlaneWindow } from '@/components/PlaneWindow'
import { ReviewsCarousel } from '@/components/ReviewsCarousel'
import { FaqAccordion } from '@/components/FaqAccordion'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'

import type { CmsService, CmsCaseStudy, CmsTestimonial, CmsFaq } from '@/lib/cms'

interface HomePageClientProps {
  services?: CmsService[]
  caseStudies?: CmsCaseStudy[]
  testimonials?: CmsTestimonial[]
  faqs?: CmsFaq[]
}

export function HomePageClient({
  services,
  caseStudies,
  testimonials,
  faqs,
}: HomePageClientProps) {
  const displayServices = services || []
  const featuredStory = caseStudies?.[0] || null

  useEffect(() => {
    const scrollEl = document.querySelector<HTMLElement>('[data-services-scroll]')
    if (!scrollEl) return

    const stickyEl = scrollEl.querySelector<HTMLElement>('.services__sticky')
    const headerEl = scrollEl.querySelector<HTMLElement>('.services__header')
    const viewportEl = scrollEl.querySelector<HTMLElement>('.services__viewport')
    const trackEl = scrollEl.querySelector<HTMLElement>('.services__track')
    if (!stickyEl || !viewportEl || !trackEl) return

    const mq = window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)')
    let maxScroll = 0
    let ticking = false

    const CARD_ASPECT = 1079 / 1079
    const VISIBLE_CARDS = 2.5
    const MAX_HEIGHT_FRACTION = 0.94

    function sizeCards() {
      if (!viewportEl || !trackEl) return
      const gap = parseFloat(getComputedStyle(trackEl).columnGap) || 40
      const viewportWidth = viewportEl.clientWidth
      const headerHeight = headerEl ? headerEl.offsetHeight : 0
      const heightBudget = window.innerHeight - headerHeight

      const widthFit = (viewportWidth - 2 * gap) / VISIBLE_CARDS
      const heightFromWidthFit = widthFit / CARD_ASPECT

      const cardHeight = Math.min(heightFromWidthFit, heightBudget * MAX_HEIGHT_FRACTION)
      const cardWidth = cardHeight * CARD_ASPECT

      trackEl.style.setProperty('--card-w', `${cardWidth}px`)
      trackEl.style.setProperty('--card-h', `${cardHeight}px`)
    }

    function measure() {
      if (!scrollEl || !stickyEl || !viewportEl || !trackEl) return
      if (mq.matches) {
        scrollEl.style.height = ''
        trackEl.style.transform = ''
        maxScroll = 0
        return
      }
      sizeCards()
      const viewportWidth = viewportEl.clientWidth
      const trackWidth = trackEl.scrollWidth
      maxScroll = Math.max(0, trackWidth - viewportWidth)
      scrollEl.style.height = `${stickyEl.offsetHeight + maxScroll}px`
    }

    function update() {
      ticking = false
      if (!scrollEl || !trackEl || mq.matches || maxScroll <= 0) return

      const rect = scrollEl.getBoundingClientRect()
      let progressPx = -rect.top
      if (progressPx < 0) progressPx = 0
      if (progressPx > maxScroll) progressPx = maxScroll

      const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 1 : -1
      trackEl.style.transform = `translateX(${dir * progressPx}px)`
    }

    function onScroll() {
      update()
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    function onResize() {
      measure()
      update()
    }

    measure()
    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    if (mq.addEventListener) {
      mq.addEventListener('change', onResize)
    } else {
      mq.addListener(onResize)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (mq.removeEventListener) {
        mq.removeEventListener('change', onResize)
      } else {
        mq.removeListener(onResize)
      }
    }
  }, [displayServices])

  return (
    <>
      {/* Hero + Window + Experience */}
      <div className="hero-band">
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__row">
              <div className="hero__content">
                <div className="badge-row">
                  <div className="badge">
                    <span className="badge__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2.5l7.5 3v5.4c0 4.9-3.2 9.3-7.5 10.6-4.3-1.3-7.5-5.7-7.5-10.6V5.5l7.5-3z"
                          fill="#fff"
                        />
                        <path
                          d="M8.5 12.2l2.4 2.4 4.6-4.9"
                          stroke="#8daba4"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="badge__text">ICCRC &amp; MARA Certified</span>
                  </div>
                  <span className="badge-row__divider" aria-hidden="true"></span>
                  <span className="badge__logos">
                    <span className="cert-chip">
                      <span className="cert-chip__face">
                        <img
                          src="/assets/icons-v2/partner-logo-1-mark.png"
                          alt="MARA"
                          className="cert-chip__mark"
                        />
                      </span>
                    </span>
                    <span className="cert-chip cert-chip--offset">
                      <span className="cert-chip__face">
                        <img
                          src="/assets/icons-v2/partner-logo-2-mark.png"
                          alt="ICCRC"
                          className="cert-chip__mark"
                        />
                      </span>
                    </span>
                  </span>
                </div>

                <div className="hero__copy">
                  <h1 className="hero__title">
                    The Gulf’s #1<br />
                    Trusted Immigration Consultancy
                  </h1>
                  <p className="hero__subtitle">Your Right Migration Starts With The Right Guidance</p>
                </div>

                <Link href="/#consultation" className="btn btn--white">
                  Let’s Talk
                  <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
                </Link>
              </div>

              <PlaneWindow />
            </div>
          </div>
        </section>

        {/* People Band */}
        <section className="people-band">
          <div className="people-band__wrap">
            <img
              src="/assets/window-final/people-post.png"
              alt="The HOF Migration consultant team"
            />
          </div>
        </section>
      </div>

      {/* 6 Years Experience */}
      <section className="experience">
        <div className="experience__inner">
          <h2 className="experience__heading">
            6 Years of Experience in Immigration Consultancy
          </h2>
          <p className="experience__text">
            Navigate your immigration journey with experienced consultants who provide expert,
            end-to-end guidance for multiple destinations.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services__scroll" data-services-scroll>
          <div className="services__sticky">
            <div className="services__header">
              <h2 className="services__title">Immigration &amp; Education Consultancy Services</h2>
              <Link href="/services" className="services__explore">
                Explore all Services
              </Link>
            </div>

            <div className="services__viewport">
              <div className="services__track">
                {displayServices.map((service, idx) => {
                  const targetSlug = service.slug || 'skilled-migration'
                  return (
                    <article
                      key={service.id || idx}
                      className="service-card"
                      style={
                        {
                          '--card-bg': service.tint || '#DFEDF7',
                          '--card-accent': service.accent || '#0095FF',
                          '--card-accent-text': service.accent || '#0671BE',
                        } as React.CSSProperties
                      }
                    >
                      <div className="service-card__content">
                        <h3 className="service-card__title">{service.title}</h3>
                        {service.bullets && service.bullets.length > 0 ? (
                          <ul className="service-card__text">
                            {service.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="service-card__text">{service.desc}</p>
                        )}
                        <Link href={`/services/${targetSlug}`} className="service-card__link">
                          See how we can help
                        </Link>
                      </div>
                      <div className="service-card__image">
                        <img
                          className="service-card__img"
                          src={service.imageUrl || '/assets/services-v2/skilled-migration.jpg'}
                          alt={service.title}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <ReviewsCarousel testimonials={testimonials} />

      {/* Success Stories */}
      <section className="stories" id="stories">
        <div className="stories__header">
          <h2 className="stories__title">Success Stories</h2>
          <Link href="/success-stories" className="stories__view-all">
            View All
          </Link>
        </div>

        <div className="stories__grid">
          <div className="stories__video">
            <div className="stories__video-noise"></div>
            <button type="button" className="stories__play" aria-label="Play video">
              <svg viewBox="0 0 24 24" fill="#14161a">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </button>
            <span className="stories__video-caption">
              {featuredStory ? `Watch ${featuredStory.clientName}’s story` : ''}
            </span>
          </div>

          <div className="stories__content">
            <span className="stories__eyebrow">Success Story</span>
            <h3 className="stories__name">
              {featuredStory?.title || ''}
            </h3>
            <span className="stories__route">
              {featuredStory?.results?.[0]
                ? `${featuredStory.clientName} · ${featuredStory.results[0].label} → ${featuredStory.results[0].stat}`
                : ''}
            </span>
            <p className="stories__text">
              {featuredStory?.summary || ''}
            </p>
            <Link
              href={featuredStory ? `/success-stories/${featuredStory.slug}` : '/success-stories'}
              className="btn btn--white stories__cta"
            >
              Read Full Story
              <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion faqs={faqs} />

      {/* Work with Experts Consultation */}
      <ConsultationForm />

      {/* Share Your Feedback */}
      <FeedbackSection />
    </>
  )
}
