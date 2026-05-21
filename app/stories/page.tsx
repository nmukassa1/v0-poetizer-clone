import FeedLayout from "@/components/feed-layout"
import { ContentFeed } from "@/components/content-feed"
import { sampleContent } from "@/lib/sample-data"

export default function StoriesPage() {
  const stories = sampleContent.filter((item) => item.type === "story")

  return (
    <FeedLayout>
      <ContentFeed items={stories} />
    </FeedLayout>
  )
}
