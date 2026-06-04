import type { Featured } from "@/lib/feed/types"
import { FeaturedCard } from "@/components/inkwell/cards"
import {
  getProfileHrefByHandle,
  getPublicProfileHref,
} from "@/lib/profile"
import { contentTypeLabel } from "./utils"

export function BrowseFeaturedSection({
  featured,
  readHref,
}: {
  featured: Featured
  readHref?: string
}) {
  return (
    <section className="py-8 min-[480px]:py-10 lg:py-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
            Featured
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-[var(--ink-fg)] min-[480px]:text-2xl">
            Editor&apos;s pick
          </h2>
        </div>
        <span className="font-sans text-[11px] text-[var(--ink-muted)]">
          {contentTypeLabel(featured.type)} · {featured.date}
        </span>
      </div>
      <FeaturedCard
        post={featured}
        authorHref={
          featured.authorHandle
            ? getProfileHrefByHandle(featured.authorHandle)
            : getPublicProfileHref(featured.author)
        }
        readHref={readHref}
      />
    </section>
  )
}
