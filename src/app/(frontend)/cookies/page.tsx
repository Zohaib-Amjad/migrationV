import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | HOF Migration',
  description: 'Information regarding how cookies and local storage are utilized on this website.',
}

export default function CookiesPage() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Cookie Policy</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">Legal</span>
            <h1 className="page-head__title">Cookie Policy</h1>
            <p className="page-head__lede">
              This site utilizes essential local storage and minimal analytics to preserve user
              preferences such as theme and language selection.
            </p>
          </div>
        </div>
      </div>

      <main className="page-main py-12">
        <div className="wrap max-w-3xl">
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Functional Storage</h2>
            <p>
              We utilize browser localStorage solely to retain your UI theme (dark or light mode) and
              language preferences (English or Arabic) across visits without requiring login.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. No Third-Party Trackers</h2>
            <p>
              We do not sell user data to advertising networks or employ aggressive cross-site tracking
              pixels.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
