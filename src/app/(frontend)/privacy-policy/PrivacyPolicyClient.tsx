'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'

export function PrivacyPolicyClient() {
  const { isArabic } = useI18n()

  const sectionsEn = [
    {
      id: 'collection',
      title: '1. Information We Collect',
      desc: 'To deliver tailored immigration advisory services, perform eligibility evaluations, and prepare official petitions, HOF Migration collects biographical, contact, identity, educational, and professional background details directly from clients.',
      bullets: [
        'Personal Identifiers: Full legal name, date of birth, passport details, nationality, and contact info.',
        'Professional & Academic Background: Resumes, degrees, transcripts, employment history, and professional licenses.',
        'Financial & Civil Proof: Bank statements, proof of funds, marriage/family certificates where relevant for visa subclass eligibility.',
        'Consultation Logs: Written correspondence, intake forms, and case history notes compiled during client interviews.',
      ],
    },
    {
      id: 'processing',
      title: '2. Legal Basis & Purpose of Processing',
      desc: 'Your data is processed strictly under statutory legal bases including contract performance, legitimate advisory interest, and regulatory compliance with official migration bodies.',
      bullets: [
        'Assessing qualification thresholds for points-based Express Entry, provincial nominee programs, and subclass visas.',
        'Preparing and lodging formal visa applications with official government immigration departments.',
        'Communicating timeline updates, document requests, and statutory fee payments.',
        'Fulfilling mandatory audit compliance mandated by certified immigration regulatory authorities.',
      ],
    },
    {
      id: 'confidentiality',
      title: '3. Data Confidentiality & Protection Protocols',
      desc: 'HOF Migration maintains strict institutional confidentiality standards aligned with professional codes of conduct. Client files are safeguarded using enterprise-grade technical and organizational measures.',
      bullets: [
        'End-to-End Encryption: Sensitive files and communications are encrypted in transit and at rest using modern cryptography.',
        'Strict Access Control: Information access is restricted exclusively to senior case managers and assigned legal advisors.',
        'Zero Data Sale Guarantee: We NEVER sell, rent, monetize, or trade client personal information to marketing networks or third parties.',
      ],
    },
    {
      id: 'disclosures',
      title: '4. Third-Party Sharing & Regulatory Disclosures',
      desc: 'Personal information is only shared with third parties under explicit operational necessity or statutory compulsion.',
      bullets: [
        'Official Immigration Authorities: Department of Immigration in Canada, Australia, the United States, and relevant European embassies.',
        'Authorized Assessment Bodies: Educational credential evaluators and skills assessment authorities.',
        'Legal & Financial Partners: Certified translators, notarization agents, and secure payment processors.',
      ],
    },
    {
      id: 'retention',
      title: '5. Data Retention & Digital Erasure',
      desc: 'Client records are stored safely throughout the duration of active case handling and retained following case completion in compliance with statutory audit periods mandated by law.',
      bullets: [
        'Active Files: Retained until final visa determination, landing support, or retainer conclusion.',
        'Archived Files: Kept securely for up to 7 years to meet statutory recordkeeping standards for licensed migration practices.',
        'Secure Shredding: Digital files are scrubbed using cryptographic erasure protocols upon expiration of the mandatory retention window.',
      ],
    },
    {
      id: 'rights',
      title: '6. Your Rights as a Data Subject',
      desc: 'Under applicable privacy legislation and international client protection frameworks, you hold comprehensive rights regarding your personal information.',
      bullets: [
        'Right to Access & Rectification: Request copies of your personal file or correct inaccuracies at any time.',
        'Right to Erasure: Request deletion of non-statutory records when processing is no longer required.',
        'Right to Object: Opt-out of non-essential operational announcements or marketing correspondence.',
      ],
    },
  ]

  const sectionsAr = [
    {
      id: 'collection',
      title: '١. المعلومات التي نقوم بجمعها',
      desc: 'لتقديم خدمات استشارية مخصصة للهجرة، وتقييم الأهلية القانونية، وإعداد ملفات التأشيرات الرسمية، تقوم الشركة بجمع البيانات الشخصية، المهنية، والأكاديمية مباشرة من العميل.',
      bullets: [
        'البيانات التعريفية الأساسية: الاسم القانوني الكامل، تاريخ الميلاد، بيانات جواز السفر، الجنسية، ومعلومات التواصل الرسمية.',
        'المؤهلات الأكاديمية والخبرات المهنية: السير الذاتية، الشهادات الجامعية، كشوف الدرجات والخبرات المهنية السابقة.',
        'الإثباتات المالية والمدنية: كشوفات الحسابات المصرفية، إثبات الملاءة المالية، والوثائق العائلية اللازمة لمعايير التأشيرة.',
        'سجلات الجلسات الاستشارية: المراسلات المكتوبة، استمارات تقييم الملف، والملاحظات المستخلصة أثناء دراسة الحالة.',
      ],
    },
    {
      id: 'processing',
      title: '٢. الأساس القانوني وأهداف المعالجة',
      desc: 'تتم معالجة بياناتكم وفق أسس نظامية صارمة تشمل تنفيذ اتفاقيات التمثيل، المصالح المهنية المشروعة، والامتثال لهيئات تنظيم الهجرة الدولية المعتمدة.',
      bullets: [
        'احتساب نقاط التأهيل لبرامج الهجرة السريعة، برامج الترشيح الإقليمي، ومسارات الإقامة القانونية.',
        'إعداد وصياغة وتقديم طلبات الهجرة والتأشيرات لدى الوزارات والجهات الحكومية المختصة.',
        'إبلاغكم بمستجدات المعاملة، طلبات الوثائق الإضافية، ومواعيد سداد الرسوم النظامية.',
        'الالتزام بمتطلبات التدقيق الإلزامية لمكاتب استشارات الهجرة المرخصة والمعتمدة دولياً.',
      ],
    },
    {
      id: 'confidentiality',
      title: '٣. سرية البيانات وبروتوكولات الأمان',
      desc: 'تلتزم الشركة بأعلى درجات السرية المؤسسية والمهنية لحماية ملفات العملاء، بالاعتماد على تدابير تقنية وإجرائية متطورة لمنع أي وصول غير مصرح به.',
      bullets: [
        'التشفير الكامل للبيانات: تشفير الملفات والمراسلات أثناء النقل والتخزين بأحدث تقنيات التشفير المعتمدة عالمياً.',
        'صلاحيات وصول محددة: قصر الاطلاع على الملفات لمديري الحالات والمستشارين القانونيين المخصصين لمتابعة ملفكم.',
        'ضمانة عدم مشاركة البيانات تجارياً: نلتزم بعدم بيع أو تأجير أو مشاركة بيانات العملاء مع أي جهات تسويقية أو أطراف خارجية.',
      ],
    },
    {
      id: 'disclosures',
      title: '٤. مشاركة البيانات مع الجهات الرسمية',
      desc: 'لا تتم مشاركة البيانات الشخصية إلا في الحدود الضرورية لتنفيذ الإجراءات الرسمية أو للامتثال للمتطلبات القانونية.',
      bullets: [
        'الجهات والوزارات الحكومية: دوائر الهجرة الرسمية في كندا، أستراليا، الولايات المتحدة الأمريكية، والسفارات الأوروبية.',
        'هيئات تقييم المؤهلات: مؤسسات المعادلة الأكاديمية والجهات المعتمدة لتقييم المهارات والخبرات التخصصية.',
        'الشركاء المهنيون المعتمدون: المترجمون القانونيون المحلفون، ومكاتب التوثيق والتصديق العدلي.',
      ],
    },
    {
      id: 'retention',
      title: '٥. فترات الحفظ والإتلاف الآمن',
      desc: 'تُحفظ ملفات العملاء بأمان طوال فترة معالجة المعاملة، ويتم الاحتفاظ بها للفترات النظامية المحددة للامتثال لمتطلبات التدقيق القانوني.',
      bullets: [
        'الملفات قيد المعالجة: تُحفظ حتى صدور القرار النهائي للتأشيرة واكتمال خدمات الاستقرار.',
        'الملفات المؤرشفة: تُحفظ بأمان لمدة تصل إلى سبع سنوات للامتثال لمتطلبات السجلات القانونية والتنظيمية.',
        'الإتلاف الرقمي الآمن: يتم محو وتدمير الملفات الرقمية بصورة نهائية ومشفرة بعد انتهاء مدة الحفظ القانونية.',
      ],
    },
    {
      id: 'rights',
      title: '٦. حقوقكم القانونية في الخصوصية',
      desc: 'وفقاً للأنظمة والتشريعات الدولية لحماية البيانات والخصوصية، يتمتع كل عميل بكامل الحقوق في إدارة بياناته الشخصية.',
      bullets: [
        'حق الاطلاع والتعديل: طلب نسخة من بياناتكم المسجلة وتصحيح أو تحديث أي معلومات في أي وقت.',
        'حق الحذف النهائي: طلب مسح السجلات غير الإلزامية قانونياً عند انتهاء خدمات التمثيل.',
        'حق الاعتراض: إلغاء الاشتراك في الرسائل الإخبارية أو التحديثات العامة غير المتعلقة بملفكم.',
      ],
    },
  ]

  const sections = isArabic ? sectionsAr : sectionsEn
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
            <span aria-current="page">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">
              {isArabic ? 'الشؤون القانونية والحوكمة' : 'Legal & Governance'}
            </span>
            <h1 className="page-head__title">
              {isArabic ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy'}
            </h1>
            <p className="page-head__lede">
              {isArabic
                ? 'توضح هذه الوثيقة الشاملة كيفية جمع وحماية ومعالجة البيانات الشخصية لعملائنا وفق أعلى المعايير المهنية والأمنية الدولية.'
                : 'Last updated: September 2026. This policy describes how HOF Migration collects, safeguards, and processes personal data provided during consultation and case representation.'}
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
              {isArabic ? 'أقسام السياسة' : 'Policy Navigation'}
            </div>
            <nav className="legal-sidebar__nav">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`legal-sidebar__link ${activeId === sec.id ? 'is-active' : ''} ${hoveredId === sec.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredId(sec.id)}
                  onMouseLeave={() => setHoveredId(null)}
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
              <section
                key={sec.id}
                id={sec.id}
                className={`legal-card ${hoveredId === sec.id ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredId(sec.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
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

            {/* Privacy Contact Card */}
            <div className="legal-contact-card">
              <h3 className="legal-contact-card__title">
                {isArabic ? 'هل لديك أي استفسار بشأن خصوصية بياناتك؟' : 'Have questions regarding your data privacy?'}
              </h3>
              <p className="legal-contact-card__desc">
                {isArabic
                  ? 'فريق الامتثال وحماية الخصوصية لدينا جاهز للإجابة على كافة استفساراتكم ومساعدتكم في ممارسة حقوقكم القانونية.'
                  : 'Our designated Data Protection Officer is available to handle inquiries, record updates, and compliance requests.'}
              </p>
              <div className="legal-contact-card__links">
                <Link href="/contact">
                  {isArabic ? 'تواصل مع فريق حماية الخصوصية' : 'Contact Privacy Team'}
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
