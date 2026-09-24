import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | HOF Migration',
  description: 'How HOF Migration collects, protects, and processes client information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">Legal</span>
            <h1 className="page-head__title">Privacy Policy</h1>
            <p className="page-head__lede">
              Last updated: September 2026. This policy describes how HOF Migration collects, uses,
              and protects personal data provided during consultation and case representation.
            </p>
          </div>
        </div>
      </div>

      <main className="page-main py-12">
        <div className="wrap max-w-3xl">
          <div className="prose dark:prose-invert space-y-6 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
            <p>
              When you request an eligibility assessment, submit a consultation inquiry, or engage our
              immigration advisory services, we collect relevant biographical, educational, employment,
              and identity information necessary to assess and prepare your migration file.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Purpose of Processing</h2>
            <p>
              Client records are used solely to assess qualification under statutory immigration
              frameworks, prepare petitions, communicate with government authorities, and keep you
              informed on regulatory updates.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Data Confidentiality</h2>
            <p>
              We maintain strict client confidentiality in compliance with ICCRC and MARA codes of
              professional conduct. Your personal documents are never sold, rented, or disclosed to
              third parties outside statutory filings.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
