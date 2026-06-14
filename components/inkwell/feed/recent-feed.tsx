"use client"

import type { PiecePost } from "@/lib/feed"
import { PieceCard } from "@/components/inkwell/piece-card"
import { getProfileHrefByHandle } from "@/lib/profile"

export function RecentFeed({ items }: { items: PiecePost[] }) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center font-sans text-[13px] text-[var(--ink-subtle)]">
        Nothing here yet.
      </p>
    )
  }

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
