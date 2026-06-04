import type { ContentTag, Featured, PiecePost } from "@/lib/feed/types"
import type { BrowseFilter } from "./types"

export function filterBrowsePieces(
  items: PiecePost[],
  filter: BrowseFilter,
): PiecePost[] {
  if (filter === "all") return items
  if (filter === "poems") return items.filter((item) => item.type === "poem")
  if (filter === "stories") return items.filter((item) => item.type === "story")
  if (filter === "essays") return items.filter((item) => item.type === "essay")
  return items
}

export function shouldShowFeatured(
  filter: BrowseFilter,
  featuredType: ContentTag,
): boolean {
  if (filter === "all") return true
  if (filter === "poems") return featuredType === "poem"
  if (filter === "stories") return featuredType === "story"
  return featuredType === "essay"
}

export function browseGridPieces(
  pieces: PiecePost[],
  filter: BrowseFilter,
  featured: Featured,
): PiecePost[] {
  const filtered = filterBrowsePieces(pieces, filter)
  const featuredId = featured.id
  return filtered.filter(
    (piece) => piece.id !== featuredId && piece.title !== featured.title,
  )
}

export function contentTypeLabel(type: ContentTag): string {
  if (type === "story") return "Short story"
  return type.charAt(0).toUpperCase() + type.slice(1)
}
