import FeedLayout from "@/components/feed-layout"
import { ContentCard } from "@/components/content-card"
import { sampleContent } from "@/lib/sample-data"

export default function StoriesPage() {
  const stories = sampleContent.filter((item) => item.type === "story")

  return (
    <FeedLayout>
      <div className="pb-24">
        {stories.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </FeedLayout>
  )
}
