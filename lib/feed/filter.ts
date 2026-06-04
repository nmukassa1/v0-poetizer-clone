import type { FeedFilter, FeedItem } from "./types"

export function filterFeed(items: FeedItem[], filter: FeedFilter): FeedItem[] {
  if (filter === "all") return items
  if (filter === "pieces") return items.filter((item) => item.kind === "piece")
  if (filter === "posts") return items.filter((item) => item.kind === "social")
  if (filter === "poems")
    return items.filter((item) => item.kind === "piece" && item.type === "poem")
  if (filter === "stories")
    return items.filter((item) => item.kind === "piece" && item.type === "story")
  return items
}
