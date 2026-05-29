"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "@/components/inkwell/primitives"

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
  isLoggedIn?: boolean
  onAuthToggle?: () => void
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
}

export function Header({
  filter,
  onFilterChange,
  isLoggedIn: isLoggedInProp,
  onAuthToggle,
  menuOpen: menuOpenProp,
  onMenuOpenChange,
}: HeaderProps = {}) {
  const [internalLoggedIn, setInternalLoggedIn] = useState(false)
  const [internalMenuOpen, setInternalMenuOpen] = useState(false)

  const isLoggedIn = isLoggedInProp ?? internalLoggedIn
  const handleAuthToggle = onAuthToggle ?? (() => setInternalLoggedIn((v) => !v))
  const menuOpen = menuOpenProp ?? internalMenuOpen
  const handleMenuOpenChange =
    onMenuOpenChange ?? ((open: boolean) => setInternalMenuOpen(open))

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
            <Link
              href="/profile"
              className="hidden shrink-0 rounded-full border border-[var(--ink-border)] px-3 py-1 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] min-[480px]:inline-flex lg:px-3.5 lg:py-1.5 lg:text-xs"
            >
              My profile
            </Link>
          )}
          <button
            type="button"
            onClick={handleAuthToggle}
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
              onClick={() => handleMenuOpenChange(!menuOpen)}
              aria-label="Toggle filters"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </div>

      {showFeedFilters && menuOpen && (
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
                handleMenuOpenChange(false)
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
