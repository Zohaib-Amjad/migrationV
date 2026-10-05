import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team Member', plural: 'Team Members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'group', 'order', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'role', type: 'text', required: true },
    { name: 'initials', type: 'text' },
    { name: 'mono', type: 'text' },
    { name: 'short', type: 'textarea' },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Core team', value: 'core' },
      ],
    },
    { name: 'facts', type: 'json' },
    { name: 'prose', type: 'json' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
