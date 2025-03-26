export default {
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    {
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "img",
              title: "Office Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "location",
              title: "Location",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            },
            {
              name: "address",
              title: "Address",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "text" },
                { name: "ar", title: "Arabic", type: "text" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "contact_data",
      title: "Contact Data",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
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
              name: "link",
              title: "Link",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            },
          ],
        },
      ],
    },
  ],
};
