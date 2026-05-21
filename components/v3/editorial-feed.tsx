"use client"

import type { ContentItem } from "@/lib/content"
import { FeaturedPost } from "@/components/v3/featured-post"
import { ContentFeed } from "@/components/v3/content-feed"

interface EditorialFeedProps {
  items: ContentItem[]
}

export function EditorialFeed({ items }: EditorialFeedProps) {
  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        No work here yet.
      </p>
    )
  }

  const [featured, ...rest] = items

  return (
    <>
      <FeaturedPost item={featured} />

      {rest.length > 0 && (
        <section>
          <div className="mx-auto max-w-5xl px-6 pt-4 pb-2">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                More to read
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </div>
          <ContentFeed items={rest} />
        </section>
      )}
    </>
  )
}
