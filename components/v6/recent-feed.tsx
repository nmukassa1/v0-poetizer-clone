"use client"

import type { V4PiecePost } from "@/lib/v4-feed-data"
import { PieceCard } from "@/components/v5/piece-card"
import { Divider } from "@/components/v5/primitives"
import { QuoteCallout, ReadersLovingGrid, TrendingWriters } from "@/components/v5/features"

export function RecentFeed({
  items,
  showFeatures,
}: {
  items: V4PiecePost[]
  showFeatures: boolean
}) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center font-sans text-[13px] text-[var(--v5-subtle)]">
        Nothing here yet.
      </p>
    )
  }

  if (!showFeatures) {
    return (
      <>
        {items.map((item, i) => (
          <PieceCard key={i} post={item} />
        ))}
      </>
    )
  }

  const chunks = [
    { items: items.slice(0, 2), feature: "trending" as const },
    { items: items.slice(2, 4), feature: "loved" as const },
    { items: items.slice(4, 5), feature: "quote" as const },
    { items: items.slice(5), feature: null },
  ]

  return (
    <>
      {chunks.map((chunk, ci) => (
        <div key={ci}>
          {chunk.items.map((item, i) => (
            <PieceCard key={i} post={item} />
          ))}
          {chunk.feature === "trending" && chunk.items.length > 0 && (
            <>
              <Divider label="Trending writers" className="lg:hidden" />
              <div className="lg:hidden">
                <TrendingWriters />
              </div>
            </>
          )}
          {chunk.feature === "loved" && chunk.items.length > 0 && (
            <>
              <Divider label="Readers are loving" className="lg:hidden" />
              <div className="lg:hidden">
                <ReadersLovingGrid />
              </div>
            </>
          )}
          {chunk.feature === "quote" && chunk.items.length > 0 && (
            <>
              <Divider label="Worth remembering" className="lg:hidden" />
              <div className="lg:hidden">
                <QuoteCallout />
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
}
