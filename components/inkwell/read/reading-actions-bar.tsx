import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react"

export function ReadingActionsBar({
  likes,
  comments,
  liked,
  saved,
  highlightCount,
  onLikeToggle,
  onSaveToggle,
}: {
  likes: number
  comments: number
  liked: boolean
  saved: boolean
  highlightCount: number
  onLikeToggle: () => void
  onSaveToggle: () => void
}) {
  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-30 flex justify-center px-4 min-[480px]:bottom-6">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <button
          type="button"
          onClick={onLikeToggle}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium tabular-nums transition-colors ${
            liked
              ? "bg-[var(--ink-accent-soft)] text-[var(--ink-accent)]"
              : "text-[var(--ink-fg)] hover:bg-[var(--ink-accent-soft)]"
          }`}
          aria-label="Like"
          aria-pressed={liked}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
          {likes + (liked ? 1 : 0)}
        </button>

        <span className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium tabular-nums text-[var(--ink-muted)]">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          {comments}
        </span>

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
