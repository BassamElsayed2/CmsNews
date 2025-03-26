export default {
  name: "salesContent",
  title: "Sales Content",
  type: "document",
  fields: [
    {
      name: "appear",
      title: "Sales_Section",
      type: "boolean",
      initialValue: true,
      description: "Check this if the testimonial should be appear.",
    },
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    {
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Description",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic Description",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "yellow",
      title: "Yellow",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English ",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic ",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "blue",
      title: "Blue",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English ",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic ",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "green",
      title: "Green",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English ",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ar",
          title: "Arabic ",
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
      name: "AnimatedImage",
      title: "Animated Image One",
      type: "image",
    },
  ],
};
