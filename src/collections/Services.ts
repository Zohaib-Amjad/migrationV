import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
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
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'featured',
      options: [
        { label: 'Featured (homepage)', value: 'featured' },
        { label: 'Pathway (services page)', value: 'pathway' },
      ],
    },
    {
      name: 'numberLabel',
      type: 'text',
      admin: {
        description: 'Display number, e.g. [01] or 01',
        condition: (_, siblingData) => siblingData?.category === 'featured',
      },
    },
    {
      name: 'bullets',
      type: 'array',
      labels: {
        singular: 'Bullet',
        plural: 'Bullets',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.category === 'featured',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.category === 'featured',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional icon (SVG/PNG) for pathway cards.',
        condition: (_, siblingData) => siblingData?.category === 'pathway',
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
