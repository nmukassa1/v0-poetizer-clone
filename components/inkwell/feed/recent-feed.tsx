"use client"

import type { PiecePost } from "@/lib/feed"
import { QuoteCallout, ReadersLovingGrid } from "@/components/inkwell/features"
import { PieceCard } from "@/components/inkwell/piece-card"
import { Divider } from "@/components/inkwell/primitives"
import { WriterSpotlight } from "@/components/inkwell/feed/writer-spotlight"
import { getProfileHrefByHandle } from "@/lib/profile"

export function RecentFeed({
  items,
  showFeatures,
}: {
  items: PiecePost[]
  showFeatures: boolean
}) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center font-sans text-[13px] text-[var(--ink-subtle)]">
        Nothing here yet.
      </p>
    )
  }

  if (!showFeatures) {
    return (
      <>
        {items.map((item) => (
          <PieceCard
            key={item.id}
            post={item}
            readHref={`/read/${item.id}`}
            authorHref={getProfileHrefByHandle(item.authorHandle)}
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
          {chunk.items.map((item) => (
            <PieceCard
              key={item.id}
              post={item}
              readHref={`/read/${item.id}`}
              authorHref={getProfileHrefByHandle(item.authorHandle)}
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
