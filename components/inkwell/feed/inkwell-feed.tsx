"use client"

import { useState } from "react"
import Link from "next/link"
import {
  featured,
  feedItems,
  weeklyPrompt,
  type PiecePost,
} from "@/lib/feed-data"
import { FeaturedCard, PromptRail } from "@/components/inkwell/cards"
import { Divider, MenuIcon } from "@/components/inkwell/primitives"
import { StreakWidget } from "@/components/inkwell/streak-widget"
import { DesktopSidebar } from "@/components/inkwell/feed/desktop-sidebar"
import { RecentFeed } from "@/components/inkwell/feed/recent-feed"
import { WelcomeCard } from "@/components/inkwell/feed/welcome-card"
import { getPublicProfileHref } from "@/lib/profiles"

type FeedFilter = "all" | "poems" | "stories" | "essays"

const filters: { key: FeedFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Stories" },
  { key: "essays", label: "Essays" },
]

const allPieces: PiecePost[] = feedItems.filter(
  (item): item is PiecePost => item.kind === "piece",
)

function filterPieces(items: PiecePost[], filter: FeedFilter): PiecePost[] {
  if (filter === "all") return items
  if (filter === "poems") return items.filter((item) => item.type === "poem")
  if (filter === "stories") return items.filter((item) => item.type === "story")
  if (filter === "essays") return items.filter((item) => item.type === "essay")
  return items
}

export function InkwellFeed() {
  const [filter, setFilter] = useState<FeedFilter>("all")
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const visibleItems = filterPieces(allPieces, filter)

  const showFirstSlot = filter === "all"

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-20 lg:max-w-6xl lg:pb-24 xl:max-w-7xl">
      <header className="sticky top-0 z-10 border-b border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_95%,transparent)] backdrop-blur-md">
        <div className="flex h-12 items-center justify-between gap-3 px-4 min-[480px]:h-[52px] min-[480px]:px-6 lg:h-16 lg:px-8 xl:px-10">
          <span className="text-lg font-bold tracking-tight min-[480px]:text-xl lg:text-2xl">
            inkwell
          </span>

          <nav
            className="hidden gap-1 min-[480px]:flex lg:gap-2"
            aria-label="Feed filters"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
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

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <Link
                href={`/profile`}
                className="hidden shrink-0 rounded-full border border-[var(--ink-border)] px-3 py-1 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] min-[480px]:inline-flex lg:px-3.5 lg:py-1.5 lg:text-xs"
              >
                My profile
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsLoggedIn((v) => !v)}
              className={`shrink-0 cursor-pointer rounded-full border px-3 py-1 font-sans text-[11px] font-medium tracking-wide transition-colors lg:px-3.5 lg:py-1.5 lg:text-xs ${
                isLoggedIn
                  ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                  : "border-[#ddd8ce] text-[var(--ink-fg)] hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)]"
              }`}
              aria-pressed={isLoggedIn}
            >
              {isLoggedIn ? "Sign out" : "Sign in"}
            </button>

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

      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12 xl:px-10">
        <main className="min-w-0">
          {showFirstSlot && (
            <section className="lg:hidden">
              <Divider label={isLoggedIn ? "Your streaks" : "Welcome to inkwell"} />
              {isLoggedIn ? <StreakWidget /> : <WelcomeCard />}
            </section>
          )}

          <section>
            <Divider label="Featured" />
            <FeaturedCard
              post={featured}
              authorHref={getPublicProfileHref(featured.author)}
            />
          </section>

          <section>
            <Divider label="This week's prompt" accent />
            <PromptRail
              prompt={weeklyPrompt}
              authorHrefFor={(author) => getPublicProfileHref(author)}
            />
          </section>

          <section>
            <Divider label="Recent" />
            <RecentFeed
              items={visibleItems}
              showFeatures={filter === "all"}
            />
          </section>
        </main>

        {filter === "all" && (
          <DesktopSidebar isLoggedIn={isLoggedIn} showFirstSlot={showFirstSlot} />
        )}
      </div>
    </div>
  )
}
