import type { PiecePost } from "@/lib/feed/types"
import { Divider } from "@/components/inkwell/primitives"
import { RecentFeed } from "@/components/inkwell/feed/recent-feed"

export function FeedRecentSection({
  items,
  showFeatures,
}: {
  items: PiecePost[]
  showFeatures: boolean
}) {
  return (
    <section>
      <Divider label="Recent" />
      <RecentFeed items={items} showFeatures={showFeatures} />
    </section>
  )
}
