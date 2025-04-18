export default {
  name: "navMenu",
  title: "Navigation Menu",
  type: "document",
  fields: [
    {
      name: "blacklogo",
      title: "اللوجو الأسود",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "whitelogo",
      title: "اللوجو الأبيض",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "links",
      title: "روابط القائمة",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "العنوان",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "العنوان بالإنجليزية",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "ar",
                  title: "العنوم بالعربية",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((url) =>
                  url.startsWith("/") ? true : "The URL must start with '/'"
                ),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
};
