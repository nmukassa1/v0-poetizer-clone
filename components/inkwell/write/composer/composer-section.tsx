export function ComposerSection({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
          {label}
        </span>
        {hint && (
          <span className="font-sans text-[10px] text-[var(--ink-subtle)]/70">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
