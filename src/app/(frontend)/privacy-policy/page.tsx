import type { Metadata } from 'next'
import { PrivacyPolicyClient } from './PrivacyPolicyClient'

export const metadata: Metadata = {
  title: 'Privacy Policy | HOF Migration',
  description: 'How HOF Migration collects, protects, and processes client information in compliance with international data privacy standards.',
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
