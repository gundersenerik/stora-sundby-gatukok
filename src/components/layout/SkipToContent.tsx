export default function SkipToContent({ label }: { label: string }) {
  return (
    <a href="#main-content" className="skip-to-content">
      {label}
    </a>
  );
}
