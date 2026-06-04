import { Tag } from "@/components/inkwell/primitives"

export function ProfileStatPill({
  label,
  value,
  tag = false,
}: {
  label: string
  value: string
  tag?: boolean
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-border)] bg-[var(--ink-bg)] px-3 py-1.5">
      <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-subtle)]">
        {label}
      </span>
      {tag ? (
        <Tag label={value} />
      ) : (
        <span className="text-[12px] font-semibold text-[var(--ink-fg)]">
          {value}
        </span>
      )}
    </div>
  )
}
