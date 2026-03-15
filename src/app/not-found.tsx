export default function GlobalNotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-espresso italic mb-2">
          404
        </h1>
        <p className="font-body text-base sm:text-lg text-espresso mb-2">
          Sidan hittades inte
        </p>
        <p className="font-body text-smoke mb-8">
          Sidan du letar efter finns inte.
        </p>
        <a href="/" className="btn-primary">
          Gå till startsidan
        </a>
      </div>
    </main>
  );
}
