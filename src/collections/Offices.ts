import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Offices: CollectionConfig = {
  slug: 'offices',
  labels: { singular: 'Office', plural: 'Offices' },
  admin: { useAsTitle: 'city', defaultColumns: ['city', 'country', 'order'], group: 'Content' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'city', type: 'text', required: true },
    { name: 'country', type: 'text', required: true },
    { name: 'address', type: 'textarea', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
