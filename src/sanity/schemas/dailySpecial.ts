import { defineField, defineType, defineArrayMember } from "sanity";

const dietaryOptions = [
  { title: "Vegetarisk", value: "vegetarian" },
  { title: "Vegan", value: "vegan" },
  { title: "Glutenfri", value: "gluten-free" },
  { title: "Laktosfri", value: "lactose-free" },
  { title: "Stark", value: "spicy" },
];

export const dailySpecial = defineType({
  name: "dailySpecial",
  title: "Dagens Lunch",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Datum",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dishes",
      title: "Rätter",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
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
            }),
            defineField({
              name: "dietary",
              title: "Kostinformation",
              type: "array",
              of: [{ type: "string" }],
              options: { list: dietaryOptions },
            }),
          ],
          preview: {
            select: { title: "name_sv", price: "price" },
            prepare({ title, price }) {
              return { title, subtitle: price ? `${price} kr` : "" };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "lunchPrice",
      title: "Lunchpris (inkl. sallad & dryck)",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Datum",
      name: "date",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { date: "date", dishCount: "dishes" },
    prepare({ date, dishCount }) {
      return {
        title: date || "Inget datum",
        subtitle: dishCount ? `${dishCount.length} rätter` : "Inga rätter",
      };
    },
  },
});
