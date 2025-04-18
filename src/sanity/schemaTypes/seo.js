export default {
  name: "seo",
  title: "SEO",
  type: "document",
  fields: [
    {
      name: "pageTitle",
      title: "عنوان الصفحة",
      type: "object",
      fields: [
        {
          name: "en",
          title: "العنوان بالإنجليزية",
          type: "string",
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .max(15)
              .error("يجب أن يكون العنوان بين 1 و 15 حرفًا"),
        },
        {
          name: "ar",
          title: "العنوان بالعربية",
          type: "string",
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .max(15)
              .error("يجب أن يكون العنوان بين 1 و 15 حرفًا"),
        },
      ],
    },
  ],
};
