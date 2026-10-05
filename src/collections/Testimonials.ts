import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'role', 'order', 'updatedAt'],
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
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title or role shown under the name.',
      },
    },
    {
      name: 'initial',
      type: 'text',
      admin: {
        description: 'First letter or initial shown in the avatar if no image is uploaded.',
      },
    },
    {
      name: 'avatarBg',
      type: 'text',
      defaultValue: '#224036',
      admin: {
        description: 'Hex color for avatar background, e.g. #224036 or #3B82F6',
      },
    },
    {
      name: 'platform',
      type: 'select',
      defaultValue: 'Google',
      options: [
        { label: 'Google', value: 'Google' },
        { label: 'Trustpilot', value: 'Trustpilot' },
      ],
    },
    {
      name: 'date',
      type: 'text',
      admin: {
        description: 'Relative date string, e.g. "2 weeks ago"',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
