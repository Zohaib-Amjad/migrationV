import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | HOF Migration',
  description: 'Learn how HOF Migration collects, protects, processes, and stores client personal data in compliance with international privacy standards.',
}

export default function PrivacyPolicyPage() {
  const sections = [
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

  return (
    <div className="page-shell">
      {/* Page Header */}
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">Legal & Governance</span>
            <h1 className="page-head__title">Privacy Policy</h1>
            <p className="page-head__lede">
              Effective Date: September 2026. This comprehensive privacy statement details how HOF Migration collects, safeguards, and manages personal information across all consultancy engagements.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="page-main py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28 space-y-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 p-4 backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2 px-2">
                Policy Navigation
              </span>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-[#179b66] dark:hover:text-[#179b66] py-1.5 px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Sections List */}
          <div className="lg:col-span-3 space-y-8">
            {sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all hover:border-gray-300 dark:hover:border-gray-700"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {sec.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {sec.desc}
                </p>
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2.5">
                    {sec.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#179b66]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Contact / Data Officer Box */}
            <div className="rounded-2xl bg-gradient-to-br from-[#179b66]/10 to-teal-500/10 border border-[#179b66]/30 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Have questions regarding your data privacy?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                Our designated Privacy Compliance Officer is available to handle data inquiries, rights requests, and document erasure queries.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[#179b66]">
                <a href="mailto:privacy@hofmigration.com" className="hover:underline">
                  ✉ privacy@hofmigration.com
                </a>
                <span>•</span>
                <Link href="/#consultation" className="hover:underline">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
