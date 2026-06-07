"use client"

import Link from "next/link"
import { Trash2 } from "lucide-react"
import type { PieceCommentView } from "@/lib/social/types"
import { Avatar } from "@/components/inkwell/primitives"
import { CommentForm } from "@/components/inkwell/social/comment-form"
import { useDeleteComment } from "@/components/inkwell/social/use-piece-comment"
import { getProfileHrefByHandle } from "@/lib/profile"
import { useState } from "react"

function CommentItem({
  comment,
  pieceId,
  onDeleted,
}: {
  comment: PieceCommentView
  pieceId: string
  onDeleted: (commentId: string, commentCount: number) => void
}) {
  const { remove, pendingId } = useDeleteComment(pieceId)
  const authorHref = getProfileHrefByHandle(comment.author.handle)

  async function handleDelete() {
    const nextCount = await remove(comment.id)
    if (nextCount !== null) {
      onDeleted(comment.id, nextCount)
    }
  }

  return (
    <article className="flex gap-3 border-b border-[var(--ink-border-soft)] py-5 last:border-b-0">
      <Avatar seed={comment.author.name} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <Link
              href={authorHref}
              className="font-sans text-sm font-medium text-[var(--ink-fg)] underline-offset-2 hover:underline"
            >
              {comment.author.name}
            </Link>
            <span className="font-sans text-[11px] text-[var(--ink-subtle)]">
              {comment.createdAt}
            </span>
          </div>
          {comment.isMine ? (
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={pendingId === comment.id}
              className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-subtle)] transition-colors hover:text-[#a33f3f] disabled:cursor-wait"
              aria-label="Delete comment"
            >
              <Trash2 className="h-3 w-3" strokeWidth={1.5} />
              {pendingId === comment.id ? "Removing…" : "Remove"}
            </button>
          ) : null}
        </div>
        <p className="mt-2 whitespace-pre-wrap font-serif text-sm leading-relaxed text-[var(--ink-fg)]/90">
          {comment.body}
        </p>
      </div>
    </article>
  )
}

type PieceCommentsSectionProps = {
  pieceId: string
  pieceTitle: string
  initialComments: PieceCommentView[]
  initialCount: number
  isLoggedIn: boolean
  onCountChange?: (count: number) => void
}

export function PieceCommentsSection({
  pieceId,
  pieceTitle,
  initialComments,
  initialCount,
  isLoggedIn,
  onCountChange,
}: PieceCommentsSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [count, setCount] = useState(initialCount)

  function updateCount(nextCount: number) {
    setCount(nextCount)
    onCountChange?.(nextCount)
  }

  return (
    <section
      id="piece-comments"
      className="mx-auto max-w-2xl scroll-mt-24 px-6 py-12 min-[480px]:px-8 lg:max-w-3xl lg:px-10 lg:py-16"
      aria-labelledby="piece-comments-heading"
    >
      <header className="mb-8 border-b border-[var(--ink-border)] pb-6">
        <h2
          id="piece-comments-heading"
          className="font-serif text-2xl font-medium tracking-tight text-[var(--ink-fg)] min-[480px]:text-3xl"
        >
          Comments
          <span className="ml-2 font-sans text-base font-normal tabular-nums text-[var(--ink-subtle)]">
            ({count})
          </span>
        </h2>
        <p className="mt-2 font-serif text-sm text-[var(--ink-muted)]">
          Responses to &ldquo;{pieceTitle}&rdquo;
        </p>
      </header>

      {comments.length > 0 ? (
        <div className="mb-10">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              pieceId={pieceId}
              onDeleted={(commentId, commentCount) => {
                setComments((current) =>
                  current.filter((item) => item.id !== commentId),
                )
                updateCount(commentCount)
              }}
            />
          ))}
        </div>
      ) : (
        <p className="mb-10 font-serif text-sm italic text-[var(--ink-muted)]">
          No comments yet. Be the first to respond.
        </p>
      )}

      <div className="rounded-xl border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_96%,var(--ink-fg))] p-4 min-[480px]:p-5">
        <h3 className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-subtle)]">
          Add a comment
        </h3>
        <CommentForm
          pieceId={pieceId}
          isLoggedIn={isLoggedIn}
          onCommentAdded={({ comment, commentCount }) => {
            setComments((current) => [...current, comment])
            updateCount(commentCount)
          }}
        />
      </div>
    </section>
  )
}
