import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | HOF Migration',
  description: 'Terms and conditions governing consultancy engagements with HOF Migration.',
}

export default function TermsPage() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Terms of Service</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">Legal</span>
            <h1 className="page-head__title">Terms of Service</h1>
            <p className="page-head__lede">
              Please read these terms before engaging HOF Migration for case assessment or
              immigration advisory services.
            </p>
          </div>
        </div>
      </div>

      <main className="page-main py-12">
        <div className="wrap max-w-3xl">
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Scope of Representation</h2>
            <p>
              HOF Migration provides consultancy, profile evaluation, document preparation, and
              authorized submission of immigration applications. All advisory services are carried out
              in accordance with registered codes of practice.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Assessment &amp; No Guarantee</h2>
            <p>
              While HOF Migration maintains rigorous accuracy standards and a proven track record,
              statutory authorities and immigration officers hold sole discretionary authority over
              visa grants. No consultancy can guarantee approval.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
