/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { isPayloadAvailable } from '@/lib/payload-health'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const cmsUnavailableMessage =
  'CMS is currently unavailable. Please ensure PostgreSQL is running and DATABASE_URI is configured.'
const PAYLOAD_TIMEOUT_MS = 5000

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  if (!(await isPayloadAvailable())) {
    return {
      title: 'CMS Unavailable',
      description: cmsUnavailableMessage,
    }
  }

  try {
    const metadata = await Promise.race([
      generatePageMetadata({ config, params, searchParams }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('CMS database request timed out')), PAYLOAD_TIMEOUT_MS)
      }),
    ])

    return metadata
  } catch (error) {
    console.error('Payload admin metadata failed:', error)

    return {
      title: 'CMS Unavailable',
      description: cmsUnavailableMessage,
    }
  }
}

const Page = async ({ params, searchParams }: Args) => {
  if (!(await isPayloadAvailable())) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>CMS unavailable</h1>
        <p>{cmsUnavailableMessage}</p>
      </main>
    )
  }

  try {
    return await Promise.race([
      Promise.resolve(RootPage({ config, params, searchParams, importMap })),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('CMS database request timed out')), PAYLOAD_TIMEOUT_MS)
      }),
    ])
  } catch (error) {
    console.error('Payload admin page failed:', error)

    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>CMS unavailable</h1>
        <p>{cmsUnavailableMessage}</p>
      </main>
    )
  }
}

export default Page
