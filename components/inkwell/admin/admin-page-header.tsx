import Link from "next/link"
import type { ReactNode } from "react"

export function AdminBackLink() {
  return (
    <Link
      href="/admin"
      className="mb-6 inline-flex font-sans text-[13px] font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
    >
      ← Admin
    </Link>
  )
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <AdminBackLink />
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--ink-fg)]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-sm text-[var(--ink-muted)]">
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}
