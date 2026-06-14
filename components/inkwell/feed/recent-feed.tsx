"use client"

import type { RecentFeedEntry } from "@/lib/feed/intersperse-quotes"
import { PieceCard } from "@/components/inkwell/piece-card"
import { QuoteCalloutCard } from "@/components/inkwell/feed/quote-callout-card"
import { Divider } from "@/components/inkwell/primitives"
import { getProfileHrefByHandle } from "@/lib/profile"

export function RecentFeed({ items }: { items: RecentFeedEntry[] }) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center font-sans text-[13px] text-[var(--ink-subtle)]">
        Nothing here yet.
      </p>
    )
  }

  return (
    <>
      {items.map((item, index) => {
        if (item.kind === "quote") {
          return (
            <div key={`quote-${item.id}-${index}`}>
              <Divider label="Worth remembering" />
              <QuoteCalloutCard text={item.text} author={item.author} />
            </div>
          )
        }

        return (
          <PieceCard
            key={item.id}
            post={item}
            readHref={`/read/${item.id}`}
            authorHref={getProfileHrefByHandle(item.authorHandle)}
          />
        )
      })}
    </>
  )
}
