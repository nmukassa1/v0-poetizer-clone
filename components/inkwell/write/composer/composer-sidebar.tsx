import { ComposerPieceSettings } from "./composer-piece-settings"
import type { ContentTag } from "@/lib/feed-data"
import type { Visibility } from "./types"

export function ComposerSidebar(props: {
  type: ContentTag
  onTypeChange: (type: ContentTag) => void
  excerpt: string
  onExcerptChange: (value: string, overridden: boolean) => void
  excerptOverridden: boolean
  onResetExcerpt: () => void
  tags: string[]
  tagDraft: string
  onTagDraftChange: (value: string) => void
  onCommitTag: () => void
  onRemoveTag: (tag: string) => void
  visibility: Visibility
  onVisibilityChange: (visibility: Visibility) => void
  savedAgoText: string
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[68px] space-y-7 pt-16 pr-8">
        <ComposerPieceSettings {...props} savedAgoText={props.savedAgoText} />
      </div>
    </aside>
  )
}
