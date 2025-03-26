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
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Text",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "ar", title: "Arabic", type: "string" },
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
            { name: "image", title: "Image", type: "image" },
            {
              name: "text",
              title: "Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            },
            {
              name: "subTitle",
              title: "SubTitle",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "text" },
                { name: "ar", title: "Arabic", type: "text" },
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
