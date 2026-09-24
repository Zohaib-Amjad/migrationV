import 'dotenv/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { CaseStudies } from './collections/CaseStudies'
import { Faqs } from './collections/Faqs'
import { FormSubmissions } from './collections/FormSubmissions'
import { Insights } from './collections/Insights'
import { Media } from './collections/Media'
import { NewsletterSubscriptions } from './collections/NewsletterSubscriptions'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    meta: {
      titleSuffix: '— HOF Migration',
    },
  },
  collections: [
    Pages,
    Posts,
    Insights,
    Services,
    Faqs,
    Testimonials,
    CaseStudies,
    FormSubmissions,
    NewsletterSubscriptions,
    Media,
    Users,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  editor: lexicalEditor(),
  globals: [Header, Footer, SiteSettings],
  plugins: [],
  secret: process.env.PAYLOAD_SECRET || 'change-me-to-a-long-random-string-hof-2026',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})