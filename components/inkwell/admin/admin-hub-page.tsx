import Link from "next/link"

const adminSections = [
  {
    href: "/admin/prompts",
    title: "Prompts",
    description:
      "Create weekly writing prompts, set one live at a time, and review submissions.",
  },
  {
    href: "/admin/quotes",
    title: "Quotes",
    description:
      "Add inspirational quotes for readers. One quote is featured each day across the app.",
  },
] as const

export function AdminHubPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 min-[480px]:px-6 lg:px-8">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
        Admin
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--ink-fg)]">
        Inkwell admin
      </h1>
      <p className="mt-2 font-sans text-sm text-[var(--ink-muted)]">
        Manage prompts, quotes, and other site content.
      </p>

      <ul className="mt-10 space-y-4">
        {adminSections.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="block rounded-xl border border-[var(--ink-border)] bg-white p-5 transition-colors hover:border-[var(--ink-fg)]"
            >
              <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)]">
                {section.title}
              </h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--ink-muted)]">
                {section.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
