import FeedLayout from "@/components/v1/feed-layout"
import { ContentFeed } from "@/components/v1/content-feed"
import { sampleContent } from "@/lib/sample-data"

export default function StoriesPage() {
  const stories = sampleContent.filter((item) => item.type === "story")

  return (
    <FeedLayout>
      <ContentFeed items={stories} />
    </FeedLayout>
  )
}
