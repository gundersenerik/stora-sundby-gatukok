export default function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-heading text-2xl md:text-3xl text-charcoal mb-8 ${className}`}
    >
      {children}
    </h2>
  );
}
