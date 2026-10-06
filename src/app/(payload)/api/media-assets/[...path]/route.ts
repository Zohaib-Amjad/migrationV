import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload-client'

interface RouteArgs {
  params: Promise<{ path: string[] }>
}

export async function GET(request: NextRequest, { params }: RouteArgs) {
  const { path } = await params
  const sourcePath = `/${path.join('/')}`

  if (!/^\/(assets|images)\/[\w./-]+$/.test(sourcePath) || sourcePath.includes('..')) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1,
      where: { sourcePath: { equals: sourcePath } },
    })
    const media = result.docs[0]

    if (!media?.url) return new NextResponse('Not found', { status: 404 })

    // Payload may persist an absolute URL using its configured serverURL (often
    // localhost:3000 in development). Keep the media path, but serve it through
    // the same host that handled this request so alternate dev ports and
    // production hostnames continue to work.
    const mediaPath = media.url.startsWith('http')
      ? `${new URL(media.url).pathname}${new URL(media.url).search}`
      : media.url
    const destination = new URL(mediaPath, request.url).toString()

    return NextResponse.redirect(destination, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch {
    return new NextResponse('Media service unavailable', { status: 503 })
  }
}
