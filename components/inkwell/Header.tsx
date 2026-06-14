"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Settings } from "lucide-react"
import { MenuIcon } from "@/components/inkwell/primitives"
import { useAuth } from "@/components/inkwell/auth-provider"
import {
  browseFilterHref,
  getActiveBrowseFilter,
} from "@/components/inkwell/browse/constants"
import { FEED_FILTERS } from "@/components/inkwell/feed/constants"
import type { FeedFilter } from "@/components/inkwell/feed/types"

export type { FeedFilter } from "@/components/inkwell/feed/types"
/** @deprecated Use FEED_FILTERS from `@/components/inkwell/feed/constants` */
export { FEED_FILTERS as feedFilters } from "@/components/inkwell/feed/constants"

function filterLinkClass(active: boolean, compact = false) {
  const base = compact
    ? "rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium"
    : "rounded-full border px-[11px] py-1 font-sans text-[11px] font-medium tracking-wide transition-all lg:px-4 lg:py-1.5 lg:text-sm"

  return `${base} ${
    active
      ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
      : compact
        ? "border-[#ddd8ce] text-[#8b8780]"
        : "border-transparent text-[#8b8780] hover:text-[var(--ink-fg)]"
  }`
}

export function Header() {
  const { isLoggedIn, isLoading, signOut } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const showProfileSettings = isLoggedIn && pathname === "/profile"
  const activeFilter = getActiveBrowseFilter(pathname)

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_95%,transparent)] backdrop-blur-md">
      <div className="flex h-12 items-center justify-between gap-3 px-4 min-[480px]:h-[52px] min-[480px]:px-6 lg:h-16 lg:px-8 xl:px-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight min-[480px]:text-xl lg:text-2xl"
        >
          inkwell
        </Link>

        <nav
          className="hidden gap-1 min-[480px]:flex lg:gap-2"
          aria-label="Feed filters"
        >
          {FEED_FILTERS.map((f) => (
            <Link
              key={f.key}
              href={browseFilterHref(f.key)}
              className={filterLinkClass(activeFilter === f.key)}
            >
              {f.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <div className="hidden items-center gap-1.5 min-[480px]:flex">
              <Link
                href="/profile"
                className="shrink-0 rounded-full border border-[var(--ink-border)] px-3 py-1 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] lg:px-3.5 lg:py-1.5 lg:text-xs"
              >
                My profile
              </Link>
              {showProfileSettings && (
                <Link
                  href="/profile/settings"
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--ink-border)] p-1.5 text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] lg:p-2"
                  aria-label="Profile settings"
                >
                  <Settings className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                </Link>
              )}
            </div>
          )}
          {!isLoading &&
            (isLoggedIn ? (
              <button
                type="button"
                onClick={() => void signOut()}
                className="shrink-0 cursor-pointer rounded-full border border-[var(--ink-fg)] bg-[var(--ink-fg)] px-3 py-1 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-bg)] transition-colors lg:px-3.5 lg:py-1.5 lg:text-xs"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="shrink-0 rounded-full border border-[#ddd8ce] px-3 py-1 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-fg)] transition-colors hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)] lg:px-3.5 lg:py-1.5 lg:text-xs"
              >
                Sign in
              </Link>
            ))}

          <button
            type="button"
            className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-[var(--ink-fg)] min-[480px]:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle filters"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-wrap gap-1.5 border-t border-[var(--ink-border)] px-4 py-2.5 min-[480px]:hidden"
          aria-label="Feed filters"
        >
          {FEED_FILTERS.map((f) => (
            <Link
              key={f.key}
              href={browseFilterHref(f.key)}
              onClick={() => setMenuOpen(false)}
              className={filterLinkClass(activeFilter === f.key, true)}
            >
              {f.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
