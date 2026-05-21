import FeedLayout from "@/components/feed-layout"
import { ContentFeed } from "@/components/content-feed"
import { sampleContent } from "@/lib/sample-data"

export default function PoemsPage() {
  const poems = sampleContent.filter((item) => item.type === "poem")

  return (
    <FeedLayout>
      <ContentFeed items={poems} />
    </FeedLayout>
  )
}
