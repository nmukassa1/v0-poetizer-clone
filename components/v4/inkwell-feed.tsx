"use client"

import { useState } from "react"
import {
  filterV4Feed,
  v4Featured,
  v4FeedItems,
  v4WeeklyPrompt,
  type V4Filter,
} from "@/lib/v4-feed-data"
import { FeaturedCard, PromptRail } from "@/components/v4/cards"
import { Divider } from "@/components/v4/primitives"
import { RecentFeed } from "@/components/v4/recent-feed"

const filters: { key: V4Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pieces", label: "Pieces" },
  { key: "posts", label: "Posts" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Stories" },
]

export function InkwellFeed() {
  const [filter, setFilter] = useState<V4Filter>("all")
  const visibleItems = filterV4Feed(v4FeedItems, filter)

  const showFeatured =
    filter === "all" || filter === "pieces" || filter === "poems"
  const showPrompt =
    filter === "all" ||
    filter === "pieces" ||
    filter === "poems" ||
    filter === "stories"

  return (
    <div className="min-h-screen w-full pb-16 sm:pb-20 md:pb-24">
      <header className="sticky top-0 z-10 border-b border-[var(--v4-border)] bg-[color-mix(in_srgb,var(--v4-bg)_92%,transparent)] px-5 backdrop-blur-md sm:px-8 lg:px-12 xl:px-16">
        <div className="flex h-14 flex-col gap-3 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
          <span className="shrink-0 text-2xl font-bold tracking-tight sm:text-3xl">
            inkwell
          </span>
          <nav
            className="v4-scrollbar-hide -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 sm:mx-0 sm:flex-wrap sm:justify-end sm:gap-2 sm:overflow-visible sm:pb-0"
            aria-label="Feed filters"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 font-sans text-sm font-medium tracking-wide transition-all sm:px-4 sm:py-2 ${
                  filter === f.key
                    ? "border-[var(--v4-fg)] bg-[var(--v4-fg)] text-[var(--v4-bg)]"
                    : "border-transparent text-[#8b8780] hover:text-[var(--v4-fg)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
        {showFeatured && (
          <>
            <Divider label="Featured" />
            <FeaturedCard post={v4Featured} />
          </>
        )}

        {showPrompt && (
          <>
            <Divider label="This week's prompt" accent />
            <PromptRail prompt={v4WeeklyPrompt} />
          </>
        )}

        <Divider label="Recent" />
        <RecentFeed items={visibleItems} showFeatures={filter === "all"} />
      </div>
    </div>
  )
}
