import { useTranslations, useLocale } from "next-intl";
import { RESTAURANT } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tContact = useTranslations("Contact");
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + contact */}
          <div>
            <p className="font-heading text-xl text-cream mb-4">
              Stora Sundby Gatukök
            </p>
            <div className="space-y-2 text-sm font-body">
              <p>
                <a
                  href={`tel:${RESTAURANT.phoneIntl}`}
                  className="hover:text-cream transition-colors"
                >
                  {tContact("phone")}: {RESTAURANT.phone}
                </a>
              </p>
              <p>
                {RESTAURANT.address.street}
                <br />
                {RESTAURANT.address.postalCode} {RESTAURANT.address.city}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-heading text-sm uppercase tracking-wider text-cream mb-4">
              {tNav("menu")}
            </p>
            <nav className="space-y-2 text-sm font-body">
              <a href={locale === "sv" ? "/meny" : "/en/menu"} className="block hover:text-cream transition-colors">{tNav("menu")}</a>
              <a href={locale === "sv" ? "/bestall" : "/en/order"} className="block hover:text-cream transition-colors">{tNav("order")}</a>
              <a href={locale === "sv" ? "/dagens-lunch" : "/en/daily-specials"} className="block hover:text-cream transition-colors">{tNav("dailySpecials")}</a>
              <a href={locale === "sv" ? "/kontakt" : "/en/contact"} className="block hover:text-cream transition-colors">{tNav("contact")}</a>
              <a href={locale === "sv" ? "/om-oss" : "/en/about"} className="block hover:text-cream transition-colors">{tNav("about")}</a>
            </nav>
          </div>

          {/* Service areas (SEO) */}
          <div>
            <p className="font-heading text-sm uppercase tracking-wider text-cream mb-4">
              {tContact("serviceArea")}
            </p>
            <div className="flex flex-wrap gap-2">
              {RESTAURANT.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs font-body bg-cream/10 px-2 py-1 rounded"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body">
          <p>
            &copy; {currentYear} {RESTAURANT.name}. {t("allRightsReserved")}.
          </p>
          {/* Social placeholder for v2 */}
          <div className="flex gap-4">
            {/* Social links will be populated from Sanity siteSettings */}
          </div>
        </div>
      </div>
    </footer>
  );
}
