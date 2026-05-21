import FeedLayout from "@/components/v1/feed-layout"
import { ContentFeed } from "@/components/v1/content-feed"
import { sampleContent } from "@/lib/sample-data"

export default function PoemsPage() {
  const poems = sampleContent.filter((item) => item.type === "poem")

  return (
    <FeedLayout>
      <ContentFeed items={poems} />
    </FeedLayout>
  )
}
