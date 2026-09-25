'use client'

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
      desc: 'Your data is processed strictly under statutory legal bases including contract performance, legitimate advisory interest, and regulatory compliance with official migration bodies (such as MARA and CICC).',
      bullets: [
        'Assessing qualification thresholds for points-based Express Entry, PNP, and subclass visas.',
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
        'End-to-End Encryption: Sensitive files and communications are encrypted in transit (TLS 1.3) and at rest (AES-256).',
        'Strict Access Control: Information access is restricted exclusively to senior case managers and assigned legal advisors.',
        'Zero Data Sale Guarantee: We NEVER sell, rent, monetize, or trade client personal information to marketing networks or third parties.',
      ],
    },
    {
      id: 'disclosures',
      title: '4. Third-Party Sharing & Regulatory Disclosures',
      desc: 'Personal information is only shared with third parties under explicit operational necessity or statutory compulsion.',
      bullets: [
        'Official Immigration Authorities: IRCC (Canada), Department of Home Affairs (Australia), USCIS (United States), and relevant European embassies.',
        'Authorized Assessment Bodies: Educational credential evaluators (WES, IQAS) and skills assessment authorities (ACS, Engineers Australia, VETASSESS).',
        'Legal & Financial Partners: Certified translators, notarization agents, and secure escrow payment processors.',
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
      desc: 'Under applicable privacy legislation (including GDPR principles and international client protection frameworks), you hold comprehensive rights regarding your personal information.',
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
      title: '١. المعلومات التي نجمعها',
      desc: 'لتقديم خدمات استشارية مخصصة للهجرة، وتقييم الأهلية القانونية، وإعداد ملفات التأشيرات الرسمية، تجمع HOF Migration البيانات الشخصية والمهنية مباشرة من العملاء.',
      bullets: [
        'البيانات التعريفية: الاسم القانوني الكامل، تاريخ الميلاد، تفاصيل جواز السفر، الجنسية، وبيانات الاتصال.',
        'المؤهلات الأكاديمية والمهنية: السير الذاتية، الشهادات الجامعية، كشوف الدرجات، والخبرات الوظيفية.',
        'الإثباتات المالية والمدنية: كشوف الحسابات البنكية، إثبات الملاءة المالية، ووثائق الحالة المدنية للأسرة.',
        'سجلات الاستشارات: المراسلات المكتوبة، استمارات التقييم الأولي، والملاحظات المستخلصة أثناء جلسات العمل.',
      ],
    },
    {
      id: 'processing',
      title: '٢. الأساس القانوني وأغراض المعالجة',
      desc: 'تتم معالجة بياناتكم وفق أسس قانونية صارمة تشمل تنفيذ العقود، المصالح المهنية المشروعة، والامتثال لهيئات تنظيم الهجرة الدولية المعتمدة (مثل MARA و CICC).',
      bullets: [
        'حساب نقاط التأهيل لبرامج الدخول السريع (Express Entry) والترشيح الإقليمي (PNP).',
        'إعداد وتقديم طلبات الهجرة والتأشيرات لدى الجهات والوزارات الحكومية المختصة.',
        'إبلاغكم بمستجدات الملف، طلبات المستندات الإضافية، ومواعيد سداد الرسوم الحكومية.',
        'الالتزام بمتطلبات التدقيق القانوني الإلزامية لمكاتب الهجرة المرخصة رسمياً.',
      ],
    },
    {
      id: 'confidentiality',
      title: '٣. سرية البيانات وبروتوكولات الحماية',
      desc: 'تلتزم HOF Migration بأعلى معايير السرية المؤسسية وحماية الخصوصية وفق ميثاق الشرف المهني، وتعتمد أحدث التدابير الأمنية المتقدمة.',
      bullets: [
        'التشفير الشامل: حماية الملفات والمراسلات الحساسة عبر بروتوكولات تشفير معتمدة عالمياً (TLS 1.3 و AES-256).',
        'صلاحيات وصول مقيدة: حصر الاطلاع على الملفات لمديري الحالات والمستشارين القانونيين المعينين لملفكم فقط.',
        'ضمانة عدم البيع: نحن لا نبيع ولا نؤجر أو نتاجر ببيانات العملاء مع أي شركات إعلانية أو جهات خارجية إطلاقاً.',
      ],
    },
    {
      id: 'disclosures',
      title: '٤. مشاركة البيانات مع الجهات الرسمية',
      desc: 'لا تتم مشاركة البيانات الشخصية إلا عند الضرورة التشغيلية أو الامتثال القانوني والإجرائي المطلوب لمعاملتكم.',
      bullets: [
        'هيئات الهجرة الحكومية: إدارة الهجرة الكندية (IRCC)، الهجرة الأسترالية، دائرة خدمات الهجرة الأمريكية (USCIS)، والسفارات المعنية.',
        'جهات تقييم المؤهلات: مؤسسات المعادلة الأكاديمية (WES) وهيئات الاعتماد المهني التخصصية.',
        'الشركاء القانونيون: المترجمون المحلفون المعتمدون، وجهات التصديق والتوثيق القانوني.',
      ],
    },
    {
      id: 'retention',
      title: '٥. حفظ البيانات والإتلاف الرقمي الآمن',
      desc: 'تُحفظ ملفات العملاء بأمان طوال فترة المعاملة، ويتم الاحتفاظ بها بعد الإنجاز للفترات القانونية المحددة للتدقيق المهني.',
      bullets: [
        'الملفات النشطة: تُحفظ حتى صدور القرار النهائي للتأشيرة واكتمال خدمات الاستقرار.',
        'الملفات المؤرشفة: تُحفظ لمدة تصل إلى ٧ سنوات للامتثال لمتطلبات السجلات القانونية للمستشارين المرخصين.',
        'الإتلاف الآمن: يتم محو وتدمير الملفات الرقمية بشكل نهائي ومشفر بعد انقضاء المدة النظامية.',
      ],
    },
    {
      id: 'rights',
      title: '٦. حقوقكم القانونية في حماية البيانات',
      desc: 'بموجب تشريعات حماية الخصوصية العالمية، تتمتعون بكامل الحقوق في إدارة بياناتكم الشخصية المسجلة لدينا.',
      bullets: [
        'حق الاطلاع والتصحيح: طلب نسخة من بياناتكم أو تحديث وتعديل أي تفاصيل غير دقيقة في أي وقت.',
        'حق الحذف: طلب محو السجلات غير الإلزامية قانونياً عند انتهاء الحاجة لخدمات التمثيل.',
        'حق الاعتراض: إلغاء الاشتراك في الرسائل الإخبارية أو التحديثات العامة غير المرتبطة مباشرة بملفكم.',
      ],
    },
  ]

  const sections = isArabic ? sectionsAr : sectionsEn

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
                ? 'توضح هذه الوثيقة الشاملة كيفية جمع وحماية ومعالجة البيانات الشخصية لعملاء HOF Migration وفق المعايير المهنية الدولية.'
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
                <a key={sec.id} href={`#${sec.id}`} className="legal-sidebar__link">
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

            {/* Privacy Contact Card */}
            <div className="legal-contact-card">
              <h3 className="legal-contact-card__title">
                {isArabic ? 'هل لديك أي استفسار بشأن خصوصية بياناتك؟' : 'Have questions regarding your data privacy?'}
              </h3>
              <p className="legal-contact-card__desc">
                {isArabic
                  ? 'فريق الامتثال وحماية البيانات لدينا جاهز للإجابة على جميع استفساراتكم ومساعدتكم في إدارة حقوق الخصوصية.'
                  : 'Our designated Data Protection Officer is available to handle inquiries, record updates, and compliance requests.'}
              </p>
              <div className="legal-contact-card__links">
                <a href="mailto:privacy@hofmigration.com">
                  ✉ privacy@hofmigration.com
                </a>
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
