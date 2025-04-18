export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "bg_img",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    },
    {
      name: "btn_text",
      title: "Button Text",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    },
    {
      name: "phones",
      title: "Phone Numbers",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    },
    {
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ar", title: "Arabic", type: "text" },
      ],
    },
    {
      name: "footer_links",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "name",
                      title: "Link Name",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    },
                    {
                      name: "link",
                      title: "URL",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "social_links",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "link",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
            },
            {
              name: "target",
              title: "Target",
              type: "string",
              options: {
                list: [
                  { title: "Same Tab", value: "_self" },
                  { title: "New Tab", value: "_blank" },
                ],
              },
            },
            {
              name: "icon",
              title: "Icon Class (FontAwesome)",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
