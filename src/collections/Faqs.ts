import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'page', 'order', 'updatedAt'],
    group: 'Content',
    description:
      'FAQ accordion per page. Set page = Home for homepage only. Other pages show dummy content until you add FAQs for Contact / Services / etc.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Wrap words in double asterisks to bold them, e.g. Our **CICC-regulated** consultants…',
      },
    },
    {
      name: 'page',
      type: 'select',
      required: true,
      defaultValue: 'all',
      options: [
        { label: 'All pages', value: 'all' },
        { label: 'Home', value: 'home' },
        { label: 'Contact', value: 'contact' },
        { label: 'Services', value: 'services' },
        { label: 'Destinations', value: 'destinations' },
        { label: 'Visa Types', value: 'visa-types' },
      ],
      admin: {
        description:
          'Select the page where this FAQ should show. "All pages" shows it everywhere the FAQ section is used.',
        position: 'sidebar',
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
