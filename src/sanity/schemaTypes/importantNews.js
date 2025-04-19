export default {
  name: "importantNews",
  title: "Important News",
  type: "document",
  fields: [
    {
      name: "news",
      title: "الاخبار الهامة",
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
                      .min(1)
                      .max(100)
                      .error("يجب الا يزيد عن 30 حرف"),
                },
                {
                  name: "en",
                  title: "إنجليزي",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(100)
                      .error("يجب الا يزيد عن 30 حرف"),
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
        Rule.max(6).error("الحد الأقصى لعدد الإعلانات هو 4 فقط"),
    },
  ],
};
