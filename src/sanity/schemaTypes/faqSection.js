export default {
  name: "faq",
  title: "Faq Section",
  type: "document",
  fields: [
    {
      name: "appear",
      title: "faq_Section",
      type: "boolean",
      initialValue: true,
      description: "Cancel check  if the section should not be appear.",
    },
    {
      name: "subTitle",
      title: "SubTitle",
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
      name: "headerTitle",
      title: "Header Title",
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
      name: "paragraph",
      title: "Paragraph",
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
    {
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
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
          name: "url",
          title: "Button URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "Image",
      title: " Image",
      type: "image",
    },
    {
      name: "queAndAns",
      title: "QueAndAns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            },
            {
              name: "ansower",
              title: "Ansower",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).error("يجب إضافة 3 اسئله  على الأقل"),
    },
  ],
};
