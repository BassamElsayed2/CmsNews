export default {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "appear",
      title: "Gallery_Section",
      type: "boolean",
      initialValue: true,
      description: "Check this if the testimonial should be appear.",
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
      name: "desc",
      title: "وصف",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    },
    {
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "object",
          fields: [
            {
              name: "en",
              title: "English",
              type: "string",
              validation: (Rule) =>
                Rule.required().min(1).max(50).error("يجب الا يزيد عن 50 حرف"),
            },
            {
              name: "ar",
              title: "Arabic",
              type: "string",
              validation: (Rule) =>
                Rule.required().min(1).max(50).error("يجب الا يزيد عن 50 حرف"),
            },
          ],
        },
        { name: "url", title: "URL", type: "string" },
      ],
    },
    {
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "صورة",
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
              name: "text",
              title: "العنوان",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "العنوان بالانجليزي",
                  type: "string",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(100)
                      .error("يجب الا يزيد عن 100 حرف"),
                },
                {
                  name: "ar",
                  title: "العنوان بالعربي",
                  type: "string",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(100)
                      .error("يجب الا يزيد عن 100 حرف"),
                },
              ],
            },
            {
              name: "subTitle",
              title: "العنوان الفرعي",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "الانجليزي",
                  type: "string",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(50)
                      .error("يجب الا يزيد عن 50 حرف"),
                },
                {
                  name: "ar",
                  title: "العربي",
                  type: "string",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .min(1)
                      .max(50)
                      .error("يجب الا يزيد عن 50 حرف"),
                },
              ],
            },
            {
              name: "description",
              title: "الوصف",
              type: "object",
              fields: [
                { name: "en", title: "الوصف بالانجليزية", type: "text" },
                { name: "ar", title: "الوصف بالعربي", type: "text" },
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
                source: (doc, { parent }) => parent?.text?.en, // توليد الـ slug من العنوان الإنجليزي
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
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).error("يجب إضافة 3 صور على الأقل"),
    },
  ],
};
