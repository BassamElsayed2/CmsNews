export default {
  name: "news",
  title: "News Section",
  type: "document",
  fields: [
    // ===== Other Cards =====
    {
      name: "otherCards",
      title: "الاخبار",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "الصوره",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "otherImages",
              title: " صور أخرى",
              type: "array",
              of: [
                {
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
            {
              name: "title",
              title: "العنوان",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "العنوان بالانجليزية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(20)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
                {
                  name: "ar",
                  title: "العنوان بالعربية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(20)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, { parent }) => parent?.title?.en || "news-item",
                slugify: (input) => {
                  const randomNum = Math.floor(1000 + Math.random() * 9000);
                  return `${input
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}-${randomNum}`.slice(0, 90);
                },
                isUnique: async (slug, { document, getClient }) => {
                  const client = getClient({ apiVersion: "2023-01-01" });
                  const exists = await client.fetch(
                    `count(*[_type == $type && slug.current == $slug && _id != $id])`,
                    { type: document._type, slug, id: document._id }
                  );
                  return exists === 0;
                },
              },
              validation: (Rule) => Rule.required(),
            },

            {
              name: "description",
              title: "الوصف",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "الوصف بالانجليزية",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "ar",
                  title: "الوصف بالعربية",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "details",
              title: "التفاصيل",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "markdown" },
                { name: "en", title: "إنجليزي", type: "markdown" },
              ],
            },
            {
              name: "category",
              title: "التصنيف",
              type: "reference",
              to: [{ type: "category" }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(4).error("You must add at least 4 feature cards."),
    },

    // ===== Slider Cards =====
    {
      name: "sliderCards",
      title: "Slider Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "الصوره",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "otherImages",
              title: " صور أخرى",
              type: "array",
              of: [
                {
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
            {
              name: "title",
              title: "العنوان",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "العنوان بالانجليزية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(20)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
                {
                  name: "ar",
                  title: "العنوان بالعربية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(20)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, { parent }) => parent?.title?.en || "slider-card",
                slugify: (input) => {
                  const randomNum = Math.floor(1000 + Math.random() * 9000);
                  return `${input
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}-${randomNum}`.slice(0, 90);
                },
                isUnique: async (slug, { document, getClient }) => {
                  const client = getClient({ apiVersion: "2023-01-01" });
                  const exists = await client.fetch(
                    `count(*[_type == $type && slug.current == $slug && _id != $id])`,
                    { type: document._type, slug, id: document._id }
                  );
                  return exists === 0;
                },
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "الوصف",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "الوصف بالانجليزية",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "ar",
                  title: "الوصف بالعربية",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "details",
              title: "التفاصيل",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "markdown" },
                { name: "en", title: "إنجليزي", type: "markdown" },
              ],
            },
            {
              name: "category",
              title: "التصنيف",
              type: "reference",
              to: [{ type: "category" }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
