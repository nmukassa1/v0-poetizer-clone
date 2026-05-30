"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings } from "lucide-react"
import { MenuIcon } from "@/components/inkwell/primitives"
import { useAuth } from "@/components/inkwell/auth-provider"

export type FeedFilter = "all" | "poems" | "stories" | "essays"

export const feedFilters: { key: FeedFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Stories" },
  { key: "essays", label: "Essays" },
]

type HeaderProps = {
  filter?: FeedFilter
  onFilterChange?: (filter: FeedFilter) => void
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
}

export function Header({
  filter,
  onFilterChange,
  menuOpen: menuOpenProp,
  onMenuOpenChange,
}: HeaderProps = {}) {
  const { isLoggedIn, toggleAuth } = useAuth()
  const pathname = usePathname()
  const showProfileSettings =
    isLoggedIn && pathname === "/profile"

  const showFeedFilters = filter !== undefined && onFilterChange !== undefined

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_95%,transparent)] backdrop-blur-md">
      <div className="flex h-12 items-center justify-between gap-3 px-4 min-[480px]:h-[52px] min-[480px]:px-6 lg:h-16 lg:px-8 xl:px-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight min-[480px]:text-xl lg:text-2xl"
        >
          inkwell
        </Link>

        {showFeedFilters && (
          <nav
            className="hidden gap-1 min-[480px]:flex lg:gap-2"
            aria-label="Feed filters"
          >
            {feedFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => onFilterChange(f.key)}
                className={`cursor-pointer rounded-full border px-[11px] py-1 font-sans text-[11px] font-medium tracking-wide transition-all lg:px-4 lg:py-1.5 lg:text-sm ${
                  filter === f.key
                    ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                    : "border-transparent text-[#8b8780] hover:text-[var(--ink-fg)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
        )}

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
          <button
            type="button"
            onClick={toggleAuth}
            className={`shrink-0 cursor-pointer rounded-full border px-3 py-1 font-sans text-[11px] font-medium tracking-wide transition-colors lg:px-3.5 lg:py-1.5 lg:text-xs ${
              isLoggedIn
                ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                : "border-[#ddd8ce] text-[var(--ink-fg)] hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)]"
            }`}
            aria-pressed={isLoggedIn}
          >
            {isLoggedIn ? "Sign out" : "Sign in"}
          </button>

          {showFeedFilters && (
            <button
              type="button"
              className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-[var(--ink-fg)] min-[480px]:hidden"
              onClick={() => onMenuOpenChange?.(!menuOpenProp)}
              aria-label="Toggle filters"
              aria-expanded={menuOpenProp}
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </div>

      {showFeedFilters && menuOpenProp && (
        <nav
          className="flex flex-wrap gap-1.5 border-t border-[var(--ink-border)] px-4 py-2.5 min-[480px]:hidden"
          aria-label="Feed filters"
        >
          {feedFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                onFilterChange(f.key)
                onMenuOpenChange?.(false)
              }}
              className={`cursor-pointer rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium ${
                filter === f.key
                  ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                  : "border-[#ddd8ce] text-[#8b8780]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
