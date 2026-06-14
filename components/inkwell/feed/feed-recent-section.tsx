import type { RecentFeedEntry } from "@/lib/feed/intersperse-quotes"
import { Divider } from "@/components/inkwell/primitives"
import { RecentFeed } from "@/components/inkwell/feed/recent-feed"

export function FeedRecentSection({ items }: { items: RecentFeedEntry[] }) {
  return (
    <section>
      <Divider label="Recent" />
      <RecentFeed items={items} />
    </section>
  )
}
