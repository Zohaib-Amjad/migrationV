/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import { isPayloadAvailable } from '@/lib/payload-health'

const cmsUnavailableMessage =
  'CMS is currently unavailable. Please ensure PostgreSQL is running and DATABASE_URI is configured.'
const PAYLOAD_TIMEOUT_MS = 5000

async function handlePayloadRoute(
  handler: (...args: any[]) => Promise<Response> | Response,
  ...args: any[]
) {
  const payloadAvailable = await isPayloadAvailable()

  if (!payloadAvailable) {
    return Response.json({ error: cmsUnavailableMessage }, { status: 503 })
  }

  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('CMS database request timed out'))
    }, PAYLOAD_TIMEOUT_MS)
  })

  try {
    return await Promise.race([Promise.resolve(handler(...args)), timeout])
  } catch (error) {
    console.error('Payload route failed:', error)

    return Response.json(
      {
        error: cmsUnavailableMessage,
        ...(process.env.NODE_ENV === 'development'
          ? { details: error instanceof Error ? error.message : String(error) }
          : {}),
      },
      { status: 503 },
    )
  }
}

export const GET = async (...args: any[]) =>
  handlePayloadRoute(REST_GET(config), ...args)
export const POST = async (...args: any[]) =>
  handlePayloadRoute(REST_POST(config), ...args)
export const DELETE = async (...args: any[]) =>
  handlePayloadRoute(REST_DELETE(config), ...args)
export const PATCH = async (...args: any[]) =>
  handlePayloadRoute(REST_PATCH(config), ...args)

export const PUT = async (...args: any[]) =>
  handlePayloadRoute(REST_PUT(config), ...args)
export const OPTIONS = async (...args: any[]) =>
  handlePayloadRoute(REST_OPTIONS(config), ...args)


