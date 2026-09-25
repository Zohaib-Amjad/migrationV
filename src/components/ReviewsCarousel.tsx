'use client'

import { useEffect, useRef, useState } from 'react'
import { REVIEWS } from '@/data/site-content'
import { useI18n, translateToArabic } from '@/components/I18nProvider'

export function ReviewsCarousel() {
  const { isArabic } = useI18n()
  const trackRef = useRef<HTMLDivElement>(null)
  const trustindexRef = useRef<HTMLDivElement>(null)
  const [trustindexReady, setTrustindexReady] = useState(false)

  useEffect(() => {
    const container = trustindexRef.current
    if (!container) return

    const observer = new MutationObserver(() => {
      if (container.querySelector('.ti-widget')) {
        setTrustindexReady(true)
        if (document.documentElement.getAttribute('lang') === 'ar') {
          setTimeout(translateToArabic, 60)
          setTimeout(translateToArabic, 250)
          setTimeout(translateToArabic, 600)
        }
      }
    })
    observer.observe(container, { childList: true, subtree: true })

    const script = document.createElement('script')
    script.src = 'https://cdn.trustindex.io/loader.js?289b017822e2088a4c26a8ad6c2'
    script.async = true
    script.defer = true
    container.appendChild(script)

    return () => {
      observer.disconnect()
      script.remove()
    }
  }, [])

  useEffect(() => {
    if (isArabic) {
      setTimeout(translateToArabic, 60)
      setTimeout(translateToArabic, 250)
      setTimeout(translateToArabic, 600)
    }
  }, [isArabic, trustindexReady])

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector('.review-card') as HTMLElement
    const cardWidth = card ? card.getBoundingClientRect().width + 24 : 360
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth

    track.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__header">
        <h2 className="reviews__title">
          {isArabic ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
        </h2>
        <a href="#reviews" className="reviews__view-all">
          {isArabic ? 'عرض الكل' : 'View All'}
        </a>
      </div>
      <div className="reviews__divider"></div>

      <div
        ref={trustindexRef}
        className="reviews__trustindex"
        aria-label={isArabic ? 'تقييمات العملاء المباشرة' : 'Live customer reviews'}
      ></div>

      <div
        className={`reviews__row ${trustindexReady ? 'reviews__row--fallback-hidden' : ''}`}
        data-reviews=""
      >
        <button
          type="button"
          className="reviews__arrow reviews__arrow--prev"
          aria-label={isArabic ? 'التقييمات السابقة' : 'Previous reviews'}
          onClick={() => scroll('prev')}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="#14161a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="reviews__track" ref={trackRef}>
          {REVIEWS.map((review, i) => {
            const r = review as {
              name: string
              nameAr?: string
              initial: string
              initialAr?: string
              avatarBg: string
              date: string
              dateAr?: string
              platform: string
              text: string
              textAr?: string
            }
            const name = isArabic && r.nameAr ? r.nameAr : r.name
            const initial = isArabic && r.initialAr ? r.initialAr : r.initial
            const date = isArabic && r.dateAr ? r.dateAr : r.date
            const text = isArabic && r.textAr ? r.textAr : r.text

            return (
              <article key={i} className="review-card">
                <div className="review-card__head">
                  <div className="review-card__avatar" style={{ background: review.avatarBg }}>
                    {initial}
                  </div>
                  <div className="review-card__who">
                    <span className="review-card__name">{name}</span>
                    <span className="review-card__date">{date}</span>
                  </div>
                  {review.platform === 'Google' ? (
                    <svg className="review-card__badge" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#fff" />
                      <circle cx="12" cy="12" r="11" fill="none" stroke="#eee" />
                      <text
                        x="12"
                        y="17"
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                        fontWeight="700"
                        fontSize="15"
                        fill="#4285F4"
                      >
                        G
                      </text>
                    </svg>
                  ) : (
                    <svg className="review-card__badge" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#00AF87" />
                      <circle
                        cx="8.5"
                        cy="12"
                        r="3.4"
                        fill="#00AF87"
                        stroke="#fff"
                        strokeWidth="1.4"
                      />
                      <circle
                        cx="15.5"
                        cy="12"
                        r="3.4"
                        fill="#00AF87"
                        stroke="#fff"
                        strokeWidth="1.4"
                      />
                      <circle cx="8.5" cy="12" r="1.1" fill="#fff" />
                      <circle cx="15.5" cy="12" r="1.1" fill="#fff" />
                    </svg>
                  )}
                </div>

                <div className="review-card__rating">
                  <span className="review-card__stars">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} viewBox="0 0 24 24" fill="#FBBC04">
                        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7L2 9.5l7.1-.6L12 2z" />
                      </svg>
                    ))}
                  </span>
                  <svg className="review-card__verified" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#1DA1F2" />
                    <path
                      d="M7 12.5l3 3 7-7.5"
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="review-card__text">{text}</p>
                <a href="#reviews" className="review-card__more">
                  {isArabic ? 'اقرأ المزيد' : 'Read more'}
                </a>
              </article>
            )
          })}
        </div>

        <button
          type="button"
          className="reviews__arrow reviews__arrow--next"
          aria-label={isArabic ? 'التقييمات التالية' : 'Next reviews'}
          onClick={() => scroll('next')}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="#14161a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
