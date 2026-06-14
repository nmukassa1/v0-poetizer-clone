import type { PiecePost } from "@/lib/feed"
import { Divider } from "@/components/inkwell/primitives"
import { RecentFeed } from "@/components/inkwell/feed/recent-feed"

export function FeedRecentSection({ items }: { items: PiecePost[] }) {
  return (
    <section>
      <Divider label="Recent" />
      <RecentFeed items={items} />
    </section>
  )
}
