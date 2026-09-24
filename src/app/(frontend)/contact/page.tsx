import Link from 'next/link'
import type { Metadata } from 'next'
import { ConsultationForm } from '@/components/ConsultationForm'
import { FeedbackSection } from '@/components/FeedbackSection'
import { OFFICES } from '@/data/site-content'

export const metadata: Metadata = {
  title: 'Contact Us | HOF Migration',
  description:
    'Book a free consultation with our licensed immigration consultants in Dubai. Visit our offices or reach out via WhatsApp, phone, or email.',
}

export default function ContactPage() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Contact Us</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">Contact</span>
            <h1 className="page-head__title">
              Speak with a Licensed
              <br />
              Immigration Consultant
            </h1>
            <p className="page-head__lede">
              We review your profile honestly, outline your eligible pathways, and explain every step
              before any fee is discussed.
            </p>
          </div>
        </div>
      </div>

      <main className="page-main py-12">
        <div className="wrap mb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8daba4]">
                Email Us
              </span>
              <h3 className="mt-2 text-xl font-bold">General Inquiries</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Detailed profile assessments and general queries.
              </p>
              <a
                href="mailto:info@hofmigration.com"
                className="mt-4 inline-block font-semibold text-gray-900 underline hover:text-[#8daba4] dark:text-white"
              >
                info@hofmigration.com
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8daba4]">
                Call Us
              </span>
              <h3 className="mt-2 text-xl font-bold">Direct Line</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Speak with our client liaison team during UAE office hours.
              </p>
              <a
                href="tel:+97140000000"
                className="mt-4 inline-block font-semibold text-gray-900 underline hover:text-[#8daba4] dark:text-white"
              >
                +971 4 000 0000
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8daba4]">
                Instant Chat
              </span>
              <h3 className="mt-2 text-xl font-bold">WhatsApp Direct</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Quick questions and document verification status.
              </p>
              <a
                href="https://wa.me/971500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-semibold text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400"
              >
                +971 50 000 0000
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Our Global Presence</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OFFICES.map((office) => (
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
