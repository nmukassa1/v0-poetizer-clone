"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { featured, feedItems, type ContentTag, type PiecePost } from "@/lib/feed-data"
import { FeaturedCard } from "@/components/inkwell/cards"
import { MenuIcon } from "@/components/inkwell/primitives"
import { BrowsePieceCard } from "@/components/inkwell/browse/browse-piece-card"
import { getPublicProfileHref } from "@/lib/profiles"

export type BrowseFilter = "all" | "poems" | "stories" | "essays"

const browseFilters: { key: BrowseFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Short stories" },
  { key: "essays", label: "Essays" },
]

const allPieces: PiecePost[] = feedItems.filter(
  (item): item is PiecePost => item.kind === "piece",
)

function filterPieces(items: PiecePost[], filter: BrowseFilter): PiecePost[] {
  if (filter === "all") return items
  if (filter === "poems") return items.filter((item) => item.type === "poem")
  if (filter === "stories") return items.filter((item) => item.type === "story")
  if (filter === "essays") return items.filter((item) => item.type === "essay")
  return items
}

function typeLabel(type: ContentTag): string {
  if (type === "story") return "Short story"
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function BrowsePage() {
  const [filter, setFilter] = useState<BrowseFilter>("all")
  const [menuOpen, setMenuOpen] = useState(false)

  const showFeatured = useMemo(() => {
    if (filter === "all") return true
    if (filter === "poems") return featured.type === "poem"
    if (filter === "stories") return featured.type === "story"
    return featured.type === "essay"
  }, [filter])

  const gridPieces = useMemo(() => {
    const filtered = filterPieces(allPieces, filter)
    const featuredTitle = featured.title
    return filtered.filter((piece) => piece.title !== featuredTitle)
  }, [filter])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 min-[480px]:px-6 lg:px-8 lg:pb-24 xl:px-10">
      <header className="border-b border-[var(--ink-border)] py-8 min-[480px]:py-10 lg:py-12">
        <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-subtle)]">
          Library
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--ink-fg)] min-[480px]:text-4xl lg:text-5xl">
          Browse pieces
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-[var(--ink-muted)] min-[480px]:text-base">
          Poems, short stories, and essays from writers across inkwell — start
          with our featured pick, then explore the full collection.
        </p>
      </header>

      <div className="sticky top-12 z-[9] -mx-4 border-b border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_95%,transparent)] backdrop-blur-md min-[480px]:-mx-6 min-[480px]:top-[52px] lg:top-16 lg:-mx-8 xl:-mx-10">
        <nav
          className="hidden gap-1 px-4 py-3 min-[480px]:flex min-[480px]:px-6 lg:gap-2 lg:px-8 xl:px-10"
          aria-label="Browse filters"
        >
          {browseFilters.map((f) => (
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

        <div className="flex items-center justify-between px-4 py-2.5 min-[480px]:hidden">
          <span className="font-sans text-[11px] font-medium text-[var(--ink-muted)]">
            {browseFilters.find((f) => f.key === filter)?.label}
          </span>
          <button
            type="button"
            className="flex cursor-pointer items-center border-0 bg-transparent p-1 text-[var(--ink-fg)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle filters"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>

        {menuOpen && (
          <nav
            className="flex flex-wrap gap-1.5 border-t border-[var(--ink-border)] px-4 py-2.5 min-[480px]:hidden"
            aria-label="Browse filters"
          >
            {browseFilters.map((f) => (
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
      </div>

      {showFeatured && (
        <section className="py-8 min-[480px]:py-10 lg:py-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
                Featured
              </p>
              <h2 className="mt-1 font-serif text-xl font-semibold text-[var(--ink-fg)] min-[480px]:text-2xl">
                Editor&apos;s pick
              </h2>
            </div>
            <span className="font-sans text-[11px] text-[var(--ink-muted)]">
              {typeLabel(featured.type)} · {featured.date}
            </span>
          </div>
          <FeaturedCard
            post={featured}
            authorHref={getPublicProfileHref(featured.author)}
          />
        </section>
      )}

      <section className="pb-4">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)] min-[480px]:text-2xl">
            All pieces
          </h2>
          <span className="font-sans text-[11px] tabular-nums text-[var(--ink-subtle)]">
            {gridPieces.length}{" "}
            {gridPieces.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {gridPieces.length === 0 ? (
          <p className="py-16 text-center font-serif text-[15px] text-[var(--ink-muted)]">
            No pieces in this category yet.{" "}
            <Link
              href="/"
              className="font-semibold text-[var(--ink-fg)] underline-offset-2 hover:underline"
            >
              Back to feed
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[640px]:gap-5 lg:gap-6">
            {gridPieces.map((piece) => (
              <BrowsePieceCard
                key={`${piece.title}-${piece.author}`}
                post={piece}
                readHref="/read"
                authorHref={getPublicProfileHref(piece.author)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
