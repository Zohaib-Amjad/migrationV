import type { Metadata } from 'next'
import { TermsClient } from './TermsClient'

export const metadata: Metadata = {
  title: 'Terms of Service | HOF Migration',
  description: 'Terms and conditions governing advisory engagements, profile evaluations, and consultancy agreements with HOF Migration.',
}

export default function TermsPage() {
  return <TermsClient />
}
