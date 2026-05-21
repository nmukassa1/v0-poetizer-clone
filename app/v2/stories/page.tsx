import FeedLayout from "@/components/v2/feed-layout"
import { MagazineFeed } from "@/components/v2/magazine-feed"
import { sampleContent } from "@/lib/sample-data"

export default function V2StoriesPage() {
  const stories = sampleContent.filter((item) => item.type === "story")

  return (
    <FeedLayout>
      <MagazineFeed items={stories} sectionTitle="More stories" />
    </FeedLayout>
  )
}
