"use client"

import Link from "next/link"
import { Trash2 } from "lucide-react"
import type { PiecePost } from "@/lib/feed"
import { Avatar, Tag } from "@/components/inkwell/primitives"
import { DeletePieceDialog } from "@/components/inkwell/delete-piece-dialog"
import { FeedLikeButton } from "@/components/inkwell/social/feed-like-button"
import { FeedCommentButton } from "@/components/inkwell/social/feed-comment-button"

export function PieceCard({
  post,
  readHref = "#",
  authorHref,
  ctaLabel = "Read",
  showDelete = false,
  onDeleted,
}: {
  post: PiecePost
  readHref?: string
  authorHref?: string
  ctaLabel?: string
  showDelete?: boolean
  onDeleted?: () => void
}) {
  const lines = post.excerpt.split("\n").filter(Boolean)

  return (
    <article className="border-b border-[var(--ink-border-soft)] py-10 first:pt-6 min-[480px]:py-12 lg:py-14 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2">
      <div className="transition-transform duration-200 ease-out hover:scale-[1.025]">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mb-6 flex items-center gap-3 min-[480px]:mb-8">
            <span className="h-px flex-1 bg-[var(--ink-border)]" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Tag label={post.type} />
              {post.prompt ? (
                <Link
                  href={`/prompt/${post.prompt.slug}`}
                  className="inline-flex items-center rounded-full border border-[var(--ink-prompt-border)] bg-[var(--ink-prompt-bg)] px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-prompt-meta)] transition-colors hover:border-[var(--ink-prompt-btn)] hover:text-[var(--ink-prompt-title)]"
                >
                  Prompt · {post.prompt.title}
                </Link>
              ) : null}
            </div>
            <span className="h-px flex-1 bg-[var(--ink-border)]" />
          </div>

          <Link href={readHref}>
            <h2 className="mb-6 font-serif text-2xl font-medium leading-tight tracking-tight text-[var(--ink-fg)] min-[480px]:mb-8 min-[480px]:text-3xl lg:text-4xl">
              {post.title}
            </h2>

            <div className="mb-6 space-y-2 font-serif text-base leading-relaxed text-[var(--ink-fg)]/90 min-[480px]:mb-8 min-[480px]:text-lg min-[480px]:leading-[1.75] lg:text-xl">
              {lines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="mb-8 min-[480px]:mb-10">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#534AB7] hover:underline underline-offset-4">
                {ctaLabel}
                <span aria-hidden>&#8594;</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ink-border)] pt-5 min-[480px]:pt-6">
        <div className="flex items-center gap-3 min-[480px]:gap-4">
          <Avatar seed={post.author} size={40} />
          <div>
            {authorHref ? (
              <Link
                href={authorHref}
                className="text-sm font-medium text-[var(--ink-fg)] underline-offset-4 hover:underline"
              >
                {post.author}
              </Link>
            ) : (
              <p className="text-sm font-medium text-[var(--ink-fg)]">
                {post.author}
              </p>
            )}
            <p className="text-[11px] tracking-wide text-[var(--ink-subtle)]">
              {post.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 min-[480px]:gap-5">
          {showDelete ? (
            <DeletePieceDialog
              pieceId={post.id}
              title={post.title}
              onDeleted={onDeleted}
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[var(--ink-subtle)] transition-colors hover:text-[#a33f3f]"
                  aria-label={`Delete ${post.title}`}
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.25} />
                  <span className="text-xs font-medium">Delete</span>
                </button>
              }
            />
          ) : null}
          <FeedLikeButton
            pieceId={post.id}
            initialCount={post.likes}
            initialLiked={post.likedByMe}
          />
          <FeedCommentButton
            pieceId={post.id}
            pieceTitle={post.title}
            initialCount={post.comments}
          />
        </div>
      </div>
    </article>
  )
}
