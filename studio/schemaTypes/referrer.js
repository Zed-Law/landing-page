import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'referrer',
  title: 'Referrer',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description:
        'Shown to the referred visitor on the site, e.g. "{Display Name} referred you".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Sets the referral URL: zed.law/ref/{slug}. Usually the display name or a shortened version.',
      options: {
        source: 'displayName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discount',
      title: 'Discount (%)',
      type: 'number',
      description: 'Percentage off the first engagement, e.g. 10 for 10%.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'discount',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle != null ? `${subtitle}% off` : undefined,
      }
    },
  },
})
