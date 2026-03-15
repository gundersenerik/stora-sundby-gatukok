import { useTranslations, useLocale } from "next-intl";
import { RESTAURANT } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tContact = useTranslations("Contact");
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-parchment/60">
      {/* Top border — wheat gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-wheat/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20 text-center">
        {/* Restaurant name */}
        <p className="font-heading text-2xl md:text-3xl text-parchment italic mb-6">
          Stora Sundby Gatukök
        </p>

        {/* Contact info — compact */}
        <div className="space-y-1.5 text-sm font-body mb-8">
          <p>
            <a
              href={`tel:${RESTAURANT.phoneIntl}`}
              className="hover:text-parchment transition-colors"
            >
              {RESTAURANT.phone}
            </a>
          </p>
          <p>
            {RESTAURANT.address.street}, {RESTAURANT.address.postalCode}{" "}
            {RESTAURANT.address.city}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-body mb-10">
          <a href={locale === "sv" ? "/meny" : "/en/menu"} className="hover:text-parchment transition-colors">{tNav("menu")}</a>
          <a href={locale === "sv" ? "/bestall" : "/en/order"} className="hover:text-parchment transition-colors">{tNav("order")}</a>
          <a href={locale === "sv" ? "/dagens-lunch" : "/en/daily-specials"} className="hover:text-parchment transition-colors">{tNav("dailySpecials")}</a>
          <a href={locale === "sv" ? "/kontakt" : "/en/contact"} className="hover:text-parchment transition-colors">{tNav("contact")}</a>
          <a href={locale === "sv" ? "/om-oss" : "/en/about"} className="hover:text-parchment transition-colors">{tNav("about")}</a>
        </nav>

        {/* Service areas as flowing sentence */}
        <p className="text-xs font-body mb-8 max-w-xl mx-auto leading-relaxed">
          {tContact("serviceArea")}: {RESTAURANT.serviceAreas.join(", ")}
        </p>

        {/* Closing line */}
        <p className="font-heading text-sm italic text-wheat/50 mb-6">
          {locale === "sv"
            ? "Lagat med kärlek i Stora Sundby"
            : "Made with love in Stora Sundby"}
        </p>

        {/* Copyright */}
        <p className="text-xs font-body text-parchment/30">
          &copy; {currentYear} {RESTAURANT.name}
        </p>
      </div>
    </footer>
  );
}
