"use client"

import { useAuth } from "@/components/inkwell/auth-provider"
import { PieceLikeButton } from "@/components/inkwell/social/piece-like-button"

export function FeedLikeButton({
  pieceId,
  initialCount,
  initialLiked = false,
  size = "md",
}: {
  pieceId: string
  initialCount: number
  initialLiked?: boolean
  size?: "sm" | "md"
}) {
  const { isLoggedIn } = useAuth()

  return (
    <PieceLikeButton
      pieceId={pieceId}
      initialCount={initialCount}
      initialLiked={initialLiked}
      isLoggedIn={isLoggedIn}
      size={size}
    />
  )
}
