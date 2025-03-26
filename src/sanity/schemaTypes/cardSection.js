export default {
  name: "card",
  title: "Card Section",
  type: "document",
  fields: [
    {
      name: "appear",
      title: "Card_Section",
      type: "boolean",
      initialValue: true,
      description: "Cancel check  if the card should not be appear.",
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
      name: "mainImage",
      title: "Main Image",
      type: "image",

      validation: (Rule) => Rule.required().error("الصورة الرئيسية مطلوبة"),
    },
    {
      name: "AnimatedImageOne",
      title: "Animated Image One",
      type: "image",
    },
    {
      name: "AnimatedImagetwo",
      title: "AnimatedImagetwo",
      type: "image",
    },
  ],
};
