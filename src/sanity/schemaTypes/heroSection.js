export default {
  name: "hero",
  title: "Hero Section",
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
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
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
              validation: (Rule) => Rule.uri({ allowRelative: true }),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(2).error("You can add up to 2 buttons."),
    },
    {
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image_animation",
      title: "Hero Image-Animation",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
