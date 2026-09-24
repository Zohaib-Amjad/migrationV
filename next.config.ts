import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
      {
        pathname: '/assets/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/destinations',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/destinations/:path*',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/visa-types',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/visa-types/:path*',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/pricing',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/resources',
        destination: '/services',
        permanent: false,
      },
      {
        source: '/case-studies',
        destination: '/success-stories',
        permanent: false,
      },
      {
        source: '/case-studies/:path*',
        destination: '/success-stories',
        permanent: false,
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
