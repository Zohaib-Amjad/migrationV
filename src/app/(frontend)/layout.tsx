import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import I18nProvider from '@/components/I18nProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'HOF Migration | Trusted Visa & Immigration Consultancy',
  description:
    'CICC- and MARA-certified immigration consultants in Dubai. Expert guidance for Canada Express Entry, Australia Skilled Visas, US EB-2 NIW, Study Abroad, and Europe Golden Visas.',
  icons: {
    icon: [{ url: '/assets/icons-v2/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/assets/icons-v2/favicon.svg',
    apple: '/assets/icons-v2/favicon.svg',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash theme & language script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('hof-theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('is-dark');
                  }
                  var savedLang = localStorage.getItem('hof-lang');
                  if (savedLang === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.setAttribute('lang', 'ar');
                  } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.setAttribute('lang', 'en');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <I18nProvider>
          <Navbar />
          <main className="w-full">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
