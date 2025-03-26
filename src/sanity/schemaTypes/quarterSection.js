export default {
  name: "statsSection",
  title: "Statistics Section",
  type: "document",
  fields: [
    {
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
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
              name: "value",
              title: "Value (Number)",
              type: "number",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
