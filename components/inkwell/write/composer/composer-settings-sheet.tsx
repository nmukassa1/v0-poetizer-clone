import { X } from "lucide-react"
import { ComposerPieceSettings } from "./composer-piece-settings"
import type { ContentTag } from "@/lib/feed-data"
import type { Visibility } from "./types"

export function ComposerSettingsSheet({
  open,
  onClose,
  type,
  onTypeChange,
  excerpt,
  onExcerptChange,
  excerptOverridden,
  onResetExcerpt,
  tags,
  tagDraft,
  onTagDraftChange,
  onCommitTag,
  onRemoveTag,
  visibility,
  onVisibilityChange,
}: {
  open: boolean
  onClose: () => void
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
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--ink-border)] bg-[var(--ink-bg)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-[var(--ink-fg)]">
            Piece settings
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[var(--ink-muted)]"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <ComposerPieceSettings
          type={type}
          onTypeChange={onTypeChange}
          excerpt={excerpt}
          onExcerptChange={onExcerptChange}
          excerptOverridden={excerptOverridden}
          onResetExcerpt={onResetExcerpt}
          tags={tags}
          tagDraft={tagDraft}
          onTagDraftChange={onTagDraftChange}
          onCommitTag={onCommitTag}
          onRemoveTag={onRemoveTag}
          visibility={visibility}
          onVisibilityChange={onVisibilityChange}
          visibilityRadioName="visibility-mobile"
        />
      </div>
    </div>
  )
}
