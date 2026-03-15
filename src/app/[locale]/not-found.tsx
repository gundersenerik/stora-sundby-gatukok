import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main-content"
      className="min-h-[60vh] flex items-center justify-center px-4"
    >
      <div className="text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-espresso italic mb-4">
          404
        </h1>
        <p className="font-heading text-xl italic text-espresso mb-2">
          {t("title")}
        </p>
        <p className="font-body text-smoke mb-8">
          {t("description")}
        </p>
        <a href="/" className="btn-primary">
          {t("goHome")}
        </a>
      </div>
    </main>
  );
}
