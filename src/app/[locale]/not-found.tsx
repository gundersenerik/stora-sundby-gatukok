import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main-content"
      className="min-h-[60vh] flex items-center justify-center px-4"
    >
      <div className="text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-charcoal mb-4">
          404
        </h1>
        <p className="font-heading text-xl text-charcoal mb-2">
          {t("title")}
        </p>
        <p className="font-body text-charcoal-light mb-8">
          {t("description")}
        </p>
        <a
          href="/"
          className="inline-block bg-red text-white font-body font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-red-dark transition-colors"
        >
          {t("goHome")}
        </a>
      </div>
    </main>
  );
}
