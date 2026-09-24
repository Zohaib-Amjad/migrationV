import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'square',
      options: [
        { label: 'Square', value: 'square' },
        { label: 'Portrait (3:4)', value: 'portrait' },
        { label: 'Landscape (3:2)', value: 'landscape' },
      ],
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        description: 'Optional blog post to link to. Falls back to /blog.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
