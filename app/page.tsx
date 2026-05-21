import FeedLayout from "@/components/feed-layout"
import { ContentFeed } from "@/components/content-feed"
import { sampleContent } from "@/lib/sample-data"

export default function HomePage() {
  return (
    <FeedLayout>
      <ContentFeed items={sampleContent} />
    </FeedLayout>
  )
}
