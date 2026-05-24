import type { ContentTag } from "@/lib/v4-feed-data"

export function Avatar({ seed, size = 32 }: { seed: string; size?: number }) {
  return (
    <img
      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`}
      alt={seed}
      width={size}
      height={size}
      className="shrink-0 rounded-full border-[1.5px] border-[#e8e4d9] bg-[#f1efe8] object-cover"
    />
  )
}

export function HeartIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export function CommentIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function RetweetIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

export function Divider({
  label,
  accent = false,
}: {
  label: string
  accent?: boolean
}) {
  return (
    <div className="my-8 flex items-center gap-3 sm:my-10 lg:my-12">
      <div className="h-px flex-1 bg-[var(--v4-border)]" />
      <span
        className={`font-serif text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs ${
          accent ? "text-[var(--v4-prompt-meta)]" : "text-[var(--v4-subtle)]"
        }`}
      >
        {label}
      </span>
      <div className="h-px flex-1 bg-[var(--v4-border)]" />
    </div>
  )
}

const tagStyles: Record<ContentTag, { bg: string; text: string }> = {
  poem: { bg: "#EEEDFE", text: "#534AB7" },
  story: { bg: "#FAEEDA", text: "#854F0B" },
  essay: { bg: "#E1F5EE", text: "#0F6E56" },
}

export function Tag({ label }: { label: ContentTag | string }) {
  const c = tagStyles[label as ContentTag] ?? { bg: "#f1efe8", text: "#5f5e5a" }
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] sm:text-xs"
      style={{ background: c.bg, color: c.text }}
    >
      {label}
    </span>
  )
}

export function Actions({
  likes,
  comments,
  shares,
  small = false,
}: {
  likes: number
  comments: number
  shares: number
  small?: boolean
}) {
  const textSize = small ? "text-sm" : "text-base"
  return (
    <div className={`flex flex-wrap gap-4 text-[var(--v4-subtle)] sm:gap-5 ${textSize}`}>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-inherit"
      >
        <HeartIcon /> {likes}
      </button>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-inherit"
      >
        <CommentIcon /> {comments}
      </button>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-inherit"
      >
        <RetweetIcon /> {shares}
      </button>
    </div>
  )
}
