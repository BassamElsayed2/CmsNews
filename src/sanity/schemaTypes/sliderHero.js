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
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "string" },
                { name: "en", title: "إنجليزي", type: "string" },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "text" },
                { name: "en", title: "إنجليزي", type: "text" },
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
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "string" },
                { name: "en", title: "إنجليزي", type: "string" },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "object",
              fields: [
                { name: "ar", title: "عربي", type: "text" },
                { name: "en", title: "إنجليزي", type: "text" },
              ],
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
        Rule.max(3).error("الحد الأقصى لعدد الكروت هو 3 فقط"),
    },
  ],
};
