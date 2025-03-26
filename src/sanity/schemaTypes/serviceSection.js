export default {
  name: "service",
  title: "Service Section",
  type: "document",
  fields: [
    {
      name: "headerTitle",
      title: "Header Title",
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
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
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
          title: "Button URL",
          type: "string",
          validation: (Rule) => Rule.uri({ allowRelative: true }),
        },
      ],
    },
    {
      name: "mainCard",
      title: "Main Card",
      type: "object",
      fields: [
        { name: "icon", title: "Icon", type: "image" },
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
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: (doc, { parent }) => parent?.title?.en, // توليد الـ slug من العنوان الإنجليزي
            slugify: (input) =>
              input
                .toLowerCase()
                .replace(/\s+/g, "-") // استبدال المسافات بـ "-"
                .replace(/[^a-z0-9-]/g, "") // إزالة الرموز غير المسموح بها
                .slice(0, 90), // تحديد الحد الأقصى للطول
            isUnique: async (slug, { document, getClient }) => {
              const client = getClient({ apiVersion: "2023-01-01" });
              const exists = await client.fetch(
                `count(*[_type == $type && slug.current == $slug && _id != $id])`,
                { type: document._type, slug, id: document._id }
              );
              return exists === 0; // ✅ slug يكون فريدًا فقط إذا لم يكن موجودًا من قبل
            },
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Description",
          type: "object",
          fields: [
            {
              name: "en",
              title: "English",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "ar",
              title: "Arabic",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: "button",
          title: "Button",
          type: "object",
          fields: [
            {
              name: "text",
              title: "Button Text",
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
              title: "Button URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: "featureCards",
      title: "Feature Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "image" },
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
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, { parent }) => parent?.title?.en, // توليد الـ slug من العنوان الإنجليزي
                slugify: (input) =>
                  input
                    .toLowerCase()
                    .replace(/\s+/g, "-") // استبدال المسافات بـ "-"
                    .replace(/[^a-z0-9-]/g, "") // إزالة الرموز غير المسموح بها
                    .slice(0, 90), // تحديد الحد الأقصى للطول
                isUnique: async (slug, { document, getClient }) => {
                  const client = getClient({ apiVersion: "2023-01-01" });
                  const exists = await client.fetch(
                    `count(*[_type == $type && slug.current == $slug && _id != $id])`,
                    { type: document._type, slug, id: document._id }
                  );
                  return exists === 0; // ✅ slug يكون فريدًا فقط إذا لم يكن موجودًا من قبل
                },
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "header",
              title: "Header",
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
              name: "description",
              title: "Description",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(4).error("You must add at least 4 feature cards."),
    },
  ],
};
