"use client"

import { useState, useTransition, type ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeletePieceDialog({
  pieceId,
  title,
  trigger,
  onDeleted,
}: {
  pieceId: string
  title: string
  trigger: ReactNode
  onDeleted?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, startDeleteTransition] = useTransition()

  function handleDelete() {
    setError(null)
    startDeleteTransition(async () => {
      try {
        const response = await fetch(`/api/pieces/${pieceId}`, {
          method: "DELETE",
        })
        const result = (await response.json()) as {
          success: boolean
          error?: string
        }

        if (!response.ok || !result.success) {
          setError(result.error ?? "Could not delete this piece.")
          return
        }

        setOpen(false)
        onDeleted?.()
      } catch {
        setError("Could not reach the server. Check your connection.")
      }
    })
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setError(null)
      }}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif">
            Delete this piece?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-serif">
            &ldquo;{title || "Untitled"}&rdquo; will be removed permanently.
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <p className="font-sans text-[12px] text-[#a33f3f]" role="alert">
            {error}
          </p>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="rounded-full border-neutral-200 font-sans text-[11px] font-semibold tracking-wide text-neutral-950"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault()
              handleDelete()
            }}
            className="rounded-full bg-[#a33f3f] font-sans text-[11px] font-semibold tracking-wide text-white hover:bg-[#8f3535]"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
