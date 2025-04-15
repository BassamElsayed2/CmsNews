export default {
    name: 'adsSection',
    title: 'adsSection',
    type: 'document',
    fields: [
      {
        name: 'ads',
        title: 'Ads',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
              },
              {
                name: 'title',
                title: 'Title',
                type: 'object',
                fields: [
                  { name: 'ar', title: 'عربي', type: 'string' },
                  { name: 'en', title: 'إنجليزي', type: 'string' },
                ],
              },
              {
                name: 'description',
                title: 'Description',
                type: 'object',
                fields: [
                  { name: 'ar', title: 'عربي', type: 'text' },
                  { name: 'en', title: 'إنجليزي', type: 'text' },
                ],
              },
              {
                name: 'link',
                title: 'Link',
                type: 'string',
                
              },
            ],
          },
        ],
        validation: (Rule) =>
          Rule.max(4).error('الحد الأقصى لعدد الإعلانات هو 4 فقط'),
      },
    ],
  }
  