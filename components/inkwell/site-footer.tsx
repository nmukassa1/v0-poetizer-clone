"use client"

import Link from "next/link"
import { useAuth } from "@/components/inkwell/auth-provider"

type FooterLink = {
  href: string
  label: string
  auth?: "in" | "out"
}

const productLinks: FooterLink[] = [
  { href: "/", label: "Feed" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/write", label: "Write", auth: "in" },
]

const accountLinks: FooterLink[] = [
  { href: "/profile", label: "My profile", auth: "in" },
  { href: "/profile/settings", label: "Settings", auth: "in" },
]

function FooterLinkList({
  title,
  links,
  isLoggedIn,
}: {
  title: string
  links: FooterLink[]
  isLoggedIn: boolean
}) {
  const visible = links.filter((link) => {
    if (link.auth === "in") return isLoggedIn
    if (link.auth === "out") return !isLoggedIn
    return true
  })

  if (visible.length === 0) return null

  return (
    <div>
      <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {visible.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-sans text-[13px] text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const { isLoggedIn } = useAuth()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_92%,var(--ink-border))]">
      <div className="mx-auto max-w-7xl px-4 py-10 min-[480px]:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="min-[480px]:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-tight text-[var(--ink-fg)]"
            >
              inkwell
            </Link>
            <p className="mt-3 max-w-sm font-serif text-[14px] leading-relaxed text-[var(--ink-muted)]">
              A home for poems, stories, and essays — written slowly, read
              carefully.
            </p>
          </div>

          <FooterLinkList
            title="Explore"
            links={productLinks}
            isLoggedIn={isLoggedIn}
          />
          <FooterLinkList
            title="Account"
            links={accountLinks}
            isLoggedIn={isLoggedIn}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--ink-border-soft)] pt-6 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
          <p className="font-sans text-[11px] text-[var(--ink-subtle)]">
            © {year} inkwell
          </p>
          <p className="font-sans text-[11px] text-[var(--ink-subtle)]">
            Built for writers and readers.
          </p>
        </div>
      </div>
    </footer>
  )
}
