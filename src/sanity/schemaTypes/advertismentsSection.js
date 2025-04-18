export default {
  name: "adsSection",
  title: "adsSection",
  type: "document",
  fields: [
    {
      name: "ads",
      title: "Ads",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "صورة",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "العنوان",
              type: "object",
              fields: [
                {
                  name: "ar",
                  title: "عربي",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(5)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
                {
                  name: "en",
                  title: "إنجليزي",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(5)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "التفاصيل",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "text" },
                { name: "en", title: "إنجليزي", type: "text" },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              title: "Link",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(4).error("الحد الأقصى لعدد الإعلانات هو 4 فقط"),
    },
  ],
};
