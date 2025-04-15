export default {
    name: "category",
    title: "Category",
    type: "document",
    fields: [
      {
        name: "appear",
        title: "Card_Section",
        type: "boolean",
        initialValue: true,
        description: "Cancel check  to make this cat hidden",
      },
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
          source: (doc) => doc.title?.en || "category",
          slugify: (input) =>
            input
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")
              .slice(0, 90),
        },
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  