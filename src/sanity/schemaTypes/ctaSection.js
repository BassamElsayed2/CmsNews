export default {
  name: "cta",
  title: "Cta Section",
  type: "document",
  fields: [
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
  ],
};
