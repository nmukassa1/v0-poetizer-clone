import type { PiecePost, WriterSpotlightData } from "@/lib/feed"
import { Divider } from "@/components/inkwell/primitives"
import { RecentFeed } from "@/components/inkwell/feed/recent-feed"

export function FeedRecentSection({
  items,
  showFeatures,
  spotlight,
}: {
  items: PiecePost[]
  showFeatures: boolean
  spotlight?: WriterSpotlightData | null
}) {
  return (
    <section>
      <Divider label="Recent" />
      <RecentFeed items={items} showFeatures={showFeatures} spotlight={spotlight} />
    </section>
  )
}
