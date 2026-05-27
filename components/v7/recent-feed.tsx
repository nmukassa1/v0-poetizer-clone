"use client"

import type { V4PiecePost } from "@/lib/v4-feed-data"
import { QuoteCallout, ReadersLovingGrid } from "@/components/v5/features"
import { PieceCard } from "@/components/v5/piece-card"
import { Divider } from "@/components/v5/primitives"
import { WriterSpotlight } from "@/components/v7/writer-spotlight"
import { getPublicProfileHref } from "@/lib/profile-directory"

export function RecentFeed({
  items,
  showFeatures,
  basePath = "/v7",
}: {
  items: V4PiecePost[]
  showFeatures: boolean
  basePath?: string
}) {
  const readHref = `${basePath}/read`
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
          <PieceCard
            key={i}
            post={item}
            readHref={readHref}
            authorHref={getPublicProfileHref(basePath, item.author)}
          />
        ))}
      </>
    )
  }

  const chunks = [
    { items: items.slice(0, 2), feature: "spotlight" as const },
    { items: items.slice(2, 4), feature: "loved" as const },
    { items: items.slice(4, 5), feature: "quote" as const },
    { items: items.slice(5), feature: null },
  ]

  return (
    <>
      {chunks.map((chunk, ci) => (
        <div key={ci}>
          {chunk.items.map((item, i) => (
            <PieceCard
              key={i}
              post={item}
              readHref={readHref}
              authorHref={getPublicProfileHref(basePath, item.author)}
            />
          ))}
          {chunk.feature === "spotlight" && chunk.items.length > 0 && (
            <>
              <Divider label="Writer spotlight" className="lg:hidden" />
              <div className="lg:hidden">
                <WriterSpotlight />
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
