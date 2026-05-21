import FeedLayout from "@/components/v2/feed-layout"
import { MagazineFeed } from "@/components/v2/magazine-feed"
import { sampleContent } from "@/lib/sample-data"

export default function V2PoemsPage() {
  const poems = sampleContent.filter((item) => item.type === "poem")

  return (
    <FeedLayout>
      <MagazineFeed items={poems} sectionTitle="More poems" />
    </FeedLayout>
  )
}
