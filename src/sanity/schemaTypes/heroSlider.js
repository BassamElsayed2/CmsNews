export default {
  name: "heroSlider",
  title: "heroSlider",
  type: "document",
  fields: [
    {
      name: "news",
      title: "News",
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
                source: (doc, { parent }) => parent?.title?.en || "news-main",
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
          ],
        },
      ],
    },
  ],
};
