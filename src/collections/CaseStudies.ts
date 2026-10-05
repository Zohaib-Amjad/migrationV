import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientName', 'publishedDate', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'storyDetails',
      type: 'json',
      admin: {
        description: 'Story route, video caption, quote, narrative sections, and case facts.',
      },
    },
    {
      name: 'results',
      type: 'array',
      fields: [
        {
          name: 'stat',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
  ],
}
