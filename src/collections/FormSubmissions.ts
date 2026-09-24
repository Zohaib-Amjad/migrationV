import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: [
      'name',
      'email',
      'region',
      'occupation',
      'education',
      'destination',
      'createdAt',
    ],
    group: 'Forms',
    description: 'Contact form submissions from the website.',
  },
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'program',
      type: 'text',
    },
    {
      name: 'region',
      type: 'text',
    },
    {
      name: 'occupation',
      type: 'text',
    },
    {
      name: 'education',
      type: 'text',
    },
    {
      name: 'destination',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
