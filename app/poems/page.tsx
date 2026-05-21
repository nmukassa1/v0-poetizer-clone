import FeedLayout from "@/components/feed-layout"
import { ContentCard } from "@/components/content-card"
import { sampleContent } from "@/lib/sample-data"

export default function PoemsPage() {
  const poems = sampleContent.filter((item) => item.type === "poem")

  return (
    <FeedLayout>
      <div className="pb-24">
        {poems.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </FeedLayout>
  )
}
