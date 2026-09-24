import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | HOF Migration',
  description: 'Terms and conditions governing advisory engagements, profile evaluations, and consultancy agreements with HOF Migration.',
}

export default function TermsPage() {
  const sections = [
    {
      id: 'scope',
      title: '1. Scope of Representation & Consultancy',
      desc: 'HOF Migration provides strategic consultancy, profile criteria evaluation, document authentication guidance, and authorized submission management for individuals seeking migration, study, or investment visas.',
      bullets: [
        'Advisory Boundary: Services are strictly limited to the agreed retainer scope outlined in your official Client Engagement Agreement.',
        'Regulatory Compliance: All consultations are performed in accordance with certified migration codes of conduct (including MARA and ICCRC regulatory standards).',
        'Independent Representation: HOF Migration acts as your legal/authorized consultant; we do not operate as a government agency or immigration department.',
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
      desc: 'While HOF Migration maintains rigorous accuracy standards and a industry-leading success rate, immigration outcome authority rests solely with statutory government officers.',
      bullets: [
        'Sole Authority: Government immigration officers hold absolute discretionary authority over visa approvals, interview requirements, and processing timelines.',
        'No Absolute Guarantees: No consultancy, lawyer, or agent can legally guarantee visa issuance. Any claims of guaranteed outcomes by third parties are fraudulent.',
        'Regulatory Policy Shifts: HOF Migration is not liable for changes in government migration policies, quota closures, or CRS score draw increases enacted after filing.',
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

  return (
    <div className="page-shell">
      {/* Page Header */}
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Terms of Service</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">Legal & Governance</span>
            <h1 className="page-head__title">Terms of Service</h1>
            <p className="page-head__lede">
              Effective Date: September 2026. Please review these governing terms and conditions prior to executing consultancy agreements or requesting profile evaluations.
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
                Terms Navigation
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

            {/* Questions Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-[#179b66]/10 to-teal-500/10 border border-[#179b66]/30 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Need clarification on retainer terms?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                Our legal advisory team is available to walk you through the details of our service representation agreement.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[#179b66]">
                <Link href="/contact" className="hover:underline">
                  Contact Legal Department
                </Link>
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
