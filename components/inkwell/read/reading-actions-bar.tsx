"use client"

import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react"
import { usePieceLike } from "@/components/inkwell/social/piece-like-button"

export function ReadingActionsBar({
  pieceId,
  likes,
  comments,
  initialLiked = false,
  isLoggedIn,
  saved,
  highlightCount,
  onSaveToggle,
  onCommentClick,
}: {
  pieceId: string
  likes: number
  comments: number
  initialLiked?: boolean
  isLoggedIn: boolean
  saved: boolean
  highlightCount: number
  onSaveToggle: () => void
  onCommentClick?: () => void
}) {
  const { liked, count, pending, toggle } = usePieceLike({
    pieceId,
    initialCount: likes,
    initialLiked,
    isLoggedIn,
  })

  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-30 flex justify-center px-4 min-[480px]:bottom-6">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => void toggle()}
          disabled={pending}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium tabular-nums transition-colors disabled:cursor-wait ${
            liked
              ? "bg-[var(--ink-accent-soft)] text-[var(--ink-accent)]"
              : "text-[var(--ink-fg)] hover:bg-[var(--ink-accent-soft)]"
          }`}
          aria-label={liked ? "Unlike" : "Like"}
          aria-pressed={liked}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
          {count}
        </button>

        <button
          type="button"
          onClick={onCommentClick}
          className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium tabular-nums text-[var(--ink-muted)] transition-colors hover:bg-[var(--ink-accent-soft)] hover:text-[var(--ink-fg)]"
          aria-label="View comments"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          {comments}
        </button>

        <span className="mx-1 h-5 w-px bg-[var(--ink-border)]" aria-hidden />

        <button
          type="button"
          onClick={onSaveToggle}
          className={`flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors ${
            saved
              ? "text-[var(--ink-accent)]"
              : "text-[var(--ink-muted)] hover:text-[var(--ink-fg)]"
          }`}
          aria-label={saved ? "Unsave" : "Save"}
          aria-pressed={saved}
        >
          <Bookmark
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-full p-2 text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {highlightCount > 0 && (
          <>
            <span
              className="mx-1 h-5 w-px bg-[var(--ink-border)]"
              aria-hidden
            />
            <span className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-accent)]">
              {highlightCount} highlight
              {highlightCount === 1 ? "" : "s"}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
