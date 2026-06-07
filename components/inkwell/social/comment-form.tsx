"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { PieceCommentView } from "@/lib/social/types"
import { usePieceComment } from "@/components/inkwell/social/use-piece-comment"

type CommentFormProps = {
  pieceId: string
  isLoggedIn: boolean
  placeholder?: string
  submitLabel?: string
  onPosted?: (commentCount: number) => void
  onCommentAdded?: (result: {
    comment: PieceCommentView
    commentCount: number
  }) => void
  className?: string
  surface?: "page" | "modal"
}

export function CommentForm({
  pieceId,
  isLoggedIn,
  placeholder = "Share your thoughts…",
  submitLabel = "Post comment",
  onPosted,
  onCommentAdded,
  className = "",
  surface = "page",
}: CommentFormProps) {
  const [body, setBody] = useState("")
  const { submit, pending, error, setError } = usePieceComment({
    pieceId,
    isLoggedIn,
    onSuccess: (result) => {
      setBody("")
      onPosted?.(result.commentCount)
      onCommentAdded?.(result)
    },
  })

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const posted = await submit(body)
    if (posted) setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder={placeholder}
        rows={3}
        maxLength={2000}
        disabled={pending}
        className={
          surface === "modal"
            ? "min-h-24 resize-y border-neutral-200 bg-white font-serif text-sm leading-relaxed text-neutral-950 placeholder:text-neutral-400 focus-visible:border-neutral-950 focus-visible:ring-neutral-950/10"
            : "min-h-24 resize-y border-[var(--ink-border)] bg-[var(--ink-bg)] font-serif text-sm leading-relaxed text-[var(--ink-fg)] placeholder:text-[var(--ink-subtle)] focus-visible:border-[#534AB7] focus-visible:ring-[#534AB7]/20"
        }
      />
      {error ? (
        <p className="mt-2 font-sans text-[12px] text-[#a33f3f]" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-3 flex justify-end">
        <Button
          type="submit"
          disabled={pending || body.trim().length === 0}
          className={
            surface === "modal"
              ? "rounded-full bg-neutral-950 px-5 font-sans text-[11px] font-semibold tracking-wide text-white hover:bg-neutral-800"
              : "rounded-full bg-[#534AB7] px-5 font-sans text-[11px] font-semibold tracking-wide text-white hover:bg-[#453da0]"
          }
        >
          {pending ? "Posting…" : submitLabel}
        </Button>
      </div>
    </form>
  )
}
