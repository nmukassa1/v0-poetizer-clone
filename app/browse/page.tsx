import { BrowsePage } from "@/components/inkwell/browse/browse-page"
import { featured as mockFeatured } from "@/lib/feed"
import {
  getFeaturedPiece,
  listPublishedPieces,
} from "@/lib/piece/queries"
import { pieceToFeatured, pieceToFeedPost } from "@/lib/piece/map"
import { getCurrentUser } from "@/lib/auth/server"
import { attachLikedToFeedPosts } from "@/lib/social"

export const metadata = {
  title: "Browse pieces | inkwell",
  description:
    "Explore poems, short stories, and essays from writers on inkwell.",
}

export default async function BrowseRoutePage() {
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

  return (
    <BrowsePage
      pieces={browsePieces}
      featured={featured}
      featuredReadHref={featuredRow ? `/read/${featuredRow.id}` : undefined}
    />
  )
}
