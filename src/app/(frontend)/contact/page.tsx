import Link from 'next/link'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { getOffices, getPageContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Contact Us | HOF Migration',
  description:
    'Book a free consultation with our licensed immigration consultants in Dubai. Visit our offices or reach out via WhatsApp, phone, or email.',
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const [offices, contentData] = await Promise.all([getOffices(), getPageContent('contact')])
  const content = contentData as {
    hero?: { eyebrow?: string; titleLine1?: string; titleLine2?: string; lede?: string }
    cards?: { eyebrow: string; title: string; body: string; value: string; href: string }[]
    officesTitle?: string
  } | null
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">{content?.hero?.eyebrow || ''}</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">{content?.hero?.eyebrow || ''}</span>
            <h1 className="page-head__title">
              {content?.hero?.titleLine1 || ''}
              <br />
              {content?.hero?.titleLine2 || ''}
            </h1>
            <p className="page-head__lede">{content?.hero?.lede || ''}</p>
          </div>
        </div>
      </div>

      <main className="page-main py-12">
        <div className="wrap mb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(content?.cards || []).map((card) => (
              <div key={card.eyebrow} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8daba4]">{card.eyebrow}</span>
                <h3 className="mt-2 text-xl font-bold">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{card.body}</p>
                <a
                  href={card.href}
                  target={card.href.startsWith('https://') ? '_blank' : undefined}
                  rel={card.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                  className="mt-4 inline-block font-semibold text-gray-900 underline hover:text-[#8daba4] dark:text-white"
                >
                  {card.value}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">{content?.officesTitle || ''}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="rounded-xl border border-gray-100 bg-[#f7faf9] p-5 dark:border-gray-800 dark:bg-[#171a1e]"
                >
                  <b className="text-lg text-gray-900 dark:text-white">{office.city}</b>
                  <p className="text-xs font-medium text-[#8daba4]">{office.country}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{office.address}</p>
                  <p className="mt-2 text-xs font-mono text-gray-500">{office.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consultation Form */}
        <ConsultationForm />

        {/* Feedback Section */}
        <FeedbackSection />
      </main>
    </div>
  )
}
