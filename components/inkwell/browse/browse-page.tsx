"use client"

import { useMemo, useState } from "react"
import type { Featured, PiecePost } from "@/lib/feed/types"
import { BrowseFeaturedSection } from "./browse-featured-section"
import { BrowseFilterBar } from "./browse-filter-bar"
import { BrowseHeader } from "./browse-header"
import { BrowsePiecesGrid } from "./browse-pieces-grid"
import type { BrowseFilter } from "./types"
import { browseGridPieces, shouldShowFeatured } from "./utils"

export type { BrowseFilter } from "./types"

export function BrowsePage({
  pieces,
  featured,
  featuredReadHref,
}: {
  pieces: PiecePost[]
  featured: Featured
  featuredReadHref?: string
}) {
  const [filter, setFilter] = useState<BrowseFilter>("all")

  const showFeatured = useMemo(
    () => shouldShowFeatured(filter, featured.type),
    [filter, featured.type],
  )

  const gridPieces = useMemo(
    () => browseGridPieces(pieces, filter, featured),
    [pieces, filter, featured],
  )

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 min-[480px]:px-6 lg:px-8 lg:pb-24 xl:px-10">
      <BrowseHeader />
      <BrowseFilterBar filter={filter} onFilterChange={setFilter} />
      {showFeatured && (
        <BrowseFeaturedSection featured={featured} readHref={featuredReadHref} />
      )}
      <BrowsePiecesGrid pieces={gridPieces} />
    </div>
  )
}
