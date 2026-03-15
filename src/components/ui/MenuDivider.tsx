export default function MenuDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 my-2 ${className}`}
      role="separator"
    >
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-wheat/40 to-transparent" />
      {/* Center ornament — three small dots */}
      <span className="flex gap-1">
        <span className="w-1 h-1 rounded-full bg-wheat/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-wheat/60" />
        <span className="w-1 h-1 rounded-full bg-wheat/40" />
      </span>
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-wheat/40 to-transparent" />
    </div>
  );
}
