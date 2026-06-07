"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CommentForm } from "@/components/inkwell/social/comment-form"
import { useAuth } from "@/components/inkwell/auth-provider"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

type PieceCommentDialogProps = {
  pieceId: string
  pieceTitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onCommentPosted?: (commentCount: number) => void
}

export function PieceCommentDialog({
  pieceId,
  pieceTitle,
  open,
  onOpenChange,
  onCommentPosted,
}: PieceCommentDialogProps) {
  const { isLoggedIn } = useAuth()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Add a comment</DialogTitle>
          <DialogDescription className="font-serif">
            On &ldquo;{pieceTitle}&rdquo;
          </DialogDescription>
        </DialogHeader>
        <CommentForm
          pieceId={pieceId}
          isLoggedIn={isLoggedIn}
          surface="modal"
          onPosted={(commentCount) => {
            onCommentPosted?.(commentCount)
            onOpenChange(false)
          }}
        />
        <p className="font-sans text-[11px] text-neutral-500">
          <Link
            href={`/read/${pieceId}`}
            className="font-medium text-neutral-950 underline-offset-2 hover:underline"
          >
            Read the full piece
          </Link>{" "}
          to see all comments.
        </p>
      </DialogContent>
    </Dialog>
  )
}

type FeedCommentButtonProps = {
  pieceId: string
  pieceTitle: string
  initialCount: number
  size?: "sm" | "md"
  className?: string
}

export function FeedCommentButton({
  pieceId,
  pieceTitle,
  initialCount,
  size = "md",
  className = "",
}: FeedCommentButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn } = useAuth()
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(initialCount)

  const iconSize =
    size === "sm"
      ? "h-3.5 w-3.5"
      : "h-4 w-4 min-[480px]:h-[18px] min-[480px]:w-[18px]"
  const textSize = size === "sm" ? "text-[11px]" : "text-xs"

  function handleClick(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname || "/")
      router.push(`/sign-in?callbackUrl=${callbackUrl}`)
      return
    }

    setOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`group flex cursor-pointer items-center gap-1.5 tabular-nums text-[var(--ink-subtle)] transition-colors hover:text-[#534AB7] ${className}`}
        aria-label="Comment"
      >
        <MessageCircle
          className={`${iconSize} group-hover:fill-[#534AB7]/10`}
          strokeWidth={1.25}
        />
        <span className={textSize}>{count}</span>
      </button>

      <PieceCommentDialog
        pieceId={pieceId}
        pieceTitle={pieceTitle}
        open={open}
        onOpenChange={setOpen}
        onCommentPosted={setCount}
      />
    </>
  )
}
