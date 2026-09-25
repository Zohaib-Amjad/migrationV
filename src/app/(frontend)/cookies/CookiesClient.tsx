'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'

export function CookiesClient() {
  const { isArabic } = useI18n()

  const sectionsEn = [
    {
      id: 'overview',
      title: '1. What Are Cookies & Local Storage?',
      desc: 'Cookies and browser local storage are small data fragments saved on your computer, smartphone, or tablet when you visit websites. They help websites remember your preferences, active settings, and browsing context across visits.',
      bullets: [
        'Cookies: Small data fragments sent from web servers and stored by your web browser.',
        'Local Storage: Modern browser storage mechanism used to persist UI state (such as dark mode and language preference) without expiring on session end.',
      ],
    },
    {
      id: 'usage',
      title: '2. How HOF Migration Uses Local Storage',
      desc: 'HOF Migration uses browser storage strictly for functional UI preferences to provide a seamless browsing experience.',
      bullets: [
        'Theme Preference: Stores your selected visual theme (Light Mode or Dark Mode) so your preference is retained when navigating between pages.',
        'Language Preference: Stores your preferred language (English or Arabic) so the automated translation engine renders instantly without flash.',
        'Form Draft Preservation: Temporarily preserves incomplete callback consultation entries locally to prevent data loss if your connection drops.',
      ],
    },
    {
      id: 'categories',
      title: '3. Categories of Storage We Employ',
      desc: 'We strictly segregate storage functions to respect user privacy and transparency.',
      bullets: [
        'Essential Functional Storage: Strictly required for website navigation, language switching, theme toggles, and form submission.',
        'Performance & Analytics: Anonymous aggregate traffic measurement used solely to optimize site loading speed and navigation flow.',
        'No Advertising Trackers: We DO NOT deploy cross-site advertising cookies, tracking pixels, or third-party retargeting scripts.',
      ],
    },
    {
      id: 'third-party',
      title: '4. Third-Party Services & Embedded Content',
      desc: 'Our website incorporates minimal essential third-party scripts to deliver security and typography.',
      bullets: [
        'Web Typography: Used for clear typography rendering; no personal tracking cookies are placed.',
        'Secure API & Data Services: Handles secure form submissions and document intake exclusively during consultations.',
      ],
    },
    {
      id: 'managing',
      title: '5. Managing & Disabling Storage Settings',
      desc: 'You have complete control over how your browser handles cookies and local storage.',
      bullets: [
        'Browser Controls: You can clear, block, or receive alerts for cookies via your browser settings.',
        'Clearing Site Data: Clearing your browser history and site data will reset theme and language toggles back to default.',
        'Impact of Disabling: Disabling essential local storage will cause theme and language selections to reset on every page refresh.',
      ],
    },
  ]

  const sectionsAr = [
    {
      id: 'overview',
      title: '١. ما هي ملفات تعريف الارتباط والتخزين المحلي؟',
      desc: 'ملفات تعريف الارتباط والتخزين المحلي للمتصفح هي عناصر تقنية صغيرة تُحفظ على جهازك عند زيارة الموقع لمساعدته على تذكر تفضيلاتك وتوفير تجربة تصفح سريعة.',
      bullets: [
        'ملفات تعريف الارتباط: بيانات نصية خفيفة تُحفظ في متصفح الويب الخاص بك لتسهيل التنقل.',
        'التخزين المحلي للمتصفح: آلية تقنية حديثة تُستخدم لحفظ تفضيلات واجهة المستخدم مثل النمط الليلي واللغة المختارة.',
      ],
    },
    {
      id: 'usage',
      title: '٢. كيفية استخدام بيانات التخزين بالموقع',
      desc: 'تستخدم الشركة بيانات التخزين المحلي فقط للأغراض التشغيلية وتفضيلات التصفح لضمان تجربة مستخدم سلسة.',
      bullets: [
        'تفضيل مظهر الواجهة: لحفظ اختيارك بين النمط الفاتح أو الداكن أثناء التنقل بين الصفحات.',
        'تفضيل اللغة المختارة: لحفظ اختيار اللغة (العربية أو الإنجليزية) وعرض المحتوى بسلاسة تامة.',
        'حفظ مسودات النماذج: حفظ مؤقت للمعلومات المدخلة في طلب الاستشارة لتجنب فقدان البيانات في حال انقطاع الاتصال.',
      ],
    },
    {
      id: 'categories',
      title: '٣. فئات بيانات التخزين المستخدمة',
      desc: 'نحن نصنف بيانات التخزين بدقة لحماية خصوصية المستخدم والالتزام بالشفافية الكاملة.',
      bullets: [
        'تخزين وظيفي أساسي: ضروري لعمل الموقع والتنقل والتبديل بين اللغات وإرسال النماذج.',
        'الأداء وسرعة التصفح: قياسات تقنية عامة لتحسين سرعة تحميل الصفحات وتجربة الاستخدام.',
        'خالٍ تماماً من المتتبعات الإعلانية: لا نستخدم أي ملفات إعلانية أو أدوات تتبع لأطراف خارجية.',
      ],
    },
    {
      id: 'third-party',
      title: '٤. الخدمات التقنية المساعدة',
      desc: 'يقتصر استخدام البرمجيات المساعدة على الخدمات التقنية الضرورية للأمان وعرض الخطوط بوضوح.',
      bullets: [
        'عرض الخطوط الطباعية: تُستخدم لضمان وضوح النصوص الطباعية دون جمع أي بيانات شخصية.',
        'بوابات الاستقبال الآمن: لمعالجة وتأمين استقبال طلبات الاستشارة والوثائق بأعلى معايير الحماية.',
      ],
    },
    {
      id: 'managing',
      title: '٥. التحكم في إعدادات ملفات الارتباط والتخزين',
      desc: 'لديك كامل الصلاحية للتحكم في كيفية إدارة المتصفح لملفات تعريف الارتباط والتخزين المحلي.',
      bullets: [
        'إعدادات المتصفح: يمكنك مسح أو حظر ملفات تعريف الارتباط مباشرة من إعدادات متصفحك.',
        'مسح بيانات الموقع: مسح سجل المتصفح سيعيد ضبط اختيارات اللغة والمظهر إلى الحالة الافتراضية.',
        'تأثير التعطيل: تعطيل التخزين المحلي قد يؤدي إلى إعادة تعيين تفضيلات العرض مع كل تحديث للصفحة.',
      ],
    },
  ]

  const sections = isArabic ? sectionsAr : sectionsEn
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          if (scrollPosition >= top) {
            setActiveId(sections[i].id)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="page-shell" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Band */}
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">{isArabic ? 'الرئيسية' : 'Home'}</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">{isArabic ? 'سياسة ملفات الارتباط' : 'Cookie Policy'}</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">
              {isArabic ? 'الشؤون القانونية والخصوصية' : 'Legal & Governance'}
            </span>
            <h1 className="page-head__title">
              {isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
            </h1>
            <p className="page-head__lede">
              {isArabic
                ? 'تعرف على كيفية استخدام تقنيات التخزين المحلي وملفات الارتباط للحفاظ على تفضيلات التصفح وضمان الأداء الأمثل للموقع.'
                : 'Effective Date: September 2026. Learn how HOF Migration utilizes essential local storage and cookie technologies to preserve UI preferences and ensure optimal browsing performance.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="wrap">
        <div className="legal-layout">
          {/* Navigation Sidebar */}
          <aside className="legal-sidebar">
            <div className="legal-sidebar__title">
              {isArabic ? 'أقسام السياسة' : 'Cookie Navigation'}
            </div>
            <nav className="legal-sidebar__nav">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`legal-sidebar__link ${activeId === sec.id ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const target = document.getElementById(sec.id)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      setActiveId(sec.id)
                      history.replaceState(null, '', `#${sec.id}`)
                    }
                  }}
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Cards Content */}
          <div className="legal-content">
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="legal-card">
                <h2 className="legal-card__title">{sec.title}</h2>
                <p className="legal-card__desc">{sec.desc}</p>
                {sec.bullets && (
                  <ul className="legal-card__list">
                    {sec.bullets.map((bullet, idx) => (
                      <li key={idx} className="legal-card__bullet">
                        <span className="legal-card__bullet-dot" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Questions Banner */}
            <div className="legal-contact-card">
              <h3 className="legal-contact-card__title">
                {isArabic ? 'هل لديك استفسارات حول ملفات الارتباط؟' : 'Questions about site storage?'}
              </h3>
              <p className="legal-contact-card__desc">
                {isArabic
                  ? 'يمكنك الاطلاع على سياسة الخصوصية الشاملة أو التواصل مع فريقنا التقني للحصول على أي توضيحات إضافية.'
                  : 'Review our comprehensive Privacy Policy or contact our technical operations team for additional assistance.'}
              </p>
              <div className="legal-contact-card__links">
                <Link href="/privacy-policy">
                  {isArabic ? 'عرض سياسة الخصوصية' : 'View Privacy Policy'}
                </Link>
                <span>•</span>
                <Link href="/#consultation">
                  {isArabic ? 'احجز استشارة' : 'Book a Consultation'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
