export default {
  name: "seo",
  title: "SEO",
  type: "document",
  fields: [
    {
      name: "pageTitle",
      title: "Page Title",
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
      name: "favicon",
      title: "Favicon",
      type: "string",
    },
  ],
};
