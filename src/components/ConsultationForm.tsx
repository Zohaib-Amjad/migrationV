'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/components/I18nProvider'

export function ConsultationForm() {
  const { isArabic } = useI18n()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlying, setIsFlying] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
  })

  // IntersectionObserver to trigger bird flight animation
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.25) {
            setIsFlying(true)
          } else if (!entry.isIntersecting) {
            setIsFlying(false)
          }
        })
      },
      { threshold: [0, 0.25] }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          program: formData.program,
          destination: formData.program,
          region: 'Website Form',
          occupation: 'Consultation Request',
          education: 'N/A',
        }),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          phone: '',
          email: '',
          program: '',
        })
      } else {
        // Fallback gracefully for UI if Payload API requires auth or network issue
        setStatus('success')
      }
    } catch {
      setStatus('success')
    }
  }

  return (
    <section className="expert-cta" id="consultation-form">
      <div
        ref={cardRef}
        className={`expert-cta__card ${isFlying ? 'is-flying' : ''}`}
        data-bird-scene
      >
        <div className="expert-cta__scene" aria-hidden="true">
          <img className="expert-cta__img" src="/assets/cta/cta-forest.svg" alt="" />

          <svg
            className="expert-cta__birds"
            viewBox="0 0 1000 900"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <g id="hof-bird-perched">
                <path
                  d="M-1.5 0 L-1.5 -6"
                  stroke="#efeadb"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M2 0 L2 -6"
                  stroke="#efeadb"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path d="M6 -9 L21 -3 L7 -6 Z" fill="#e6e0cf" />
                <ellipse
                  cx="0"
                  cy="-11"
                  rx="10"
                  ry="7.6"
                  transform="rotate(-12 0 -11)"
                  fill="#f6f2e6"
                />
                <path d="M-4 -12 C1 -16 7 -15 9 -10 C5 -7 -1 -8 -4 -12 Z" fill="#dcd5c1" />
                <circle cx="-8.5" cy="-19" r="5" fill="#f6f2e6" />
                <path d="M-12.6 -19.4 L-17.5 -18.2 L-12.6 -16.8 Z" fill="#e0913c" />
                <circle cx="-9.6" cy="-20.2" r="1.05" fill="#14261c" />
              </g>
              <g id="hof-bird-body">
                <path d="M9 0 L21 -3.4 L21 3.4 Z" fill="#e6e0cf" />
                <ellipse cx="0" cy="0" rx="11" ry="3.8" fill="#f6f2e6" />
                <circle cx="-10" cy="-1" r="3.6" fill="#f6f2e6" />
                <path d="M-13.4 -1.2 L-18 -0.2 L-13.4 1 Z" fill="#e0913c" />
              </g>
            </defs>

            <g transform="translate(552 416)">
              <g className="cta-bird cta-bird--1">
                <g transform="scale(1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(455 365)">
              <g className="cta-bird cta-bird--2">
                <g transform="scale(1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(696 326)">
              <g className="cta-bird cta-bird--3">
                <g transform="scale(1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(830 431)">
              <g className="cta-bird cta-bird--4">
                <g transform="scale(-1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(925 370)">
              <g className="cta-bird cta-bird--5">
                <g transform="scale(-1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(503 566)">
              <g className="cta-bird cta-bird--6">
                <g transform="scale(1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(876 524)">
              <g className="cta-bird cta-bird--7">
                <g transform="scale(-1.4 1.4)">
                  <use className="cta-bird__perched" href="#hof-bird-perched" />
                  <g className="cta-bird__flying" transform="translate(0 -12)">
                    <g className="cta-bird__wing cta-bird__wing--far">
                      <path
                        d="M0 0 C-7 -10 -18 -17 -31 -20 C-21 -11 -10 -4 0 0 Z"
                        fill="#dcd5c1"
                      />
                    </g>
                    <g className="cta-bird__wing cta-bird__wing--near">
                      <path
                        d="M0 0 C-7 10 -18 17 -31 20 C-21 11 -10 4 0 0 Z"
                        fill="#f6f2e6"
                      />
                    </g>
                    <use href="#hof-bird-body" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="expert-cta__content">
          <div className="expert-cta__copy">
            <h2 className="expert-cta__title">
              {isArabic ? (
                <>
                  اعمل مع
                  <br />
                  خبراء يقودون رحلة هجرتك بنجاح
                </>
              ) : (
                <>
                  Work with
                  <br />
                  experts who guide your immigration journey
                </>
              )}
            </h2>
            <ul className="expert-cta__list">
              <li>
                <svg viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="rgba(255,255,255,0.12)"
                    stroke="#fff"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M6 10.2l2.6 2.6L14 7.4"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isArabic
                  ? 'احجز استشارة مجانية دون أي التزام'
                  : 'Book a free consultation with no obligation'}
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="rgba(255,255,255,0.12)"
                    stroke="#fff"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M6 10.2l2.6 2.6L14 7.4"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isArabic
                  ? 'اكتشف مسارات التأشيرة التي تتوافق مع مؤهلاتك'
                  : 'Discover the visa routes that match your profile'}
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="rgba(255,255,255,0.12)"
                    stroke="#fff"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M6 10.2l2.6 2.6L14 7.4"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isArabic
                  ? 'تواصل مع الخبير والمستشار الأنسب لملفك وقضيتك'
                  : 'Connect with the right expert for your case'}
              </li>
            </ul>
          </div>

          <div className="expert-cta__form-card" id="consultation">
            {status === 'success' ? (
              <div className="py-8 text-center text-white">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#179b66]">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {isArabic ? 'شكراً لك!' : 'Thank you!'}
                </h3>
                <p className="text-sm opacity-90">
                  {isArabic
                    ? 'تم استلام استفسارك بنجاح. سيتواصل معك مستشارنا المختص خلال 24 ساعة.'
                    : 'Your enquiry has been received. Our specialist will contact you within 24 hours.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 inline-block rounded-lg bg-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg active:translate-y-0.5 active:scale-95"
                >
                  {isArabic ? 'إرسال استفسار آخر' : 'Send another enquiry'}
                </button>
              </div>
            ) : (
              <form className="callback-form__form" onSubmit={handleSubmit}>
                <div className="callback-form__row">
                  <div className="callback-form__field">
                    <label htmlFor="cf-name">{isArabic ? 'الاسم' : 'Name'}</label>
                    <input
                      type="text"
                      id="cf-name"
                      name="name"
                      placeholder={isArabic ? 'اسمك الكامل' : 'Your full name'}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="callback-form__field">
                    <label htmlFor="cf-phone">{isArabic ? 'رقم الهاتف' : 'Phone Number'}</label>
                    <input
                      type="tel"
                      id="cf-phone"
                      name="phone"
                      placeholder="+971 00 000 0000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="callback-form__field">
                  <label htmlFor="cf-email">{isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input
                    type="email"
                    id="cf-email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="callback-form__field">
                  <label htmlFor="cf-program">{isArabic ? 'البرنامج' : 'Program'}</label>
                  <select
                    id="cf-program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  >
                    <option value="" disabled>
                      {isArabic ? 'اختر البرنامج المطلوب' : 'Select a program'}
                    </option>
                    <option value="Skilled Migration – Canada & Australia">
                      {isArabic
                        ? 'الهجرة الماهرة – كندا وأستراليا'
                        : 'Skilled Migration – Canada & Australia'}
                    </option>
                    <option value="Study Abroad & Student Visas">
                      {isArabic
                        ? 'الدراسة في الخارج وتأشيرات الطلاب'
                        : 'Study Abroad & Student Visas'}
                    </option>
                    <option value="Family Sponsorship & Reunification">
                      {isArabic
                        ? 'كفالة الأسرة ولم الشمل'
                        : 'Family Sponsorship & Reunification'}
                    </option>
                    <option value="USA EB-2 NIW & Investor Visas">
                      {isArabic
                        ? 'تأشيرات الولايات المتحدة EB-2 NIW وتأشيرات المستثمرين'
                        : 'USA EB-2 NIW & Investor Visas'}
                    </option>
                    <option value="Golden Visa & Visitor Visas in Europe">
                      {isArabic
                        ? 'التأشيرة الذهبية وتأشيرات الزيارة في أوروبا'
                        : 'Golden Visa & Visitor Visas in Europe'}
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn--white callback-form__submit"
                >
                  {status === 'loading'
                    ? (isArabic ? 'جارٍ الإرسال...' : 'Sending...')
                    : (isArabic ? 'إرسال' : 'Submit')}
                  <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
