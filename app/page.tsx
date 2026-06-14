import { InkwellFeed } from "@/components/inkwell/feed/inkwell-feed"
import { featured as mockFeatured } from "@/lib/feed"
import { listQuotesForFeed } from "@/lib/quotes/queries"
import { loadLivePromptForFeed } from "@/lib/prompts/load-prompt-page-data"
import {
  getFeaturedPiece,
  listPublishedPieces,
} from "@/lib/piece/queries"
import { pieceToFeatured, pieceToFeedPost } from "@/lib/piece/map"
import { getCurrentUser } from "@/lib/auth/server"
import { attachLikedToFeedPosts } from "@/lib/social"

export default async function HomePage() {
  const user = await getCurrentUser()

  const [featuredRow, pieces, livePrompt, quotes] = await Promise.all([
    getFeaturedPiece(),
    listPublishedPieces({ limit: 20 }),
    loadLivePromptForFeed(),
    listQuotesForFeed(),
  ])

  const featured = featuredRow
    ? pieceToFeatured(featuredRow)
    : mockFeatured

  const feedPieces = await attachLikedToFeedPosts(
    pieces.map(pieceToFeedPost),
    user?.id,
  )

  return (
    <InkwellFeed
      pieces={feedPieces}
      featured={featured}
      featuredReadHref={featuredRow ? `/read/${featuredRow.id}` : undefined}
      livePrompt={livePrompt}
      quotes={quotes}
    />
  )
}
