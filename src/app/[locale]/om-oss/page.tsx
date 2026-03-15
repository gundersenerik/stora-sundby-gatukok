import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, RESTAURANT } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const path = locale === "sv" ? "/om-oss" : "/en/about";

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        sv: `${SITE_URL}/om-oss`,
        en: `${SITE_URL}/en/about`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-12 text-center">
        {t("title")}
      </h1>

      <div className="grid md:grid-cols-5 gap-10 md:gap-16">
        {/* Main content — takes more space */}
        <div className="md:col-span-3 space-y-6">
          {locale === "sv" ? (
            <>
              <p className="text-espresso font-body text-base sm:text-lg leading-relaxed">
                Stora Sundby Gatukök är din lokala pizzeria i hjärtat av Södermanland.
                Vi har serverat pizza, kebab, hamburgare och sallader till hungriga kunder
                i Stora Sundby och omnejd i många år.
              </p>
              <p className="text-smoke font-body text-base sm:text-lg leading-relaxed">
                Vår meny erbjuder allt från klassiska svenska pizzafavoriter som Vesuvio
                och Capricciosa till smakrika kebabpizzor och saftiga burgare. Allt lagas
                färskt med kvalitetsingredienser.
              </p>
              <p className="text-smoke font-body text-base sm:text-lg leading-relaxed">
                Vi serverar kunder från {RESTAURANT.serviceAreas.join(", ")} och
                omgivande byar. Beställ online för smidig avhämtning eller kom förbi oss
                i Stora Sundby!
              </p>
            </>
          ) : (
            <>
              <p className="text-espresso font-body text-base sm:text-lg leading-relaxed">
                Stora Sundby Gatukök is your local pizzeria in the heart of Södermanland.
                We have been serving pizza, kebab, burgers and salads to hungry customers
                in Stora Sundby and the surrounding area for many years.
              </p>
              <p className="text-smoke font-body text-base sm:text-lg leading-relaxed">
                Our menu offers everything from classic Swedish pizza favourites like Vesuvio
                and Capricciosa to flavourful kebab pizzas and juicy burgers. Everything is
                made fresh with quality ingredients.
              </p>
              <p className="text-smoke font-body text-base sm:text-lg leading-relaxed">
                We serve customers from {RESTAURANT.serviceAreas.join(", ")} and
                surrounding villages. Order online for convenient pickup or visit us
                in Stora Sundby!
              </p>
            </>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <a
              href={locale === "sv" ? "/meny" : "/en/menu"}
              className="btn-primary w-full sm:w-auto"
            >
              {locale === "sv" ? "Se Menyn" : "View Menu"}
            </a>
            <a
              href={locale === "sv" ? "/kontakt" : "/en/contact"}
              className="btn-ghost w-full sm:w-auto"
            >
              {locale === "sv" ? "Kontakta Oss" : "Contact Us"}
            </a>
          </div>
        </div>

        {/* Side — pull quote */}
        <div className="md:col-span-2 flex items-start md:items-center">
          <blockquote className="border-l-2 border-wheat pl-6">
            <p className="font-heading text-lg md:text-xl italic text-espresso leading-relaxed">
              {locale === "sv"
                ? "Allt lagas färskt med kvalitetsingredienser — varje dag."
                : "Everything made fresh with quality ingredients — every day."}
            </p>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
