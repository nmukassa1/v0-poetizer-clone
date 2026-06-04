import Link from "next/link"

export function ProfileEmptyState({
  title,
  copy,
  ctaLabel,
  ctaHref,
}: {
  title: string
  copy: string
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] px-5 py-10 text-center min-[480px]:px-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--ink-fg)]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
        {copy}
      </p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-5 inline-flex rounded-full bg-[var(--ink-fg)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--ink-bg)]"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}
