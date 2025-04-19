export default {
  name: "sliderHero",
  title: "sliderHero",
  type: "document",
  fields: [
    {
      name: "mainCards",
      title: "Slider",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "الصورة",
              type: "image",
              options: { hotspot: true },
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
                  name: "ar",
                  title: "عربي",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(20)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
                {
                  name: "en",
                  title: "إنجليزي",
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
              name: "description",
              title: "الوصف",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "text" },
                { name: "en", title: "إنجليزي", type: "text" },
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, { parent }) => parent?.title.en || "blog-details",
                slugify: (input) => {
                  const randomNum = Math.floor(1000 + Math.random() * 9000); // رقم بين 1000 و 9999
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
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(6).error("الحد الأقصى لعدد الكروت هو 6 فقط"),
    },
    {
      name: "sideCards",
      title: "Cards",
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
                  name: "ar",
                  title: "عربي",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(20)
                      .max(100)
                      .error("يجب أن يكون العنوان بين 100 و 20 حرفًا"),
                },
                {
                  name: "en",
                  title: "إنجليزي",
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
              name: "description",
              title: "الوصف",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "text" },
                { name: "en", title: "إنجليزي", type: "text" },
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, { parent }) =>
                  parent?.author_name?.en || "blog-details",
                slugify: (input) => {
                  const randomNum = Math.floor(1000 + Math.random() * 9000); // رقم بين 1000 و 9999
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
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().max(3).error("الحد الأقصى لعدد الكروت هو 3 فقط"),
    },
  ],
};
