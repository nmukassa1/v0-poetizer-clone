"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Heart } from "lucide-react"

type UsePieceLikeOptions = {
  pieceId: string
  initialCount: number
  initialLiked?: boolean
  isLoggedIn: boolean
}

export function usePieceLike({
  pieceId,
  initialCount,
  initialLiked = false,
  isLoggedIn,
}: UsePieceLikeOptions) {
  const router = useRouter()
  const pathname = usePathname()
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [pending, setPending] = useState(false)

  const toggle = useCallback(async () => {
    if (pending) return

    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname || "/")
      router.push(`/sign-in?callbackUrl=${callbackUrl}`)
      return
    }

    const nextLiked = !liked
    setPending(true)
    setLiked(nextLiked)
    setCount((value) => value + (nextLiked ? 1 : -1))

    try {
      const response = await fetch(`/api/pieces/${pieceId}/like`, {
        method: nextLiked ? "POST" : "DELETE",
      })
      const result = (await response.json()) as {
        success: boolean
        likeCount?: number
        likedByMe?: boolean
        error?: string
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Request failed")
      }

      setLiked(result.likedByMe ?? nextLiked)
      setCount(result.likeCount ?? count)
    } catch {
      setLiked(!nextLiked)
      setCount((value) => value + (nextLiked ? -1 : 1))
    } finally {
      setPending(false)
    }
  }, [count, isLoggedIn, liked, pathname, pending, pieceId, router])

  return { liked, count, pending, toggle }
}

type PieceLikeButtonProps = {
  pieceId: string
  initialCount: number
  initialLiked?: boolean
  isLoggedIn: boolean
  size?: "sm" | "md"
  showCount?: boolean
  className?: string
}

export function PieceLikeButton({
  pieceId,
  initialCount,
  initialLiked = false,
  isLoggedIn,
  size = "md",
  showCount = true,
  className = "",
}: PieceLikeButtonProps) {
  const { liked, count, pending, toggle } = usePieceLike({
    pieceId,
    initialCount,
    initialLiked,
    isLoggedIn,
  })

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4 min-[480px]:h-[18px] min-[480px]:w-[18px]"
  const textSize = size === "sm" ? "text-[11px]" : "text-xs"

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void toggle()
      }}
      disabled={pending}
      className={`group flex cursor-pointer items-center gap-1.5 tabular-nums transition-colors disabled:cursor-wait ${
        liked
          ? "text-[var(--ink-accent)]"
          : "text-[var(--ink-subtle)] hover:text-[#534AB7]"
      } ${className}`}
      aria-label={liked ? "Unlike" : "Like"}
      aria-pressed={liked}
    >
      <Heart
        className={`${iconSize} ${liked ? "" : "group-hover:fill-[#534AB7]/15"}`}
        strokeWidth={1.25}
        fill={liked ? "currentColor" : "none"}
      />
      {showCount ? <span className={textSize}>{count}</span> : null}
    </button>
  )
}
