"use client"

import type { V4FeedItem } from "@/lib/v4-feed-data"
import { PieceCard } from "@/components/v5/piece-card"
import { SocialPost } from "@/components/v5/cards"
import { Divider } from "@/components/v5/primitives"
import { QuoteCallout, ReadersLovingGrid, TrendingWriters } from "@/components/v5/features"

function FeedItem({ item }: { item: V4FeedItem }) {
  return item.kind === "social" ? <SocialPost post={item} /> : <PieceCard post={item} />
}

export function RecentFeed({
  items,
  showFeatures,
}: {
  items: V4FeedItem[]
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
          <FeedItem key={i} item={item} />
        ))}
      </>
    )
  }

  const chunks = [
    { items: items.slice(0, 3), feature: "trending" as const },
    { items: items.slice(3, 6), feature: "loved" as const },
    { items: items.slice(6, 8), feature: "quote" as const },
    { items: items.slice(8), feature: null },
  ]

  return (
    <>
      {chunks.map((chunk, ci) => (
        <div key={ci}>
          {chunk.items.map((item, i) => (
            <FeedItem key={i} item={item} />
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
