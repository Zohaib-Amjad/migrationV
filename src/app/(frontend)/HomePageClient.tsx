'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { PlaneWindow } from '@/components/PlaneWindow'
import { ReviewsCarousel } from '@/components/ReviewsCarousel'
import { FaqAccordion } from '@/components/FaqAccordion'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'

export function HomePageClient() {
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
  }, [])

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
                {/* 1. Skilled Migration */}
                <article
                  className="service-card"
                  style={
                    {
                      '--card-bg': '#DFEDF7',
                      '--card-accent': '#0095FF',
                      '--card-accent-text': '#0671BE',
                    } as React.CSSProperties
                  }
                >
                  <div className="service-card__content">
                    <h3 className="service-card__title">Skilled Migration Canada &amp; Australia</h3>
                    <ul className="service-card__text">
                      <li>
                        <b>Canada</b> | Express Entry &amp; Provincial Nominee Programs (PNP)
                      </li>
                      <li>
                        <b>Australia</b> | Skilled Independent (189), Skilled Nominated (190) &amp;
                        Skilled Work Regional (491)
                      </li>
                    </ul>
                    <Link href="/services/skilled-migration" className="service-card__link">
                      See how we can help
                    </Link>
                  </div>
                  <div className="service-card__image">
                    <img
                      className="service-card__img"
                      src="/assets/services-v2/skilled-migration.jpg"
                      alt="Toronto skyline, Canada"
                    />
                  </div>
                </article>

                {/* 2. Study Abroad */}
                <article
                  className="service-card"
                  style={
                    {
                      '--card-bg': '#F7E9DF',
                      '--card-accent': '#FF5900',
                      '--card-accent-text': '#BD5D35',
                    } as React.CSSProperties
                  }
                >
                  <div className="service-card__content">
                    <h3 className="service-card__title">
                      Study Abroad &amp;
                      <br />
                      Student Visas
                    </h3>
                    <p className="service-card__text">
                      Explore study opportunities worldwide, including Australia’s Subclass 500,
                      the UK Student Visa, Canada’s Study Permit, Germany’s Student Visa, and the
                      USA’s F-1 Visa.
                    </p>
                    <Link href="/services/study-abroad" className="service-card__link">
                      See how we can help
                    </Link>
                  </div>
                  <div className="service-card__image">
                    <img
                      className="service-card__img"
                      src="/assets/services-v2/study-abroad.jpg"
                      alt="Graduate in cap and gown"
                    />
                  </div>
                </article>

                {/* 3. Family Sponsorship */}
                <article
                  className="service-card"
                  style={
                    {
                      '--card-bg': '#F7FFFA',
                      '--card-accent': '#179B66',
                    } as React.CSSProperties
                  }
                >
                  <div className="service-card__content">
                    <h3 className="service-card__title">Family Sponsorship &amp; Reunification</h3>
                    <p className="service-card__text">
                      Bring your loved ones together with expert guidance for family sponsorship and
                      reunification.
                    </p>
                    <Link href="/services/family-sponsorship" className="service-card__link">
                      See how we can help
                    </Link>
                  </div>
                  <div className="service-card__image">
                    <img
                      className="service-card__img"
                      src="/assets/services-v2/family-sponsorship.jpg"
                      alt="Family portrait outdoors"
                    />
                  </div>
                </article>

                {/* 4. USA EB-2 NIW */}
                <article
                  className="service-card"
                  style={
                    {
                      '--card-bg': '#ECF1FF',
                      '--card-accent': '#6B81CF',
                    } as React.CSSProperties
                  }
                >
                  <div className="service-card__content">
                    <h3 className="service-card__title">USA EB-2 NIW &amp; Investor Visas</h3>
                    <p className="service-card__text">
                      EB-2 US National Interest Waiver Petitions, E-2 Investor and L-1 Transfer Visas
                    </p>
                    <Link href="/services/usa-visas" className="service-card__link">
                      See how we can help
                    </Link>
                  </div>
                  <div className="service-card__image">
                    <img
                      className="service-card__img"
                      src="/assets/services-v2/usa-visas.jpg"
                      alt="Statue of Liberty, USA"
                    />
                  </div>
                </article>

                {/* 5. Europe Golden Visa */}
                <article
                  className="service-card"
                  style={
                    {
                      '--card-bg': '#FFE8EF',
                      '--card-accent': '#FD0148',
                      '--card-accent-text': '#E30246',
                    } as React.CSSProperties
                  }
                >
                  <div className="service-card__content">
                    <h3 className="service-card__title">Europe Golden Visa &amp; Visitor Visas</h3>
                    <p className="service-card__text">
                      EB-2 US National Interest Waiver Petitions, E-2 Investor and L-1 Transfer Visas
                    </p>
                    <Link href="/services/europe-visas" className="service-card__link">
                      See how we can help
                    </Link>
                  </div>
                  <div className="service-card__image">
                    <img
                      className="service-card__img"
                      src="/assets/services-v2/europe-visas.jpg"
                      alt="Eiffel Tower, Paris"
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <ReviewsCarousel />

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
            <span className="stories__video-caption">Watch Ahmed’s story</span>
          </div>

          <div className="stories__content">
            <span className="stories__eyebrow">Success Story</span>
            <h3 className="stories__name">Ahmed’s Journey to the United States</h3>
            <span className="stories__route">Manufacturing Professional · Dubai, UAE → United States</span>
            <p className="stories__text">
              Ahmed had been living and working in Dubai for the past 15 years in the manufacturing
              industry. He had been considering moving to the United States and wanted professional
              guidance on the right migration pathway. HOF Migration helped him understand his options
              and guided him through the process.
            </p>
            <Link href="/success-stories/ahmed" className="btn btn--white stories__cta">
              Read Full Story
              <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion />

      {/* Work with Experts Consultation */}
      <ConsultationForm />

      {/* Share Your Feedback */}
      <FeedbackSection />
    </>
  )
}
