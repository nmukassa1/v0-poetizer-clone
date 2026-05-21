import FeedLayout from "@/components/feed-layout"
import { ContentCard } from "@/components/content-card"
import { sampleContent } from "@/lib/sample-data"

export default function HomePage() {
  return (
    <FeedLayout>
      <div className="pb-24">
        {sampleContent.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </FeedLayout>
  )
}
