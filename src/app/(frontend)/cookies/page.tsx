import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | HOF Migration',
  description: 'Understand how HOF Migration uses local storage and cookies to maintain preferences and ensure smooth site operation.',
}

export default function CookiesPage() {
  const sections = [
    {
      id: 'overview',
      title: '1. What Are Cookies & Local Storage?',
      desc: 'Cookies and browser local storage are small text files or data key-values saved on your computer, smartphone, or tablet when you visit websites. They help websites remember your preferences, active settings, and browsing context across visits.',
      bullets: [
        'Cookies: Small data fragments sent from web servers and stored by your web browser.',
        'Local Storage: Modern HTML5 browser storage mechanism used to persist UI state (such as dark mode and language preference) without expiring on session end.',
      ],
    },
    {
      id: 'usage',
      title: '2. How HOF Migration Uses Local Storage',
      desc: 'HOF Migration uses browser storage strictly for functional UI preferences to provide a seamless browsing experience.',
      bullets: [
        'Theme Preference (`hof-theme`): Stores your selected visual theme (Light Mode or Dark Mode) so your preference is retained when navigating between pages.',
        'Language Preference (`hof-lang`): Stores your preferred language (English or Arabic) so the automated translation engine renders instantly without flash.',
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
      desc: 'Our website incorporates minimal essential third-party scripts to deliver security and media elements.',
      bullets: [
        'Google Fonts: Used for web typography rendering; no personal tracking cookies are placed.',
        'Payload CMS API: Handles secure form submissions and document intake; utilizes session cookies exclusively during administrative access.',
      ],
    },
    {
      id: 'managing',
      title: '5. Managing & Disabling Storage Settings',
      desc: 'You have complete control over how your browser handles cookies and local storage.',
      bullets: [
        'Browser Controls: You can clear, block, or receive alerts for cookies via your browser settings (Chrome, Safari, Firefox, Edge).',
        'Clearing Site Data: Clearing your browser history and site data for HOF Migration will reset theme and language toggles back to default.',
        'Impact of Disabling: Disabling essential local storage will cause theme and language selections to reset on every page refresh.',
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
            <span aria-current="page">Cookie Policy</span>
          </nav>
          <div className="page-head">
            <span className="page-head__eyebrow">Legal & Governance</span>
            <h1 className="page-head__title">Cookie Policy</h1>
            <p className="page-head__lede">
              Effective Date: September 2026. Learn how HOF Migration utilizes essential local storage and cookie technologies to preserve UI preferences and ensure optimal browsing performance.
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
                Cookie Navigation
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

            {/* Privacy Questions Box */}
            <div className="rounded-2xl bg-gradient-to-br from-[#179b66]/10 to-teal-500/10 border border-[#179b66]/30 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Questions about site storage?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                Review our comprehensive Privacy Policy or contact our technical operations team for additional assistance.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[#179b66]">
                <Link href="/privacy-policy" className="hover:underline">
                  View Privacy Policy
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
