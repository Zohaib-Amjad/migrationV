import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone, authenticated } from '../access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Describe the image for accessibility and SEO.',
      },
    },
  ],
}
