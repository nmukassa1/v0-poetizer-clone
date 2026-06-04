import { weeklyPrompt } from "@/lib/feed"
import { PromptRail } from "@/components/inkwell/cards"
import { Divider } from "@/components/inkwell/primitives"
import { getPublicProfileHref } from "@/lib/profile"

export function FeedPromptSection() {
  return (
    <section>
      <Divider label="This week's prompt" accent />
      <PromptRail
        prompt={weeklyPrompt}
        authorHrefFor={(author) => getPublicProfileHref(author)}
      />
    </section>
  )
}
