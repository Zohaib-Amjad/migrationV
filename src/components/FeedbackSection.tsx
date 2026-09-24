'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'

const PHRASES = [
  { text: 'we care about you', lang: 'en', dir: 'ltr' },
  { text: 'نحن نهتم بك', lang: 'ar', dir: 'rtl' },
  { text: 'ہمیں آپ کی فکر ہے', lang: 'ur', dir: 'rtl' },
  { text: 'हमें आपकी फ़िक्र है', lang: 'hi', dir: 'ltr' },
]

export function FeedbackSection() {
  const { isArabic } = useI18n()

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = PHRASES[phraseIndex]
    const fullText = current.text

    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1))
        }, 50)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 1400)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1))
        }, 30)
      } else {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, phraseIndex])

  const currentPhrase = PHRASES[phraseIndex]

  return (
    <section className="feedback" id="feedback">
      <div className="feedback__inner">
        <div className="feedback__content">
          <h2 className="feedback__title">
            {isArabic ? 'شاركنا رأيك' : 'Share your feedback'}
          </h2>
          <p className="feedback__text">
            {isArabic
              ? 'الهجرة رحلة تتطلب الوقت والصبر والتخطيط المحكم. نحن نجعلها أسهل بتحمل العبء الأكبر عن كاهلك وبالشفافية التامة تجاه ما يخرج عن إرادتنا — فالقوانين تتغير والسياسات تتبدل، ولكن ما نعدك به دائمًا هو الصدق التام والتعامل مع وقتك وجهدك واستثمارك كما لو كانت تخصنا شخصيًا.'
              : 'Immigration is a long process that demands time, patience, and careful planning. We make it easier by carrying a large share of the burden and by being transparent about what is beyond our control — laws change, government policies shift, and political conditions can influence the outcome even when everything is handled correctly. What we promise is to be honest from the start and to treat your time, money, and effort as if they were our own.'}
          </p>
          <Link href="/#consultation" className="btn btn--dark feedback__cta">
            {isArabic ? 'شاركنا رأيك' : 'Share your feedback'}
            <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
          </Link>
        </div>

        <div className="feedback__artwork" data-feedback-languages="" data-no-translate="">
          <p className="feedback__line">
            <span
              className="feedback__typed"
              lang={currentPhrase.lang}
              dir={currentPhrase.dir}
            >
              {displayText}
            </span>
            <span className="feedback__caret" aria-hidden="true"></span>
          </p>

          {/* The phrases the line types through. Hidden from view but left in the
               markup so the set is readable without script and stays visible to
               assistive tech, which never sees the character-by-character render. */}
          <span className="feedback__sources" hidden data-feedback-sources="">
            <span lang="en">we care about you</span>
            <span lang="ar" dir="rtl">نحن نهتم بك</span>
            <span lang="ur" dir="rtl">ہمیں آپ کی فکر ہے</span>
            <span lang="hi">हमें आपकी फ़िक्र है</span>
          </span>

          <div className="feedback__tiles" aria-hidden="true">
            <span className="feedback__tile">
              <span className="feedback__tile-glyph"></span>
            </span>
            <span className="feedback__tile">
              <span className="feedback__tile-glyph"></span>
            </span>
            <span className="feedback__tile">
              <span className="feedback__tile-glyph"></span>
            </span>
            <span className="feedback__tile">
              <span className="feedback__tile-glyph"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
