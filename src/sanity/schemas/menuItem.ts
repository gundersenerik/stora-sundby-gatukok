import { defineField, defineType } from "sanity";

const dietaryOptions = [
  { title: "Vegetarisk", value: "vegetarian" },
  { title: "Vegan", value: "vegan" },
  { title: "Glutenfri", value: "gluten-free" },
  { title: "Laktosfri", value: "lactose-free" },
  { title: "Stark", value: "spicy" },
];

export const menuItem = defineType({
  name: "menuItem",
  title: "Menyobjekt",
  type: "document",
  fields: [
    defineField({
      name: "name_sv",
      title: "Namn (Svenska)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name_en",
      title: "Name (English)",
      type: "string",
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
    defineField({
      name: "price",
      title: "Pris (SEK)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (Rule) => Rule.required(),
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
      name: "dietary",
      title: "Kostinformation",
      type: "array",
      of: [{ type: "string" }],
      options: { list: dietaryOptions },
    }),
    defineField({
      name: "isPopular",
      title: "Populär",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isAvailable",
      title: "Tillgänglig",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sorteringsordning",
      type: "number",
      initialValue: 0,
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
    select: {
      title: "name_sv",
      subtitle: "category.title_sv",
      price: "price",
      media: "image",
    },
    prepare({ title, subtitle, price, media }) {
      return {
        title,
        subtitle: `${subtitle ?? ""} — ${price ?? 0} kr`,
        media,
      };
    },
  },
});
