import FeedLayout from "@/components/v1/feed-layout"
import { ContentFeed } from "@/components/v1/content-feed"
import { sampleContent } from "@/lib/sample-data"

export default function HomePage() {
  return (
    <FeedLayout>
      <ContentFeed items={sampleContent} />
    </FeedLayout>
  )
}
