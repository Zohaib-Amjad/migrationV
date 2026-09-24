import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
  ],
}
