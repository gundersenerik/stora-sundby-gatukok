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
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
        {t("title")}
      </h1>

      <div className="space-y-6">
        {locale === "sv" ? (
          <>
            <p className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed">
              Stora Sundby Gatukök är din lokala pizzeria i hjärtat av Södermanland.
              Vi har serverat pizza, kebab, hamburgare och sallader till hungriga kunder
              i Stora Sundby och omnejd i många år.
            </p>
            <p className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed">
              Vår meny erbjuder allt från klassiska svenska pizzafavoriter som Vesuvio
              och Capricciosa till smakrika kebabpizzor och saftiga burgare. Allt lagas
              färskt med kvalitetsingredienser.
            </p>
            <p className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed">
              Vi serverar kunder från {RESTAURANT.serviceAreas.join(", ")} och
              omgivande byar. Beställ online för smidig avhämtning eller kom förbi oss
              i Stora Sundby!
            </p>
          </>
        ) : (
          <>
            <p className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed">
              Stora Sundby Gatukök is your local pizzeria in the heart of Södermanland.
              We have been serving pizza, kebab, burgers and salads to hungry customers
              in Stora Sundby and the surrounding area for many years.
            </p>
            <p className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed">
              Our menu offers everything from classic Swedish pizza favourites like Vesuvio
              and Capricciosa to flavourful kebab pizzas and juicy burgers. Everything is
              made fresh with quality ingredients.
            </p>
            <p className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed">
              We serve customers from {RESTAURANT.serviceAreas.join(", ")} and
              surrounding villages. Order online for convenient pickup or visit us
              in Stora Sundby!
            </p>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href={locale === "sv" ? "/meny" : "/en/menu"}
          className="w-full sm:w-auto inline-block bg-red text-white font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-red-dark transition-colors text-center"
        >
          {locale === "sv" ? "Se Menyn" : "View Menu"}
        </a>
        <a
          href={locale === "sv" ? "/kontakt" : "/en/contact"}
          className="w-full sm:w-auto inline-block border-2 border-charcoal text-charcoal font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-charcoal hover:text-cream transition-colors text-center"
        >
          {locale === "sv" ? "Kontakta Oss" : "Contact Us"}
        </a>
      </div>
    </main>
  );
}
