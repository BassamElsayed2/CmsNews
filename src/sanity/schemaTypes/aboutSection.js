export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "brandTitle",
      title: "Brand Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "brandparagraph",
      title: "Brand Paragraph",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
        },
      ],
    },
    {
      name: "brandimages",
      title: "Brand Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.min(1).error("يجب إضافة صورة واحدة على الأقل"),
    },
    {
      name: "aboutTitle",
      title: "About Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "aboutinfo",
      title: "About Info",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "en",
              title: "English",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "ar",
              title: "Arabic",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3).error("يمكنك إدخال 3 فقرات كحد أقصى"),
    },
  ],
};
