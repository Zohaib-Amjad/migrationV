import type { Metadata } from 'next'
import { CookiesClient } from './CookiesClient'

export const metadata: Metadata = {
  title: 'Cookie Policy | HOF Migration',
  description: 'Understand how HOF Migration uses local storage and cookies to maintain preferences and ensure smooth site operation.',
}

export default function CookiesPage() {
  return <CookiesClient />
}
