import { defineField, defineType } from "sanity";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menykategori",
  type: "document",
  fields: [
    defineField({
      name: "title_sv",
      title: "Namn (Svenska)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Name (English)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_sv" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sorteringsordning",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "description_sv",
      title: "Beskrivning (Svenska)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description_en",
      title: "Description (English)",
      type: "text",
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: "Sorteringsordning",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title_sv", order: "sortOrder" },
    prepare({ title, order }) {
      return { title, subtitle: `Ordning: ${order ?? 0}` };
    },
  },
});
