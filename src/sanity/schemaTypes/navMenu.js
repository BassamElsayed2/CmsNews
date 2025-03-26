export default {
  name: "navMenu",
  title: "Navigation Menu",
  type: "document",
  fields: [
    {
      name: "blacklogo",
      title: "Black Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "whitelogo",
      title: "white Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "links",
      title: "Menu Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
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
              title: "URL",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((url) =>
                  url.startsWith("/") ? true : "The URL must start with '/'"
                ),
            },
          ],
        },
      ],
    },
  ],
};
