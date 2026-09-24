import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Guidelines | HOF Migration',
  description:
    'Design standards, color palette, typography specimens, and logo assets for HOF Migration.',
}

const SWATCHES = [
  { step: '50', hex: '#f7faf9', label: 'Canvas light', color: '#1a332d' },
  { step: '100', hex: '#f1f8f6', label: 'Hero tint', color: '#1a332d' },
  { step: '200', hex: '#e0efeb', label: 'Ramp stop', color: '#1a332d' },
  { step: '300', hex: '#b5d4cc', label: '', color: '#1a332d' },
  { step: '400', hex: '#8daba4', label: 'Primary brand', color: '#10201c' },
  { step: '500', hex: '#66998d', label: '', color: '#ffffff' },
  { step: '600', hex: '#518579', label: '', color: '#ffffff' },
  { step: '700', hex: '#406d63', label: '', color: '#ffffff' },
  { step: '800', hex: '#2e564d', label: 'Chip ink', color: '#ffffff' },
  { step: '900', hex: '#20322e', label: '', color: '#cbe2dc' },
  { step: '950', hex: '#0b1311', label: 'Dark hero', color: '#abc9c2' },
]

export default function BrandingPage() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Branding</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">Visual Identity</span>
            <h1 className="page-head__title">HOF Migration Brand Guidelines</h1>
            <p className="page-head__lede">
              The color tokens, typography scales, and logo lockups defining HOF Migration’s visual
              identity across print and digital media.
            </p>
          </div>
        </div>
      </div>

      <main className="page-main py-12">
        <div className="wrap">
          {/* 01 Palette */}
          <section className="mb-16">
            <div className="block-head mb-8">
              <span className="block-head__num">01</span>
              <h2 className="block-head__title">Color Palette</h2>
              <p className="block-head__note">
                Rooted in sea-green #8DABA4, providing clear contrast across light and dark
                interfaces.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
              {SWATCHES.map((swatch) => (
                <div
                  key={swatch.step}
                  className="flex flex-col justify-between rounded-xl p-4 shadow-sm"
                  style={{ backgroundColor: swatch.hex, color: swatch.color, minHeight: '120px' }}
                >
                  <b className="text-lg">{swatch.step}</b>
                  <div className="text-xs">
                    <span className="font-mono block">{swatch.hex}</span>
                    {swatch.label && <span className="opacity-80 block">{swatch.label}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 02 Typography */}
          <section className="mb-16">
            <div className="block-head mb-8">
              <span className="block-head__num">02</span>
              <h2 className="block-head__title">Typography</h2>
              <p className="block-head__note">
                Playfair Display for editorial gravitas, Plus Jakarta Sans for UI clarity, and Noto
                Sans Arabic for regional parity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
                <span className="text-5xl font-serif text-[#8daba4]">Aa</span>
                <h3 className="mt-4 text-2xl font-serif">Playfair Display</h3>
                <p className="text-xs uppercase tracking-wider text-gray-500">Headlines &amp; Quotes</p>
                <p className="mt-4 font-serif text-xl italic">
                  &ldquo;Your right migration starts with the right guidance&rdquo;
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
                <span className="text-5xl font-sans font-bold text-[#8daba4]">Aa</span>
                <h3 className="mt-4 text-2xl font-sans font-bold">Plus Jakarta Sans</h3>
                <p className="text-xs uppercase tracking-wider text-gray-500">Body &amp; Interface</p>
                <p className="mt-4 text-base">
                  Book a free consultation &mdash; no commitment required.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#1b1e24]">
                <span className="text-5xl font-sans font-bold text-[#8daba4]">Aa</span>
                <h3 className="mt-4 text-2xl font-sans font-bold">Noto Sans Arabic</h3>
                <p className="text-xs uppercase tracking-wider text-gray-500">Arabic Localization</p>
                <p className="mt-4 text-xl" dir="ltr">
                  Your right migration starts with the right guidance.
                </p>
              </div>
            </div>
          </section>

          {/* 03 Logos */}
          <section className="mb-16">
            <div className="block-head mb-8">
              <span className="block-head__num">03</span>
              <h2 className="block-head__title">Logo Lockups</h2>
              <p className="block-head__note">
                Engineered for crisp vector reproduction on high-DPI displays.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-[#f7faf9] p-12 shadow-sm">
                <span className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Light Background
                </span>
                <img
                  src="/assets/icons-v2/logo-brand.svg"
                  alt="HOF Migration Logo"
                  className="max-h-16"
                />
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-[#0b1311] p-12 shadow-sm">
                <span className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Dark Background
                </span>
                <img
                  src="/assets/icons-v2/logo-brand-white.svg"
                  alt="HOF Migration Logo Dark"
                  className="max-h-16"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
