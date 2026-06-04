import type { Featured } from "@/lib/feed/types"
import { FeaturedCard } from "@/components/inkwell/cards"
import { Divider } from "@/components/inkwell/primitives"
import {
  getProfileHrefByHandle,
  getPublicProfileHref,
} from "@/lib/profile"

export function FeedFeaturedSection({
  featured,
  readHref,
}: {
  featured: Featured
  readHref?: string
}) {
  return (
    <section>
      <Divider label="Featured" />
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
