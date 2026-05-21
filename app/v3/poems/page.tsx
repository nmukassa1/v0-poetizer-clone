import FeedLayout from "@/components/v3/feed-layout"
import { EditorialFeed } from "@/components/v3/editorial-feed"
import { sampleContent } from "@/lib/sample-data"

export default function V3PoemsPage() {
  const poems = sampleContent.filter((item) => item.type === "poem")

  return (
    <FeedLayout>
      <EditorialFeed items={poems} />
    </FeedLayout>
  )
}
