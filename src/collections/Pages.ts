import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { CTA } from '../blocks/CTA/config'
import { Hero } from '../blocks/Hero/config'
import { Testimonials } from '../blocks/Testimonials/config'
import { TextImage } from '../blocks/TextImage/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, TextImage, Testimonials, CTA],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
