"use client"

import { ContentCard } from "@/components/v3/content-card"
import type { ContentItem } from "@/lib/content"
import { useLayout } from "@/lib/layout-context"

interface ContentFeedProps {
  items: ContentItem[]
}

export function ContentFeed({ items }: ContentFeedProps) {
  const { view } = useLayout()

  if (items.length === 0) return null

  if (view === "grid") {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ContentCard key={item.id} {...item} variant="grid" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      {items.map((item) => (
        <ContentCard key={item.id} {...item} variant="single" />
      ))}
    </div>
  )
}
