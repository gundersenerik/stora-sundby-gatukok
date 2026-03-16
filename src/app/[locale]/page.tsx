import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, RESTAURANT } from "@/lib/constants";
import { menuItems } from "@/lib/seed-data";
import { RestaurantJsonLd } from "@/components/seo/JsonLd";
import DietaryBadge from "@/components/ui/DietaryBadge";
import TimeGreeting from "@/components/ui/TimeGreeting";
import OpenStatus from "@/components/ui/OpenStatus";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: SITE_URL,
      languages: {
        sv: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: SITE_URL,
      siteName: "Stora Sundby Gatukök",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  // Hand-picked to showcase variety: classic pizza, signature pizza, kebab
  const showcaseIds = ["pizza-2-vesuvio", "pizza-39-stora-sundby", "kebabrulle"];
  const popularItems = showcaseIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter(Boolean) as typeof menuItems;

  return (
    <main id="main-content">
      <RestaurantJsonLd locale={locale} />

      {/* ═══ Hero ═══ */}
      <section className="min-h-hero flex flex-col items-center justify-center bg-espresso text-parchment px-4 relative">
        <div className="max-w-3xl text-center">
          {/* Time-aware greeting */}
          <TimeGreeting
            locale={locale}
            className="font-body text-sm tracking-widest text-wheat/70 uppercase mb-4 block"
          />

          {/* Restaurant name — big, warm, italic serif */}
          <h1
            className="font-heading italic text-parchment mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.1 }}
          >
            Stora Sundby
            <br />
            <span className="text-wheat" style={{ fontSize: "0.55em" }}>
              Gatukök
            </span>
          </h1>

          {/* Tagline */}
          <p className="font-body text-parchment/60 text-sm sm:text-base mb-3 max-w-md mx-auto">
            {locale === "sv"
              ? "Alberga Centrum 1, Stora Sundby"
              : "Alberga Centrum 1, Stora Sundby"}
          </p>

          {/* Open status */}
          <div className="mb-8">
            <OpenStatus locale={locale} showText={true} className="text-parchment/50" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={locale === "sv" ? "/meny" : "/en/menu"}
              className="btn-primary w-full sm:w-auto"
            >
              {t("viewMenu")}
            </a>
            <a
              href={`tel:${RESTAURANT.phoneIntl}`}
              className="btn-ghost w-full sm:w-auto"
            >
              {locale === "sv" ? "Ring & Beställ" : "Call & Order"}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <svg
            className="w-5 h-5 text-parchment/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ═══ Philosophy strip ═══ */}
      <section className="bg-parchment-dark py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-espresso italic leading-relaxed">
            {locale === "sv"
              ? "Degen jäser varje morgon. Såsen kokar långsamt. Osten smälter perfekt."
              : "The dough rises every morning. The sauce simmers slowly. The cheese melts perfectly."}
          </p>
          <p className="font-body text-smoke text-sm mt-4">
            {locale === "sv"
              ? "Vissa saker tar tid — och det smakar man."
              : "Some things take time — and you can taste it."}
          </p>
        </div>
      </section>

      {/* ═══ Popular items ═══ */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl text-espresso italic">
              {t("popularItems")}
            </h2>
            <div className="w-12 h-px bg-wheat mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            {popularItems.map((item) => (
              <a
                key={item.id}
                href={locale === "sv" ? "/meny" : "/en/menu"}
                className="group text-center block p-6 -m-6 rounded-sm transition-all duration-200 hover:bg-parchment-dark hover:shadow-sm"
              >
                <h3 className="font-heading text-lg text-espresso italic mb-2 group-hover:text-ember transition-colors">
                  {locale === "sv" ? item.name_sv : item.name_en}
                </h3>
                <p className="text-smoke text-sm font-body mb-3 leading-relaxed">
                  {locale === "sv" ? item.description_sv : item.description_en}
                </p>
                {item.dietary.length > 0 && (
                  <div className="flex gap-1 justify-center mb-3">
                    {item.dietary.map((d) => (
                      <DietaryBadge key={d} type={d} locale={locale} />
                    ))}
                  </div>
                )}
                <p className="font-body text-ember font-semibold tabular-nums">
                  {item.price} kr
                </p>
              </a>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href={locale === "sv" ? "/meny" : "/en/menu"}
              className="btn-ghost"
            >
              {locale === "sv" ? "Se hela menyn" : "View full menu"}
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══ Story teaser ═══ */}
      <ScrollReveal>
        <section className="bg-parchment-dark py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3">
              <h2 className="font-heading text-xl md:text-2xl text-espresso italic mb-4">
                {locale === "sv"
                  ? "Din pizzeria i hjärtat av Södermanland"
                  : "Your pizzeria in the heart of Södermanland"}
              </h2>
              <p className="text-smoke font-body leading-relaxed mb-4">
                {locale === "sv"
                  ? "Vi har serverat pizza, kebab, hamburgare och sallader till hungriga kunder i Stora Sundby och omnejd i många år. Allt lagas färskt med kvalitetsingredienser."
                  : "We've been serving pizza, kebab, burgers and salads to hungry customers in Stora Sundby and the surrounding area for many years. Everything is made fresh with quality ingredients."}
              </p>
              <a
                href={locale === "sv" ? "/om-oss" : "/en/about"}
                className="font-body text-sm text-ember hover:text-ember-dark transition-colors inline-flex items-center gap-1"
              >
                {locale === "sv" ? "Läs mer om oss" : "Read more about us"}
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="md:col-span-2 flex justify-center">
              {/* Decorative element — service area badge cluster */}
              <div className="text-center">
                <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-3">
                  {locale === "sv" ? "Vi serverar" : "We serve"}
                </p>
                <p className="font-heading text-sm italic text-smoke leading-loose">
                  Katrineholm · Eskilstuna · Kungsör
                  <br />
                  Julita · Västermo · Hjälmaresund
                  <br />
                  Lista · Gillberga
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══ Order CTA ═══ */}
      <section className="bg-espresso py-20 md:py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-parchment italic mb-4">
            {locale === "sv" ? "Hungrig?" : "Hungry?"}
          </h2>
          <p className="font-body text-parchment/50 mb-8">
            {locale === "sv"
              ? "Kolla menyn, markera det du vill ha och ring oss!"
              : "Check the menu, mark what you want and give us a call!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={locale === "sv" ? "/meny" : "/en/menu"}
              className="btn-primary"
            >
              {locale === "sv" ? "Se Menyn" : "View Menu"}
            </a>
            <a
              href={`tel:${RESTAURANT.phoneIntl}`}
              className="btn-ghost border-parchment/20 text-parchment/70 hover:text-parchment hover:border-parchment/40"
            >
              {RESTAURANT.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
