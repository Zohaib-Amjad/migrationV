import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const NewsletterSubscriptions: CollectionConfig = {
  slug: 'newsletter-subscriptions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
    group: 'Forms',
    description: 'Newsletter signups from the footer.',
  },
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
