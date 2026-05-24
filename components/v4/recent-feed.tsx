"use client"

import type { V4FeedItem } from "@/lib/v4-feed-data"
import { PieceCard, SocialPost } from "@/components/v4/cards"
import { Divider } from "@/components/v4/primitives"
import {
  QuoteCallout,
  ReadersLovingGrid,
  TrendingWriters,
} from "@/components/v4/features"

function FeedItem({ item }: { item: V4FeedItem }) {
  return item.kind === "social" ? (
    <SocialPost post={item} />
  ) : (
    <PieceCard post={item} />
  )
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
      <p className="py-12 text-center font-sans text-base text-[var(--v4-subtle)] sm:text-lg">
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
              <Divider label="Trending writers" />
              <TrendingWriters />
            </>
          )}
          {chunk.feature === "loved" && chunk.items.length > 0 && (
            <>
              <Divider label="Readers are loving" />
              <ReadersLovingGrid />
            </>
          )}
          {chunk.feature === "quote" && chunk.items.length > 0 && (
            <>
              <Divider label="Worth remembering" />
              <QuoteCallout />
            </>
          )}
        </div>
      ))}
    </>
  )
}
