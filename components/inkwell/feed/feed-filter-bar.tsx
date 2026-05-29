"use client"

import { MenuIcon } from "@/components/inkwell/primitives"
import { feedFilters, type FeedFilter } from "@/components/inkwell/Header"

type FeedFilterBarProps = {
  filter: FeedFilter
  onFilterChange: (filter: FeedFilter) => void
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}

export function FeedFilterBar({
  filter,
  onFilterChange,
  menuOpen,
  onMenuOpenChange,
}: FeedFilterBarProps) {
  return (
    <div className="sticky top-12 z-[9] border-b border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_95%,transparent)] backdrop-blur-md min-[480px]:top-[52px] lg:top-16">
      <nav
        className="hidden gap-1 px-4 py-2 min-[480px]:flex min-[480px]:px-6 lg:gap-2 lg:px-8 xl:px-10"
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

      <div className="flex items-center justify-between px-4 py-2 min-[480px]:hidden">
        <span className="font-sans text-[11px] font-medium text-[var(--ink-muted)]">
          Filter
        </span>
        <button
          type="button"
          className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-[var(--ink-fg)]"
          onClick={() => onMenuOpenChange(!menuOpen)}
          aria-label="Toggle filters"
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>
      </div>

      {menuOpen && (
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
                onMenuOpenChange(false)
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
    </div>
  )
}
