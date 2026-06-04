"use client"

import { useState } from "react"
import { MenuIcon } from "@/components/inkwell/primitives"
import { BROWSE_FILTERS } from "./constants"
import type { BrowseFilter } from "./types"

export function BrowseFilterBar({
  filter,
  onFilterChange,
}: {
  filter: BrowseFilter
  onFilterChange: (filter: BrowseFilter) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="sticky top-12 z-[9] -mx-4 border-b border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_95%,transparent)] backdrop-blur-md min-[480px]:-mx-6 min-[480px]:top-[52px] lg:top-16 lg:-mx-8 xl:-mx-10">
      <nav
        className="hidden gap-1 px-4 py-3 min-[480px]:flex min-[480px]:px-6 lg:gap-2 lg:px-8 xl:px-10"
        aria-label="Browse filters"
      >
        {BROWSE_FILTERS.map((f) => (
          <FilterButton
            key={f.key}
            label={f.label}
            active={filter === f.key}
            onClick={() => onFilterChange(f.key)}
          />
        ))}
      </nav>

      <div className="flex items-center justify-between gap-2 px-4 py-3 min-[480px]:hidden">
        <span className="font-sans text-[11px] font-medium text-[var(--ink-muted)]">
          {BROWSE_FILTERS.find((f) => f.key === filter)?.label}
        </span>
        <button
          type="button"
          className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-[var(--ink-fg)]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle filters"
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-wrap gap-1.5 border-t border-[var(--ink-border)] px-4 py-3 min-[480px]:hidden"
          aria-label="Browse filters"
        >
          {BROWSE_FILTERS.map((f) => (
            <FilterButton
              key={f.key}
              label={f.label}
              active={filter === f.key}
              compact
              onClick={() => {
                onFilterChange(f.key)
                setMenuOpen(false)
              }}
            />
          ))}
        </nav>
      )}
    </div>
  )
}

function FilterButton({
  label,
  active,
  onClick,
  compact = false,
}: {
  label: string
  active: boolean
  onClick: () => void
  compact?: boolean
}) {
  const base = compact
    ? "cursor-pointer rounded-full border px-3 py-1 font-sans text-[11px] font-medium tracking-wide"
    : "cursor-pointer rounded-full border px-[11px] py-1 font-sans text-[11px] font-medium tracking-wide transition-all lg:px-4 lg:py-1.5 lg:text-sm"

  const activeClass = active
    ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
    : compact
      ? "border-[#ddd8ce] text-[var(--ink-fg)]"
      : "border-[#ddd8ce] text-[var(--ink-fg)] hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)]"

  return (
    <button type="button" onClick={onClick} className={`${base} ${activeClass}`}>
      {label}
    </button>
  )
}
