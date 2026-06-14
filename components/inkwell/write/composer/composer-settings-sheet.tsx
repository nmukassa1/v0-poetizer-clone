"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComposerPieceSettings } from "./composer-piece-settings"
import type { ContentTag } from "@/lib/feed"
import type { Visibility } from "./types"

const ANIMATION_MS = 300

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
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(frame)
    }

    setVisible(false)
  }, [open])

  useEffect(() => {
    if (!visible && mounted) {
      const timer = window.setTimeout(() => setMounted(false), ANIMATION_MS)
      return () => window.clearTimeout(timer)
    }
  }, [visible, mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close settings"
        className={cn(
          "absolute inset-0 bg-black/30 transition-opacity duration-300 ease-out",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out",
          visible ? "translate-y-0" : "translate-y-full",
        )}
      >
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
