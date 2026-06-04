import { InkwellFeed } from "@/components/inkwell/feed/inkwell-feed"
import { featured as mockFeatured } from "@/lib/feed"
import {
  getFeaturedPiece,
  listPublishedPieces,
} from "@/lib/piece/queries"
import { pieceToFeatured, pieceToFeedPost } from "@/lib/piece/map"

export default async function HomePage() {
  const [featuredRow, pieces] = await Promise.all([
    getFeaturedPiece(),
    listPublishedPieces({ limit: 20 }),
  ])

  const featured = featuredRow
    ? pieceToFeatured(featuredRow)
    : mockFeatured

  const feedPieces = pieces.map(pieceToFeedPost)

  return (
    <InkwellFeed
      pieces={feedPieces}
      featured={featured}
      featuredReadHref={featuredRow ? `/read/${featuredRow.id}` : undefined}
    />
  )
}
