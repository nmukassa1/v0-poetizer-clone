"use client"

import { ContentCardProps, ContentCard } from "@/components/v1/content-card"
import { useLayout } from "@/lib/layout-context"

interface ContentFeedProps {
  items: ContentCardProps[]
}

export function ContentFeed({ items }: ContentFeedProps) {
  const { view } = useLayout()

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
