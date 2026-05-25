"use client"

import { useState } from "react"
import {
  v4Featured,
  v4FeedItems,
  v4WeeklyPrompt,
  type V4PiecePost,
} from "@/lib/v4-feed-data"
import { FeaturedCard, PromptRail } from "@/components/v5/cards"
import { DesktopSidebar } from "@/components/v5/desktop-sidebar"
import { Divider, MenuIcon } from "@/components/v5/primitives"
import { StreakWidget } from "@/components/v5/streak-widget"
import { RecentFeed } from "@/components/v6/recent-feed"

type V6Filter = "all" | "poems" | "stories" | "essays"

const filters: { key: V6Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Stories" },
  { key: "essays", label: "Essays" },
]

const allPieces: V4PiecePost[] = v4FeedItems.filter(
  (item): item is V4PiecePost => item.kind === "piece",
)

function filterPieces(items: V4PiecePost[], filter: V6Filter): V4PiecePost[] {
  if (filter === "all") return items
  if (filter === "poems") return items.filter((item) => item.type === "poem")
  if (filter === "stories") return items.filter((item) => item.type === "story")
  if (filter === "essays") return items.filter((item) => item.type === "essay")
  return items
}

export function InkwellFeed() {
  const [filter, setFilter] = useState<V6Filter>("all")
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleItems = filterPieces(allPieces, filter)

  const showStreaks = filter === "all"
  const showFeatured = true
  const showPrompt = true

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl">
      <header className="sticky top-0 z-10 border-b border-[var(--v5-border)] bg-[color-mix(in_srgb,var(--v5-bg)_95%,transparent)] backdrop-blur-md">
        <div className="flex h-12 items-center justify-between px-4 min-[480px]:h-[52px] min-[480px]:px-6 lg:h-16 lg:px-8 xl:px-10">
          <span className="text-lg font-bold tracking-tight min-[480px]:text-xl lg:text-2xl">
            inkwell
          </span>

          <nav className="hidden gap-1 min-[480px]:flex lg:gap-2" aria-label="Feed filters">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`cursor-pointer rounded-full border px-[11px] py-1 font-sans text-[11px] font-medium tracking-wide transition-all lg:px-4 lg:py-1.5 lg:text-sm ${
                  filter === f.key
                    ? "border-[var(--v5-fg)] bg-[var(--v5-fg)] text-[var(--v5-bg)]"
                    : "border-transparent text-[#8b8780] hover:text-[var(--v5-fg)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-[var(--v5-fg)] min-[480px]:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle filters"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>

        {menuOpen && (
          <nav
            className="flex flex-wrap gap-1.5 border-t border-[var(--v5-border)] px-4 py-2.5 min-[480px]:hidden"
            aria-label="Feed filters"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  setFilter(f.key)
                  setMenuOpen(false)
                }}
                className={`cursor-pointer rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium ${
                  filter === f.key
                    ? "border-[var(--v5-fg)] bg-[var(--v5-fg)] text-[var(--v5-bg)]"
                    : "border-[#ddd8ce] text-[#8b8780]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12 xl:px-10">
        <main className="min-w-0">
          {showStreaks && (
            <section className="lg:hidden">
              <Divider label="Your streaks" />
              <StreakWidget />
            </section>
          )}

          {showFeatured && (
            <section>
              <Divider label="Featured" />
              <FeaturedCard post={v4Featured} />
            </section>
          )}

          {showPrompt && (
            <section>
              <Divider label="This week's prompt" accent />
              <PromptRail prompt={v4WeeklyPrompt} />
            </section>
          )}

          <section>
            <Divider label="Recent" />
            <RecentFeed items={visibleItems} showFeatures={filter === "all"} />
          </section>
        </main>

        {filter === "all" && <DesktopSidebar showStreaks={showStreaks} />}
      </div>
    </div>
  )
}
