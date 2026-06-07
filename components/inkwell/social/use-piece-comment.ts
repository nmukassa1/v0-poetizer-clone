"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { PieceCommentView } from "@/lib/social/types"

type UsePieceCommentOptions = {
  pieceId: string
  isLoggedIn: boolean
  onSuccess?: (result: {
    comment: PieceCommentView
    commentCount: number
  }) => void
}

export function usePieceComment({
  pieceId,
  isLoggedIn,
  onSuccess,
}: UsePieceCommentOptions) {
  const router = useRouter()
  const pathname = usePathname()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (body: string) => {
      if (pending) return false

      if (!isLoggedIn) {
        const callbackUrl = encodeURIComponent(pathname || "/")
        router.push(`/sign-in?callbackUrl=${callbackUrl}`)
        return false
      }

      setPending(true)
      setError(null)

      try {
        const response = await fetch(`/api/pieces/${pieceId}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body }),
        })
        const result = (await response.json()) as {
          success: boolean
          comment?: PieceCommentView
          commentCount?: number
          error?: string
        }

        if (!response.ok || !result.success || !result.comment) {
          throw new Error(result.error ?? "Could not post comment.")
        }

        onSuccess?.({
          comment: result.comment,
          commentCount: result.commentCount ?? 0,
        })
        return true
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Could not post comment.",
        )
        return false
      } finally {
        setPending(false)
      }
    },
    [isLoggedIn, onSuccess, pathname, pending, pieceId, router],
  )

  return { submit, pending, error, setError }
}

export function useDeleteComment(pieceId: string) {
  const [pendingId, setPendingId] = useState<string | null>(null)

  const remove = useCallback(
    async (commentId: string) => {
      if (pendingId) return null

      setPendingId(commentId)
      try {
        const response = await fetch(
          `/api/pieces/${pieceId}/comments/${commentId}`,
          { method: "DELETE" },
        )
        const result = (await response.json()) as {
          success: boolean
          commentCount?: number
          error?: string
        }

        if (!response.ok || !result.success) {
          throw new Error(result.error ?? "Could not delete comment.")
        }

        return result.commentCount ?? 0
      } catch {
        return null
      } finally {
        setPendingId(null)
      }
    },
    [pendingId, pieceId],
  )

  return { remove, pendingId }
}
