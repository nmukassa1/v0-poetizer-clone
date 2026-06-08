import type { ComponentPropsWithoutRef } from "react"
import { Tag } from "@/components/inkwell/primitives"

const pillClassName =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-border)] bg-[var(--ink-bg)] px-3 py-1.5"

export function ProfileStatPill({
  label,
  value,
  tag = false,
  interactive = false,
  className = "",
  ...props
}: {
  label: string
  value: string
  tag?: boolean
  interactive?: boolean
  className?: string
} & ComponentPropsWithoutRef<"button">) {
  const content = (
    <>
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
    </>
  )

  if (interactive) {
    return (
      <button
        type="button"
        className={`${pillClassName} cursor-pointer transition-colors hover:border-[var(--ink-fg)] ${className}`}
        {...props}
      >
        {content}
      </button>
    )
  }

  return <div className={`${pillClassName} ${className}`}>{content}</div>
}
