import FeedLayout from "@/components/v3/feed-layout"
import { EditorialFeed } from "@/components/v3/editorial-feed"
import { sampleContent } from "@/lib/sample-data"

export default function V3StoriesPage() {
  const stories = sampleContent.filter((item) => item.type === "story")

  return (
    <FeedLayout>
      <EditorialFeed items={stories} />
    </FeedLayout>
  )
}
