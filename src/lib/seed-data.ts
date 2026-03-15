/**
 * Real menu data scraped from eOrder (app.esorder.se/menu/sv/395).
 * Used until Sanity CMS is connected.
 * All pizzas include tomatsås and ost unless stated otherwise.
 */

export type SeedMenuItem = {
  id: string;
  number?: number;
  name_sv: string;
  name_en: string;
  description_sv: string;
  description_en: string;
  price: number;
  category: string;
  dietary: string[];
  isPopular: boolean;
};

export type SeedCategory = {
  id: string;
  title_sv: string;
  title_en: string;
  slug: string;
  sortOrder: number;
  description_sv?: string;
  description_en?: string;
};

export const categories: SeedCategory[] = [
  { id: "menyer", title_sv: "Menyer", title_en: "Combo Meals", slug: "menyer", sortOrder: 1, description_sv: "Alla menyer inkl. 33cl dryck", description_en: "All combo meals incl. 33cl drink" },
  { id: "pizza-1", title_sv: "Pizza — Klass 1", title_en: "Pizza — Class 1", slug: "pizza-klass-1", sortOrder: 2, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "pizza-2", title_sv: "Pizza — Klass 2", title_en: "Pizza — Class 2", slug: "pizza-klass-2", sortOrder: 3, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "pizza-3", title_sv: "Pizza — Klass 3", title_en: "Pizza — Class 3", slug: "pizza-klass-3", sortOrder: 4, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "pizza-4", title_sv: "Pizza — Klass 4", title_en: "Pizza — Class 4", slug: "pizza-klass-4", sortOrder: 5, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "pizza-5", title_sv: "Pizza — Klass 5", title_en: "Pizza — Class 5", slug: "pizza-klass-5", sortOrder: 6, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "pizza-6", title_sv: "Pizza — Klass 6", title_en: "Pizza — Class 6", slug: "pizza-klass-6", sortOrder: 7, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "amerikanska", title_sv: "Amerikanska Pizzor", title_en: "American Pizzas", slug: "amerikanska-pizzor", sortOrder: 8, description_sv: "Tomatsås och ost ingår", description_en: "Tomato sauce and cheese included" },
  { id: "kebab", title_sv: "Kebabrätter", title_en: "Kebab Dishes", slug: "kebab", sortOrder: 9 },
  { id: "korv-hamburgare", title_sv: "Korv & Hamburgare", title_en: "Hot Dogs & Burgers", slug: "korv-hamburgare", sortOrder: 10 },
  { id: "a-la-carte", title_sv: "À la carte", title_en: "À la carte", slug: "a-la-carte", sortOrder: 11 },
  { id: "sallad", title_sv: "Sallad", title_en: "Salad", slug: "sallad", sortOrder: 12, description_sv: "Isbergssallad, gurka, tomat, dressing och bröd ingår", description_en: "Iceberg lettuce, cucumber, tomato, dressing and bread included" },
  { id: "tillbehor", title_sv: "Tillbehör", title_en: "Sides", slug: "tillbehor", sortOrder: 13 },
  { id: "dryck", title_sv: "Dryck", title_en: "Drinks", slug: "dryck", sortOrder: 14 },
];

export const menuItems: SeedMenuItem[] = [
  // ─── MENYER ───
  { id: "meny-1", number: 1, name_sv: "Korvmeny", name_en: "Sausage Meal", description_sv: "2st korvar (kokt eller grillad) med potatismos eller strips och valfri dryck", description_en: "2 sausages (boiled or grilled) with mashed potatoes or fries and drink", price: 100, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-2", number: 2, name_sv: "Bamsemeny", name_en: "Bamse Sausage Meal", description_sv: "Tjock korv (bamse) med potatismos eller strips och valfri dryck", description_en: "Thick sausage (bamse) with mashed potatoes or fries and drink", price: 100, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-3", number: 3, name_sv: "Hamburgarmeny 90g", name_en: "Burger Meal 90g", description_sv: "Hamburgare 90g med potatismos eller strips och valfri dryck", description_en: "Burger 90g with mashed potatoes or fries and drink", price: 113, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-4", number: 4, name_sv: "Hamburgarmeny 150g", name_en: "Burger Meal 150g", description_sv: "Hamburgare 150g med potatismos eller strips och valfri dryck", description_en: "Burger 150g with mashed potatoes or fries and drink", price: 123, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-5", number: 5, name_sv: "Köttbullemeny", name_en: "Meatball Meal", description_sv: "Köttbulletallrik med potatismos, lingonsylt och valfri dryck", description_en: "Meatball plate with mashed potatoes, lingonberry jam and drink", price: 132, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-6", number: 6, name_sv: "Chicken Bits-meny", name_en: "Chicken Bits Meal", description_sv: "Chicken bits med currydressing, strips och valfri dryck", description_en: "Chicken bits with curry dressing, fries and drink", price: 132, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-7", number: 7, name_sv: "Kebabmeny", name_en: "Kebab Meal", description_sv: "Kebabtallrik med strips eller ris och valfri dryck", description_en: "Kebab plate with fries or rice and drink", price: 137, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-8", number: 8, name_sv: "Falafelmeny", name_en: "Falafel Meal", description_sv: "Falafeltallrik med strips eller ris och valfri dryck", description_en: "Falafel plate with fries or rice and drink", price: 137, category: "menyer", dietary: ["vegetarian"], isPopular: false },
  { id: "meny-9", number: 9, name_sv: "Pytt i panna-meny", name_en: "Hash Meal", description_sv: "Pytt i panna med stekt ägg, rödbetor och valfri dryck", description_en: "Hash with fried egg, beetroot and drink", price: 132, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-10", number: 10, name_sv: "Lövbiffsmeny", name_en: "Sliced Beef Meal", description_sv: "Lövbiff med strips och valfri dryck", description_en: "Sliced beef with fries and drink", price: 142, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-11", number: 11, name_sv: "Grillbiffsmeny", name_en: "Grilled Beef Meal", description_sv: "Grillbiff med strips och valfri dryck", description_en: "Grilled beef with fries and drink", price: 142, category: "menyer", dietary: [], isPopular: false },
  { id: "meny-12", number: 12, name_sv: "Schnitzelmeny", name_en: "Schnitzel Meal", description_sv: "Schnitzel med stekt potatis/klyftpotatis/strips eller potatismos, béarnaisesås eller persiljesmör och valfri dryck", description_en: "Schnitzel with fried potatoes/wedges/fries or mash, béarnaise or parsley butter and drink", price: 142, category: "menyer", dietary: [], isPopular: false },

  // ─── PIZZA KLASS 1 (110 kr) ───
  { id: "pizza-1-margherita", number: 1, name_sv: "Margherita", name_en: "Margherita", description_sv: "Tomatsås, ost", description_en: "Tomato sauce, cheese", price: 110, category: "pizza-1", dietary: ["vegetarian"], isPopular: false },
  { id: "pizza-2-vesuvio", number: 2, name_sv: "Vesuvio", name_en: "Vesuvio", description_sv: "Skinka", description_en: "Ham", price: 110, category: "pizza-1", dietary: [], isPopular: true },
  { id: "pizza-3-calzone", number: 3, name_sv: "Calzone (inbakad)", name_en: "Calzone (folded)", description_sv: "Skinka", description_en: "Ham", price: 110, category: "pizza-1", dietary: [], isPopular: false },
  { id: "pizza-4-funghi", number: 4, name_sv: "Funghi", name_en: "Funghi", description_sv: "Champinjoner", description_en: "Mushrooms", price: 110, category: "pizza-1", dietary: ["vegetarian"], isPopular: false },

  // ─── PIZZA KLASS 2 (115 kr) ───
  { id: "pizza-5-capricciosa", number: 5, name_sv: "Capricciosa", name_en: "Capricciosa", description_sv: "Skinka, champinjoner", description_en: "Ham, mushrooms", price: 115, category: "pizza-2", dietary: [], isPopular: true },
  { id: "pizza-6-hawaii", number: 6, name_sv: "Hawaii", name_en: "Hawaii", description_sv: "Skinka, ananas", description_en: "Ham, pineapple", price: 115, category: "pizza-2", dietary: [], isPopular: true },
  { id: "pizza-7-banan", number: 7, name_sv: "Banan", name_en: "Banana", description_sv: "Skinka, banan, curry", description_en: "Ham, banana, curry", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-8-bussola", number: 8, name_sv: "Bussola", name_en: "Bussola", description_sv: "Skinka, räkor", description_en: "Ham, shrimp", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-9-opera", number: 9, name_sv: "Opera", name_en: "Opera", description_sv: "Skinka, tonfisk", description_en: "Ham, tuna", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-10-altonno", number: 10, name_sv: "Al Tonno", name_en: "Al Tonno", description_sv: "Lök, tonfisk", description_en: "Onion, tuna", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-11-marinara", number: 11, name_sv: "Marinara", name_en: "Marinara", description_sv: "Musslor, räkor", description_en: "Mussels, shrimp", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-12-campagnola", number: 12, name_sv: "Campagnola", name_en: "Campagnola", description_sv: "Ungersk salami, lök", description_en: "Hungarian salami, onion", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-13-orientala", number: 13, name_sv: "Orientala", name_en: "Orientala", description_sv: "Nötfärs, svartpeppar", description_en: "Ground beef, black pepper", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-14-baconpizza", number: 14, name_sv: "Baconpizza", name_en: "Bacon Pizza", description_sv: "Bacon, ägg, lök", description_en: "Bacon, egg, onion", price: 115, category: "pizza-2", dietary: [], isPopular: false },
  { id: "pizza-15-pasana", number: 15, name_sv: "Pasana", name_en: "Pasana", description_sv: "Nötfärs, ägg, lök", description_en: "Ground beef, egg, onion", price: 115, category: "pizza-2", dietary: [], isPopular: false },

  // ─── PIZZA KLASS 3 (120 kr) ───
  { id: "pizza-16-tropicano", number: 16, name_sv: "Tropicano", name_en: "Tropicano", description_sv: "Skinka, banan, ananas", description_en: "Ham, banana, pineapple", price: 120, category: "pizza-3", dietary: [], isPopular: false },
  { id: "pizza-17-parken", number: 17, name_sv: "Parken", name_en: "Parken", description_sv: "Champinjoner, paprika, ungersk salami", description_en: "Mushrooms, bell pepper, Hungarian salami", price: 120, category: "pizza-3", dietary: [], isPopular: false },
  { id: "pizza-18-ikaros", number: 18, name_sv: "Ikaros", name_en: "Ikaros", description_sv: "Champinjoner, bacon, paprika", description_en: "Mushrooms, bacon, bell pepper", price: 120, category: "pizza-3", dietary: [], isPopular: false },
  { id: "pizza-19-quattro-stagione", number: 19, name_sv: "Quattro Stagione", name_en: "Quattro Stagione", description_sv: "Skinka, champinjoner, musslor, oliver, räkor, kronärtskocka", description_en: "Ham, mushrooms, mussels, olives, shrimp, artichoke", price: 120, category: "pizza-3", dietary: [], isPopular: false },
  { id: "pizza-20-husets", number: 20, name_sv: "Husets Pizza", name_en: "House Pizza", description_sv: "Champinjoner, skinka, räkor", description_en: "Mushrooms, ham, shrimp", price: 120, category: "pizza-3", dietary: [], isPopular: false },
  { id: "pizza-21-grekisk", number: 21, name_sv: "Grekisk Pizza", name_en: "Greek Pizza", description_sv: "Lök, salladsost, tomat, paprika, oliver", description_en: "Onion, feta cheese, tomato, bell pepper, olives", price: 120, category: "pizza-3", dietary: ["vegetarian"], isPopular: false },
  { id: "pizza-22-havet", number: 22, name_sv: "Havet", name_en: "The Sea", description_sv: "Musslor, räkor, tonfisk", description_en: "Mussels, shrimp, tuna", price: 120, category: "pizza-3", dietary: [], isPopular: false },
  { id: "pizza-23-quattro-formaggi", number: 23, name_sv: "Quattro Formaggi", name_en: "Quattro Formaggi", description_sv: "Lök, tomat, gorgonzola, ädelost, mozzarella", description_en: "Onion, tomato, gorgonzola, blue cheese, mozzarella", price: 120, category: "pizza-3", dietary: ["vegetarian"], isPopular: false },
  { id: "pizza-24-vegetarisk", number: 24, name_sv: "Vegetarisk", name_en: "Vegetarian", description_sv: "Lök, paprika, oliver, ananas, kronärtskocka, sparris, champinjoner", description_en: "Onion, bell pepper, olives, pineapple, artichoke, asparagus, mushrooms", price: 120, category: "pizza-3", dietary: ["vegetarian"], isPopular: false },

  // ─── PIZZA KLASS 4 (125 kr) ───
  { id: "pizza-25-miami", number: 25, name_sv: "Miami", name_en: "Miami", description_sv: "Skinka, champinjoner, nötfärs", description_en: "Ham, mushrooms, ground beef", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-26-barcelona", number: 26, name_sv: "Barcelona", name_en: "Barcelona", description_sv: "Skinka, salami, nötfärs, soltorkade tomater", description_en: "Ham, salami, ground beef, sun-dried tomatoes", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-27-bari", number: 27, name_sv: "Bari", name_en: "Bari", description_sv: "Lök, pepperoni, ungersk salami, nötfärs, paprika", description_en: "Onion, pepperoni, Hungarian salami, ground beef, bell pepper", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-28-bigben", number: 28, name_sv: "Big Ben", name_en: "Big Ben", description_sv: "Lök, bacon, champinjoner, nötfärs, ägg", description_en: "Onion, bacon, mushrooms, ground beef, egg", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-29-mexicana", number: 29, name_sv: "Mexicana", name_en: "Mexicana", description_sv: "Lök, nötfärs, jalapeño, tacosås, färsk vitlök, tacokrydda", description_en: "Onion, ground beef, jalapeño, taco sauce, fresh garlic, taco seasoning", price: 125, category: "pizza-4", dietary: ["spicy"], isPopular: false },
  { id: "pizza-30-italia", number: 30, name_sv: "Italia", name_en: "Italia", description_sv: "Skinka, champinjoner, räkor, sparris, kronärtskocka", description_en: "Ham, mushrooms, shrimp, asparagus, artichoke", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-31-azteka", number: 31, name_sv: "Azteka", name_en: "Azteka", description_sv: "Skinka, jalapeño, tacosås, tacokrydda, vitsås", description_en: "Ham, jalapeño, taco sauce, taco seasoning, garlic sauce", price: 125, category: "pizza-4", dietary: ["spicy"], isPopular: false },
  { id: "pizza-32-kebabpizza", number: 32, name_sv: "Kebabpizza", name_en: "Kebab Pizza", description_sv: "Kebab, champinjoner, lök, pepperoni, såser", description_en: "Kebab, mushrooms, onion, pepperoni, sauces", price: 125, category: "pizza-4", dietary: [], isPopular: true },
  { id: "pizza-33-gyrospizza", number: 33, name_sv: "Gyrospizza", name_en: "Gyros Pizza", description_sv: "Gyros, champinjoner, lök, pepperoni, såser", description_en: "Gyros, mushrooms, onion, pepperoni, sauces", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-34-kycklingpizza", number: 34, name_sv: "Kycklingpizza", name_en: "Chicken Pizza", description_sv: "Kyckling, champinjoner, lök, vitsås", description_en: "Chicken, mushrooms, onion, garlic sauce", price: 125, category: "pizza-4", dietary: [], isPopular: false },
  { id: "pizza-35-viking-kebab", number: 35, name_sv: "Viking Kebab (inbakad)", name_en: "Viking Kebab (folded)", description_sv: "Ost, kebab, lök, tomater, isbergssallad, pepperoni, såser", description_en: "Cheese, kebab, onion, tomatoes, iceberg lettuce, pepperoni, sauces", price: 125, category: "pizza-4", dietary: [], isPopular: false },

  // ─── PIZZA KLASS 5 (130 kr) ───
  { id: "pizza-36-kyckling-special", number: 36, name_sv: "Kyckling Special", name_en: "Chicken Special", description_sv: "Skinka, kyckling, nötter, banan, vitsås", description_en: "Ham, chicken, nuts, banana, garlic sauce", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-37-julita-special", number: 37, name_sv: "Julita Special", name_en: "Julita Special", description_sv: "Fläskfilé, lök, paprika, champinjoner, béarnaisesås", description_en: "Pork fillet, onion, bell pepper, mushrooms, béarnaise sauce", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-38-disco", number: 38, name_sv: "Disco (dubbelinbakad)", name_en: "Disco (double folded)", description_sv: "Skinka, champinjoner, räkor", description_en: "Ham, mushrooms, shrimp", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-39-stora-sundby", number: 39, name_sv: "Stora Sundby Special", name_en: "Stora Sundby Special", description_sv: "Oxfilé, lök, paprika, champinjoner, béarnaisesås", description_en: "Beef fillet, onion, bell pepper, mushrooms, béarnaise sauce", price: 130, category: "pizza-5", dietary: [], isPopular: true },
  { id: "pizza-40-westermo", number: 40, name_sv: "Westermo Special", name_en: "Westermo Special", description_sv: "Skinka, champinjoner, fläskfilé, béarnaisesås", description_en: "Ham, mushrooms, pork fillet, béarnaise sauce", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-41-marcel", number: 41, name_sv: "Marcel Special", name_en: "Marcel Special", description_sv: "Skinka, oxfilé, béarnaisesås", description_en: "Ham, beef fillet, béarnaise sauce", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-42-udden", number: 42, name_sv: "Udden Special", name_en: "Udden Special", description_sv: "Fläskfilé, champinjoner, räkor, gorgonzola", description_en: "Pork fillet, mushrooms, shrimp, gorgonzola", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-43-babylon", number: 43, name_sv: "Babylon", name_en: "Babylon", description_sv: "Oxfilé, champinjoner, räkor, gorgonzola", description_en: "Beef fillet, mushrooms, shrimp, gorgonzola", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-44-daniel", number: 44, name_sv: "Daniel Special", name_en: "Daniel Special", description_sv: "Fläskfilé, skinka, räkor, béarnaisesås", description_en: "Pork fillet, ham, shrimp, béarnaise sauce", price: 130, category: "pizza-5", dietary: [], isPopular: false },
  { id: "pizza-45-acapulco", number: 45, name_sv: "Acapulco", name_en: "Acapulco", description_sv: "Oxfilé, champinjoner, lök, jalapeño, färsk vitlök, tacokrydda, tacosås", description_en: "Beef fillet, mushrooms, onion, jalapeño, fresh garlic, taco seasoning, taco sauce", price: 130, category: "pizza-5", dietary: ["spicy"], isPopular: false },

  // ─── PIZZA KLASS 6 (135 kr) ───
  { id: "pizza-46-kebab-special", number: 46, name_sv: "Kebab Special (dubbelinbakad)", name_en: "Kebab Special (double folded)", description_sv: "Skinka, kebab, vitsås", description_en: "Ham, kebab, garlic sauce", price: 135, category: "pizza-6", dietary: [], isPopular: false },
  { id: "pizza-47-lista", number: 47, name_sv: "Lista Special", name_en: "Lista Special", description_sv: "Skinka, oxfilé, fläskfilé, béarnaisesås", description_en: "Ham, beef fillet, pork fillet, béarnaise sauce", price: 135, category: "pizza-6", dietary: [], isPopular: false },
  { id: "pizza-48-rafael", number: 48, name_sv: "Rafael Special", name_en: "Rafael Special", description_sv: "Oxfilé, fläskfilé, ananas, lök, tomat, béarnaisesås", description_en: "Beef fillet, pork fillet, pineapple, onion, tomato, béarnaise sauce", price: 135, category: "pizza-6", dietary: [], isPopular: false },
  { id: "pizza-49-ankawa", number: 49, name_sv: "Ankawa", name_en: "Ankawa", description_sv: "Kebab, pommes, såser", description_en: "Kebab, fries, sauces", price: 135, category: "pizza-6", dietary: [], isPopular: false },
  { id: "pizza-50-peter", number: 50, name_sv: "Peter Special", name_en: "Peter Special", description_sv: "Kebab, sallad, lök, tomat, gurka, pepperoni, såser", description_en: "Kebab, salad, onion, tomato, cucumber, pepperoni, sauces", price: 135, category: "pizza-6", dietary: [], isPopular: false },
  { id: "pizza-51-parma", number: 51, name_sv: "Parmapizza", name_en: "Parma Pizza", description_sv: "Parmaskinka, tomat, mozzarellaost, ruccola", description_en: "Parma ham, tomato, mozzarella, arugula", price: 135, category: "pizza-6", dietary: [], isPopular: false },
  { id: "pizza-52-kantarell", number: 52, name_sv: "Kantarell", name_en: "Chanterelle", description_sv: "Oxfilé, lök, tomat, kantareller, béarnaisesås", description_en: "Beef fillet, onion, tomato, chanterelles, béarnaise sauce", price: 135, category: "pizza-6", dietary: [], isPopular: false },

  // ─── AMERIKANSKA PIZZOR (135 kr) ───
  { id: "usa-california", name_sv: "California", name_en: "California", description_sv: "Skinka, champinjoner, ananas, banan", description_en: "Ham, mushrooms, pineapple, banana", price: 135, category: "amerikanska", dietary: [], isPopular: false },
  { id: "usa-atlanta", name_sv: "Atlanta", name_en: "Atlanta", description_sv: "Skinka, lök, champinjoner, paprika", description_en: "Ham, onion, mushrooms, bell pepper", price: 135, category: "amerikanska", dietary: [], isPopular: false },
  { id: "usa-arizona", name_sv: "Arizona", name_en: "Arizona", description_sv: "Räkor, musslor, tonfisk", description_en: "Shrimp, mussels, tuna", price: 135, category: "amerikanska", dietary: [], isPopular: false },
  { id: "usa-goldensand", name_sv: "Goldensand", name_en: "Goldensand", description_sv: "Nötfärs, lök, paprika, oliver", description_en: "Ground beef, onion, bell pepper, olives", price: 135, category: "amerikanska", dietary: [], isPopular: false },
  { id: "usa-sunnybeach", name_sv: "Sunny Beach", name_en: "Sunny Beach", description_sv: "Salami, bacon, lök, paprika, sparris", description_en: "Salami, bacon, onion, bell pepper, asparagus", price: 135, category: "amerikanska", dietary: [], isPopular: false },
  { id: "usa-ohio", name_sv: "Ohio", name_en: "Ohio", description_sv: "Oxfilé, champinjoner, tomat, gorgonzola", description_en: "Beef fillet, mushrooms, tomato, gorgonzola", price: 135, category: "amerikanska", dietary: [], isPopular: false },
  { id: "usa-colorado", name_sv: "Colorado", name_en: "Colorado", description_sv: "Skinka, fläskfilé, räkor, mozzarella", description_en: "Ham, pork fillet, shrimp, mozzarella", price: 135, category: "amerikanska", dietary: [], isPopular: false },

  // ─── KEBABRÄTTER ───
  { id: "kebab-brod", name_sv: "Kebab med bröd", name_en: "Kebab with bread", description_sv: "Kebabkött, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Kebab meat, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce of choice", price: 100, category: "kebab", dietary: [], isPopular: false },
  { id: "kebabrulle", name_sv: "Kebabrulle", name_en: "Kebab Wrap", description_sv: "Kebabkött i hembakad rulle, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Kebab meat in homemade wrap, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 120, category: "kebab", dietary: [], isPopular: true },
  { id: "kyckling-brod", name_sv: "Kyckling med bröd", name_en: "Chicken with bread", description_sv: "Kycklingkebab, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Chicken kebab, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 100, category: "kebab", dietary: [], isPopular: false },
  { id: "kycklingrulle", name_sv: "Kycklingrulle", name_en: "Chicken Wrap", description_sv: "Kycklingkebab i hembakad rulle, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Chicken kebab in homemade wrap, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 120, category: "kebab", dietary: [], isPopular: false },
  { id: "kycklingtallrik", name_sv: "Kycklingtallrik", name_en: "Chicken Plate", description_sv: "Kycklingkebab, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås — välj mellan ris eller pommes", description_en: "Chicken kebab, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce — choice of rice or fries", price: 120, category: "kebab", dietary: [], isPopular: false },
  { id: "gyros-brod", name_sv: "Gyros med bröd", name_en: "Gyros with bread", description_sv: "Gyros, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Gyros, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 100, category: "kebab", dietary: [], isPopular: false },
  { id: "gyrosrulle", name_sv: "Gyrosrulle", name_en: "Gyros Wrap", description_sv: "Gyros i hembakad rulle, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Gyros in homemade wrap, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 120, category: "kebab", dietary: [], isPopular: false },
  { id: "gyrostallrik", name_sv: "Gyrostallrik", name_en: "Gyros Plate", description_sv: "Gyros, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås — välj mellan ris eller pommes", description_en: "Gyros, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce — choice of rice or fries", price: 120, category: "kebab", dietary: [], isPopular: false },
  { id: "falafel-brod", name_sv: "Falafel med bröd", name_en: "Falafel with bread", description_sv: "Falafel, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Falafel, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 100, category: "kebab", dietary: ["vegetarian"], isPopular: false },
  { id: "falafelrulle", name_sv: "Falafelrulle", name_en: "Falafel Wrap", description_sv: "Falafel i hembakad rulle, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås", description_en: "Falafel in homemade wrap, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce", price: 120, category: "kebab", dietary: ["vegetarian"], isPopular: false },
  { id: "falafeltallrik", name_sv: "Falafeltallrik", name_en: "Falafel Plate", description_sv: "Falafel, isbergssallad, rödlök, färsk tomat, fefferoni och valfri sås — välj mellan ris eller pommes", description_en: "Falafel, iceberg lettuce, red onion, fresh tomato, pepperoni and sauce — choice of rice or fries", price: 120, category: "kebab", dietary: ["vegetarian"], isPopular: false },

  // ─── KORV & HAMBURGARE ───
  { id: "kokt-korv", name_sv: "Kokt korv", name_en: "Boiled sausage", description_sv: "", description_en: "", price: 30, category: "korv-hamburgare", dietary: [], isPopular: false },
  { id: "grillad-korv", name_sv: "Grillad korv", name_en: "Grilled sausage", description_sv: "", description_en: "", price: 30, category: "korv-hamburgare", dietary: [], isPopular: false },
  { id: "bamse-korv", name_sv: "Bamse korv", name_en: "Bamse sausage", description_sv: "", description_en: "", price: 40, category: "korv-hamburgare", dietary: [], isPopular: false },
  { id: "hamburgare", name_sv: "Hamburgare", name_en: "Burger", description_sv: "Ketchup, senap, hamburgerdressing, saltgurka, lök, tomat, isbergssallad. Välj 90g, 150g eller 200g samt mellan bröd, potatismos eller pommes", description_en: "Ketchup, mustard, burger dressing, pickled cucumber, onion, tomato, iceberg lettuce. Choose 90g, 150g or 200g with bun, mashed potatoes or fries", price: 80, category: "korv-hamburgare", dietary: [], isPopular: false },
  { id: "special-korv", name_sv: "Special korv", name_en: "Special sausage", description_sv: "Med bröd & potatismos", description_en: "With bread & mashed potatoes", price: 60, category: "korv-hamburgare", dietary: [], isPopular: false },
  { id: "tunnbrodsrulle", name_sv: "Tunnbrödsrulle", name_en: "Flatbread wrap", description_sv: "", description_en: "", price: 75, category: "korv-hamburgare", dietary: [], isPopular: false },

  // ─── À LA CARTE ───
  { id: "pytt-i-panna", name_sv: "Pytt i panna", name_en: "Swedish hash", description_sv: "Ägg och rödbetor", description_en: "Egg and beetroot", price: 115, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "chicken-bits", name_sv: "Chicken bits", name_en: "Chicken bits", description_sv: "Stekt potatis, klyftpotatis, strips eller mos med currydressing", description_en: "Fried potatoes, wedges, fries or mash with curry dressing", price: 115, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "kottbullar", name_sv: "Köttbullar", name_en: "Swedish meatballs", description_sv: "Mos och lingonsylt", description_en: "Mashed potatoes and lingonberry jam", price: 115, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "raggmunk", name_sv: "Raggmunk", name_en: "Potato pancake", description_sv: "Stekt fläsk och lingonsylt", description_en: "Fried pork and lingonberry jam", price: 125, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "rodspatta", name_sv: "Rödspätta", name_en: "Plaice", description_sv: "Stekt potatis, klyftpotatis, strips eller mos med remouladsås", description_en: "Fried potatoes, wedges, fries or mash with remoulade sauce", price: 125, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "lovbiff", name_sv: "Lövbiff", name_en: "Sliced beef", description_sv: "Stekt potatis, klyftpotatis, strips eller mos med béarnaisesås eller persiljesmör", description_en: "Fried potatoes, wedges, fries or mash with béarnaise or parsley butter", price: 125, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "grillbiff", name_sv: "Grillbiff", name_en: "Grilled beef", description_sv: "Stekt potatis, klyftpotatis, strips eller mos med béarnaisesås eller persiljesmör", description_en: "Fried potatoes, wedges, fries or mash with béarnaise or parsley butter", price: 125, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "schnitzel", name_sv: "Schnitzel", name_en: "Schnitzel", description_sv: "Stekt potatis, klyftpotatis, strips eller mos med béarnaisesås eller persiljesmör", description_en: "Fried potatoes, wedges, fries or mash with béarnaise or parsley butter", price: 125, category: "a-la-carte", dietary: [], isPopular: false },
  { id: "flasknoisette", name_sv: "Fläsknoisette", name_en: "Pork noisette", description_sv: "Stekt potatis, klyftpotatis, strips eller mos med béarnaisesås eller persiljesmör", description_en: "Fried potatoes, wedges, fries or mash with béarnaise or parsley butter", price: 125, category: "a-la-carte", dietary: [], isPopular: false },

  // ─── SALLAD (120 kr) ───
  { id: "ost-skinksallad", name_sv: "Ost & Skinksallad", name_en: "Cheese & Ham Salad", description_sv: "Ost, skinka, paprika, majs, oliver", description_en: "Cheese, ham, bell pepper, corn, olives", price: 120, category: "sallad", dietary: [], isPopular: false },
  { id: "raksallad", name_sv: "Räksallad", name_en: "Shrimp Salad", description_sv: "Räkor, oliver, citron", description_en: "Shrimp, olives, lemon", price: 120, category: "sallad", dietary: [], isPopular: false },
  { id: "vastkustsallad", name_sv: "Västkustsallad", name_en: "West Coast Salad", description_sv: "Räkor, musslor, tonfisk, citron", description_en: "Shrimp, mussels, tuna, lemon", price: 120, category: "sallad", dietary: [], isPopular: false },
  { id: "grekisk-sallad", name_sv: "Grekisk sallad", name_en: "Greek Salad", description_sv: "Salladsost, lök, oliver, paprika", description_en: "Feta cheese, onion, olives, bell pepper", price: 120, category: "sallad", dietary: ["vegetarian"], isPopular: false },
  { id: "kebabsallad", name_sv: "Kebabsallad", name_en: "Kebab Salad", description_sv: "Kebab, pepperoni, lök", description_en: "Kebab, pepperoni, onion", price: 120, category: "sallad", dietary: [], isPopular: false },
  { id: "tonfisksallad", name_sv: "Tonfisksallad", name_en: "Tuna Salad", description_sv: "Tonfisk, lök, oliver, citron", description_en: "Tuna, onion, olives, lemon", price: 120, category: "sallad", dietary: [], isPopular: false },
  { id: "kycklingsallad", name_sv: "Kycklingsallad", name_en: "Chicken Salad", description_sv: "Kyckling, ananas, paprika, majs", description_en: "Chicken, pineapple, bell pepper, corn", price: 120, category: "sallad", dietary: [], isPopular: false },

  // ─── TILLBEHÖR ───
  { id: "pizzasallad", name_sv: "Pizzasallad", name_en: "Pizza salad", description_sv: "", description_en: "", price: 10, category: "tillbehor", dietary: [], isPopular: false },
  { id: "pizzasas", name_sv: "Pizzasås", name_en: "Pizza sauce", description_sv: "", description_en: "", price: 10, category: "tillbehor", dietary: [], isPopular: false },
  { id: "bacon-side", name_sv: "Bacon", name_en: "Bacon", description_sv: "", description_en: "", price: 25, category: "tillbehor", dietary: [], isPopular: false },
  { id: "bearnaise-side", name_sv: "Béarnaisesås", name_en: "Béarnaise sauce", description_sv: "", description_en: "", price: 15, category: "tillbehor", dietary: [], isPopular: false },
  { id: "bostongurka", name_sv: "Bostongurka", name_en: "Sweet relish", description_sv: "", description_en: "", price: 15, category: "tillbehor", dietary: [], isPopular: false },
  { id: "gurkmajonas", name_sv: "Gurkmajonnäs", name_en: "Cucumber mayonnaise", description_sv: "", description_en: "", price: 15, category: "tillbehor", dietary: [], isPopular: false },
  { id: "raksallad-side", name_sv: "Räksallad", name_en: "Shrimp salad", description_sv: "", description_en: "", price: 25, category: "tillbehor", dietary: [], isPopular: false },
  { id: "pommestallrik", name_sv: "Pommestallrik", name_en: "Fries plate", description_sv: "", description_en: "", price: 45, category: "tillbehor", dietary: [], isPopular: false },

  // ─── DRYCK ───
  { id: "coca-cola-33", name_sv: "Coca-Cola 33cl", name_en: "Coca-Cola 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "coca-cola-zero-33", name_sv: "Coca-Cola Zero 33cl", name_en: "Coca-Cola Zero 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-orange-33", name_sv: "Fanta Orange 33cl", name_en: "Fanta Orange 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-exotic-33", name_sv: "Fanta Exotic 33cl", name_en: "Fanta Exotic 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-lemon-zero-33", name_sv: "Fanta Lemon Zero 33cl", name_en: "Fanta Lemon Zero 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-strawberry-kiwi-33", name_sv: "Fanta Strawberry Kiwi 33cl", name_en: "Fanta Strawberry Kiwi 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "sprite-33", name_sv: "Sprite 33cl", name_en: "Sprite 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "trocadero-33", name_sv: "Trocadero 33cl", name_en: "Trocadero 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "trocadero-zero-33", name_sv: "Trocadero Zero 33cl", name_en: "Trocadero Zero 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "bonaqua-naturell-33", name_sv: "Bonaqua Naturell 33cl", name_en: "Bonaqua Still Water 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "bonaqua-citron-33", name_sv: "Bonaqua Citron 33cl", name_en: "Bonaqua Lemon 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "mer-apelsin-33", name_sv: "Mer Apelsin 33cl", name_en: "Mer Orange 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "mer-paron-33", name_sv: "Mer Päron 33cl", name_en: "Mer Pear 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "lattol-33", name_sv: "Lättöl 33cl", name_en: "Light beer 33cl", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
  { id: "coca-cola-50", name_sv: "Coca-Cola 0.5L", name_en: "Coca-Cola 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "coca-cola-zero-50", name_sv: "Coca-Cola Zero 0.5L", name_en: "Coca-Cola Zero 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-50", name_sv: "Fanta 0.5L", name_en: "Fanta 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "bonaqua-naturell-50", name_sv: "Bonaqua Naturell 0.5L", name_en: "Bonaqua Still Water 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "bonaqua-citron-50", name_sv: "Bonaqua Citron 0.5L", name_en: "Bonaqua Lemon 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "mer-apelsin-50", name_sv: "Mer Apelsin 0.5L", name_en: "Mer Orange 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "mer-paron-50", name_sv: "Mer Päron 0.5L", name_en: "Mer Pear 0.5L", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "coca-cola-2l", name_sv: "Coca-Cola 2L", name_en: "Coca-Cola 2L", description_sv: "", description_en: "", price: 45, category: "dryck", dietary: [], isPopular: false },
  { id: "coca-cola-zero-2l", name_sv: "Coca-Cola Zero 2L", name_en: "Coca-Cola Zero 2L", description_sv: "", description_en: "", price: 45, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-orange-2l", name_sv: "Fanta Orange 2L", name_en: "Fanta Orange 2L", description_sv: "", description_en: "", price: 45, category: "dryck", dietary: [], isPopular: false },
  { id: "fanta-exotic-2l", name_sv: "Fanta Exotic 2L", name_en: "Fanta Exotic 2L", description_sv: "", description_en: "", price: 45, category: "dryck", dietary: [], isPopular: false },
  { id: "pucko", name_sv: "Pucko", name_en: "Pucko (chocolate milk)", description_sv: "", description_en: "", price: 28, category: "dryck", dietary: [], isPopular: false },
  { id: "powerking", name_sv: "Powerking", name_en: "Powerking", description_sv: "", description_en: "", price: 20, category: "dryck", dietary: [], isPopular: false },
];
