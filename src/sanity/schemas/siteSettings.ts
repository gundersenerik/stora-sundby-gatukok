import { defineField, defineType, defineArrayMember } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Webbplatsinställningar",
  type: "document",
  fields: [
    defineField({
      name: "restaurantName",
      title: "Restaurangnamn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-post",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adress",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Gatuadress", type: "string" }),
        defineField({ name: "postalCode", title: "Postnummer", type: "string" }),
        defineField({ name: "city", title: "Ort", type: "string" }),
      ],
    }),
    defineField({
      name: "coordinates",
      title: "Koordinater",
      type: "geopoint",
    }),
    defineField({
      name: "openingHours",
      title: "Öppettider",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label_sv",
              title: "Etikett (Svenska)",
              type: "string",
              description: 'T.ex. "Vintertid", "Sommartid"',
            }),
            defineField({
              name: "label_en",
              title: "Label (English)",
              type: "string",
              description: 'E.g. "Winter", "Summer"',
            }),
            defineField({
              name: "startMonth",
              title: "Startmånad (1-12)",
              type: "number",
              validation: (Rule) => Rule.required().min(1).max(12),
            }),
            defineField({
              name: "endMonth",
              title: "Slutmånad (1-12)",
              type: "number",
              validation: (Rule) => Rule.required().min(1).max(12),
            }),
            defineField({
              name: "hours",
              title: "Tider",
              type: "string",
              description: 'T.ex. "11:00-20:00"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { label: "label_sv", hours: "hours" },
            prepare({ label, hours }) {
              return { title: label || "Öppettid", subtitle: hours };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Sociala Medier",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
      ],
    }),
    defineField({
      name: "socialFeedConfig",
      title: "Social Feed (v2)",
      description: "Konfiguration för framtida social media-integration",
      type: "object",
      fields: [
        defineField({ name: "facebookPageId", title: "Facebook Page ID", type: "string" }),
        defineField({ name: "instagramHandle", title: "Instagram Handle", type: "string" }),
        defineField({
          name: "showFeed",
          title: "Visa Feed",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "announcement_sv",
      title: "Meddelande (Svenska)",
      type: "text",
      rows: 2,
      description: "Visas som en banner högst upp på sidan. Lämna tomt för att dölja.",
    }),
    defineField({
      name: "announcement_en",
      title: "Announcement (English)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "serviceAreas",
      title: "Serviceområden",
      type: "array",
      of: [{ type: "string" }],
      description: "Områden som restaurangen betjänar (för SEO och kontaktsidan)",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Webbplatsinställningar" };
    },
  },
});
