'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'

export function TermsClient() {
  const { isArabic } = useI18n()

  const sectionsEn = [
    {
      id: 'scope',
      title: '1. Scope of Representation & Consultancy',
      desc: 'HOF Migration provides strategic consultancy, profile criteria evaluation, document authentication guidance, and authorized submission management for individuals seeking migration, study, or investment visas.',
      bullets: [
        'Advisory Boundary: Services are strictly limited to the agreed retainer scope outlined in your official Client Engagement Agreement.',
        'Regulatory Compliance: All consultations are performed in accordance with certified migration codes of conduct and international regulatory standards.',
        'Independent Representation: HOF Migration acts as your legal consultant; we do not operate as a government department.',
      ],
    },
    {
      id: 'obligations',
      title: '2. Client Obligations & Document Veracity',
      desc: 'Accurate and truthful client disclosures are essential for legitimate visa preparation. Clients agree to fulfill key operational responsibilities during their retainer.',
      bullets: [
        'Authenticity Guarantee: Clients certify that all submitted academic degrees, employment proof, reference letters, and bank records are genuine.',
        'Timely Submission: Documents requested by case specialists must be provided within the designated timeline to ensure petition validity.',
        'Immediate Disclosure: Clients must immediately disclose any prior visa refusals, criminal records, or medical conditions that could impact statutory eligibility.',
      ],
    },
    {
      id: 'disclaimer',
      title: '3. No Approval Guarantee Disclaimer',
      desc: 'While HOF Migration maintains rigorous accuracy standards and an industry-leading success rate, immigration outcome authority rests solely with statutory government officers.',
      bullets: [
        'Sole Authority: Government immigration officers hold absolute discretionary authority over visa approvals, interview requirements, and processing timelines.',
        'No Absolute Guarantees: No consultancy or lawyer can legally guarantee visa issuance. Any claims of guaranteed outcomes by third parties are fraudulent.',
        'Regulatory Policy Shifts: HOF Migration is not liable for changes in government migration policies, quota closures, or score draw increases enacted after filing.',
      ],
    },
    {
      id: 'fees',
      title: '4. Retainer Fees, Milestone Billing & Refund Terms',
      desc: 'Consultancy fees are structured around clear milestone deliverables to ensure complete transparency throughout your migration timeline.',
      bullets: [
        'Professional Fees: Advisory fees cover initial assessment, document curation, petition drafting, and submission management as specified in your contract.',
        'Government & Third-Party Costs: Government visa application charges, skills assessment fees, medical exams, and police clearances are paid directly to respective authorities.',
        'Refund Policy: Refunds for professional retainer fees are processed strictly according to the refund schedule articulated in your executed Client Agreement.',
      ],
    },
    {
      id: 'liability',
      title: '5. Limitation of Liability & Force Majeure',
      desc: 'HOF Migration limits operational liability to the maximum extent permitted by applicable law.',
      bullets: [
        'Consequential Damages: HOF Migration is not liable for indirect, incidental, or consequential losses including travel booking cancellations or job resignation timings.',
        'Force Majeure: Neither party shall be liable for delays caused by acts of God, global health emergencies, embassy closures, or wartime disruptions.',
      ],
    },
    {
      id: 'governing-law',
      title: '6. Governing Law & Dispute Resolution',
      desc: 'These Terms of Service and any client retainer contracts shall be governed by and construed in accordance with the laws of the jurisdiction specified in your retainer agreement.',
      bullets: [
        'Amicable Settlement: Both parties agree to attempt good-faith mediation prior to initiating formal legal proceedings.',
        'Arbitration Jurisdiction: Unresolved disputes shall be submitted to binding arbitration under local professional arbitration rules.',
      ],
    },
  ]

  const sectionsAr = [
    {
      id: 'scope',
      title: '١. نطاق التمثيل والخدمات الاستشارية',
      desc: 'تقدم الشركة خدمات التوجيه الاستراتيجي، تقييم معايير الأهلية، تدقيق المستندات الرسمية، وإدارة تقديم المعاملات لبرامج الهجرة، الدراسة، وتأشيرات الاستثمار.',
      bullets: [
        'حدود الاستشارة المهنية: تقتصر الخدمات على النطاق المحدد صراحة في اتفاقية التعاقد الرسمية الموقعة بين الطرفين.',
        'الامتثال التنظيمي: يتم تقديم كافة الاستشارات وفق ميثاق الشرف واللوائح المهنية الصادرة عن الهيئات الدولية المنظمة.',
        'التمثيل المستقل: تعمل الشركة بصفتها مستشاركم القانوني المعتمد، ولا تمثل أي وزارة أو دائرة حكومية.',
      ],
    },
    {
      id: 'obligations',
      title: '٢. التزامات العميل وصحة المستندات',
      desc: 'يُعد الإفصاح الصادق والدقيق ركيزة أساسية لإعداد ملفات الهجرة القانونية، ويلتزم العميل بتقديم الوثائق والمستندات المطلوبة في أوقاتها المحددة.',
      bullets: [
        'ضمانة صحة الوثائق: يقر العميل بصحة وموثوقية كافة الشهادات الأكاديمية، خطابات الخبرة، والسجلات المالية المقدمة.',
        'الالتزام بالأطر الزمنية: تقديم المستندات المطلوبة خلال الأوقات المحددة لضمان جاهزية وصلاحية المعاملة.',
        'الإفصاح الفوري: إبلاغ المستشار فوراً بأي رفض سابق للتأشيرات أو أي سجلات جنائية أو صحية قد تؤثر على الأهلية.',
      ],
    },
    {
      id: 'disclaimer',
      title: '٣. إخلاء المسؤولية عن قرارات التأشيرة',
      desc: 'على الرغم من التزام الشركة بأعلى درجات الدقة ونسب النجاح المرتفعة، إلا أن سلطة إصدار التأشيرات تعود حصراً للضباط والقوانين الحكومية.',
      bullets: [
        'السلطة التقديرية الحصرية: تملك دوائر الهجرة الرسمية السلطة المطلقة في فحص والموافقة على أو رفض أي طلب تأشيرة.',
        'عدم تقديم ضمانات مطلقة: لا يمكن لأي مستشار أو محامٍ تقديم ضمان قانوني بالقبول، وأي ادعاء بضمان القبول يعد مضللاً.',
        'تغير السياسات الحكومية: لا تتحمل الشركة مسؤولية أي تعديلات مفاجئة في القوانين أو متطلبات النقاط التي تقرها الحكومات بعد التقديم.',
      ],
    },
    {
      id: 'fees',
      title: '٤. أتعاب الاستشارة وجدول السداد والاسترداد',
      desc: 'تعتمد هيكلة أتعاب الاستشارة على مراحل إنجاز واضحة لضمان الشفافية والمصداقية طوال فترة الإجراءات.',
      bullets: [
        'الأتعاب المهنية: تغطي خدمات التدقيق، إعداد المذكرات القانونية، ومتابعة المعاملة كما هو موضح في العقد.',
        'الرسوم الحكومية ورسوم الطرف الثالث: تُدفع رسوم التأشيرات الحكومية والفحوصات الطبية مباشرة للجهات المختصة.',
        'سياسة الاسترداد: تخضع أي طلبات استرداد للشروط والجداول المنصوص عليها تفصيلاً في اتفاقية العميل الموقعة.',
      ],
    },
    {
      id: 'liability',
      title: '٥. حدود المسؤولية والقوة القاهرة',
      desc: 'تحدد الشركة مسؤوليتها التشغيلية إلى أقصى حد تسمح به القوانين والأنظمة المعمول بها.',
      bullets: [
        'الأضرار غير المباشرة: لا تتحمل الشركة مسؤولية الخسائر التبعية مثل حجوزات السفر أو قرارات الاستقالة الوظيفية.',
        'القوة القاهرة: لا يتحمل أي من الطرفين مسؤولية التأخير الناتج عن إغلاق السفارات أو الظروف الطارئة الخارجة عن السيطرة.',
      ],
    },
    {
      id: 'governing-law',
      title: '٦. القانون الحاكم وتسوية النزاعات',
      desc: 'تخضع هذه الشروط وكافة اتفاقيات الخدمات الاستشارية لأحكام القوانين والأنظمة المحددة في اتفاقية التمثيل الخاصة بكم.',
      bullets: [
        'التسوية الودية: يتفق الطرفان على السعي لحل أي خلافات عبر الوساطة الودية قبل اتخاذ أي إجراءات قضائية.',
        'التحكيم المهني: تُحال النزاعات غير المحلولة إلى هيئات التحكيم المعتمدة وفق اللوائح النظامية السارية.',
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
            <span aria-current="page">{isArabic ? 'شروط الخدمة' : 'Terms of Service'}</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">
              {isArabic ? 'الشؤون القانونية والحوكمة' : 'Legal & Governance'}
            </span>
            <h1 className="page-head__title">
              {isArabic ? 'شروط وأحكام الخدمة' : 'Terms of Service'}
            </h1>
            <p className="page-head__lede">
              {isArabic
                ? 'يرجى قراءة هذه الشروط والأحكام بدقة قبل الدخول في اتفاقيات التمثيل أو طلب تقييم ملفات الهجرة والتأشيرات.'
                : 'Effective Date: September 2026. Please review these governing terms and conditions prior to executing consultancy agreements or requesting profile evaluations.'}
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
              {isArabic ? 'أقسام الشروط' : 'Terms Navigation'}
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
                {isArabic ? 'هل تحتاج إلى توضيح بشأن شروط التمثيل؟' : 'Need clarification on retainer terms?'}
              </h3>
              <p className="legal-contact-card__desc">
                {isArabic
                  ? 'فريق الاستشارات القانونية لدينا متاح لتوضيح كافة بنود اتفاقية الخدمات ومساعدتكم في كل خطوة.'
                  : 'Our legal advisory team is available to walk you through the details of our service representation agreement.'}
              </p>
              <div className="legal-contact-card__links">
                <Link href="/contact">
                  {isArabic ? 'تواصل مع القسم القانوني' : 'Contact Legal Department'}
                </Link>
                <span>•</span>
                <Link href="/#consultation">
                  {isArabic ? 'احجز استشارة مجانية' : 'Book a Consultation'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
