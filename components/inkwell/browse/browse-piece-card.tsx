import Link from "next/link"
import { Heart } from "lucide-react"
import type { PiecePost } from "@/lib/feed-data"
import { Avatar, Tag } from "@/components/inkwell/primitives"

export function BrowsePieceCard({
  post,
  readHref = "/read",
  authorHref,
}: {
  post: PiecePost
  readHref?: string
  authorHref?: string
}) {
  const excerpt = post.excerpt.replace(/\n/g, " ")

  return (
    <article className="flex h-full flex-col rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-4 transition-colors hover:border-[var(--ink-fg)]/25 min-[480px]:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Tag label={post.type} />
        <span className="font-sans text-[10px] tracking-wide text-[var(--ink-subtle)]">
          {post.date}
        </span>
      </div>

      <Link href={readHref} className="group flex flex-1 flex-col">
        <h2 className="font-serif text-lg font-semibold leading-snug text-[var(--ink-fg)] transition-colors group-hover:text-[#534AB7] min-[480px]:text-xl">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 font-serif text-[13px] leading-relaxed text-[var(--ink-muted)] min-[480px]:text-sm">
          {excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-[#534AB7]">
          Read piece
          <span aria-hidden>→</span>
        </span>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--ink-border-soft)] pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar seed={post.author} size={28} />
          {authorHref ? (
            <Link
              href={authorHref}
              className="truncate font-sans text-xs font-medium text-[var(--ink-fg)] underline-offset-2 hover:underline"
            >
              {post.author}
            </Link>
          ) : (
            <span className="truncate font-sans text-xs font-medium text-[var(--ink-fg)]">
              {post.author}
            </span>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-1 font-sans text-[11px] tabular-nums text-[var(--ink-subtle)]">
          <Heart className="h-3.5 w-3.5" strokeWidth={1.25} />
          {post.likes}
        </span>
      </div>
    </article>
  )
}
