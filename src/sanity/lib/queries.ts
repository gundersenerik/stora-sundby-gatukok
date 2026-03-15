import { groq } from "next-sanity";

export const menuCategoriesQuery = groq`
  *[_type == "menuCategory"] | order(sortOrder asc) {
    _id,
    title_sv,
    title_en,
    slug,
    sortOrder,
    description_sv,
    description_en,
    image
  }
`;

export const menuItemsQuery = groq`
  *[_type == "menuItem" && isAvailable == true] | order(sortOrder asc) {
    _id,
    name_sv,
    name_en,
    description_sv,
    description_en,
    price,
    category->{_id, title_sv, title_en, slug},
    image,
    dietary,
    isPopular,
    sortOrder
  }
`;

export const dailySpecialQuery = groq`
  *[_type == "dailySpecial" && date == $today][0] {
    _id,
    date,
    dishes[] {
      name_sv,
      name_en,
      description_sv,
      description_en,
      price,
      dietary
    },
    lunchPrice,
    image
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    restaurantName,
    phone,
    email,
    address,
    coordinates,
    openingHours[] {
      label_sv,
      label_en,
      startMonth,
      endMonth,
      hours
    },
    socialMedia,
    socialFeedConfig,
    announcement_sv,
    announcement_en,
    serviceAreas
  }
`;

export const popularItemsQuery = groq`
  *[_type == "menuItem" && isPopular == true && isAvailable == true] | order(sortOrder asc)[0...6] {
    _id,
    name_sv,
    name_en,
    description_sv,
    description_en,
    price,
    category->{_id, title_sv, title_en, slug},
    image,
    dietary
  }
`;
