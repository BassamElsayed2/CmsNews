export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "appear",
      title: "Blog_Section",
      type: "boolean",
      initialValue: true,
      description: "Check this if the testimonial should be appear.",
    },
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "posts",
      title: "Blog Posts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "img",
              title: "صورة",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "category",
              title: "التصنيف",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "التصنيف بالانجليزية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(30)
                      .error("يجب الا يزيد عن 30 حرف"),
                },
                {
                  name: "ar",
                  title: "التصنيف بالعربية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(30)
                      .error("يجب الا يزيد عن 30 حرف"),
                },
              ],
            },
            {
              name: "date",
              title: "تاريخ النشر",
              type: "date",
              validation: (Rule) => Rule.required(),
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
              name: "author_img",
              title: "صورة الناشر",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author_name",
              title: "اسم الناشر",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "الاسم بالانجليزية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(30)
                      .error("يجب الا يزيد عن 30 حرف"),
                },
                {
                  name: "ar",
                  title: "الاسم بالعربية",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(30)
                      .error("يجب الا يزيد عن 30 حرف"),
                },
              ],
            },
            {
              name: "job_title",
              title: "الوظيفة",
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
            {
              name: "articalText",
              title: "تفاصيل المنشور",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "en",
                      title: "التفاصيل بالانجليزية",
                      type: "text",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "ar",
                      title: "التفاصيل بالعربية",
                      type: "text",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) =>
                Rule.required().min(3).error("يمكنك إدخال 3 فقرات كحد أدني"),
            },
            {
              name: "vdieoCode",
              title: "كود الفيديو",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).error("يجب إدخال 3 مقالات على الأقل."),
    },
    {
      name: "url",
      title: "Button URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
