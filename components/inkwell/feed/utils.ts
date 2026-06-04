import type { PiecePost } from "@/lib/feed/types"
import type { FeedFilter } from "./types"

export function filterFeedPieces(
  items: PiecePost[],
  filter: FeedFilter,
): PiecePost[] {
  if (filter === "all") return items
  if (filter === "poems") return items.filter((item) => item.type === "poem")
  if (filter === "stories") return items.filter((item) => item.type === "story")
  if (filter === "essays") return items.filter((item) => item.type === "essay")
  return items
}
