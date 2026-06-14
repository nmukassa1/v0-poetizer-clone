import { featured as mockFeatured } from "@/lib/feed"
import {
  getFeaturedPiece,
  listPublishedPieces,
} from "@/lib/piece/queries"
import { pieceToFeatured, pieceToFeedPost } from "@/lib/piece/map"
import { getCurrentUser } from "@/lib/auth/server"
import { attachLikedToFeedPosts } from "@/lib/social"

export async function loadBrowsePageData() {
  const user = await getCurrentUser()

  const [featuredRow, pieces] = await Promise.all([
    getFeaturedPiece(),
    listPublishedPieces({ limit: 48 }),
  ])

  const featured = featuredRow
    ? pieceToFeatured(featuredRow)
    : mockFeatured

  const browsePieces = await attachLikedToFeedPosts(
    pieces.map(pieceToFeedPost),
    user?.id,
  )

  return {
    pieces: browsePieces,
    featured,
    featuredReadHref: featuredRow ? `/read/${featuredRow.id}` : undefined,
  }
}
