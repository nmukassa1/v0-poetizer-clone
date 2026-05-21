import type { ContentItem } from "@/lib/content"
import { FeaturedCard, CompactCard } from "@/components/v2/content-card"

interface MagazineFeedProps {
  items: ContentItem[]
  sectionTitle?: string
}

export function MagazineFeed({
  items,
  sectionTitle = "More from the community",
}: MagazineFeedProps) {
  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        No work here yet. Be the first to share something.
      </p>
    )
  }

  const [featured, ...rest] = items

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <FeaturedCard item={featured} />

      {rest.length > 0 && (
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-v2-serif)] text-2xl font-bold text-foreground">
                {sectionTitle}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fresh voices and returning favorites
              </p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {rest.length} {rest.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <CompactCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
