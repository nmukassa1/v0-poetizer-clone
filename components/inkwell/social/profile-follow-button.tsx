"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/inkwell/auth-provider"

type UseProfileFollowOptions = {
  handle: string
  initialFollowing?: boolean
  isLoggedIn: boolean
  onFollowerCountChange?: (count: number) => void
}

export function useProfileFollow({
  handle,
  initialFollowing = false,
  isLoggedIn,
  onFollowerCountChange,
}: UseProfileFollowOptions) {
  const router = useRouter()
  const pathname = usePathname()
  const [following, setFollowing] = useState(initialFollowing)
  const [pending, setPending] = useState(false)

  const toggle = useCallback(async () => {
    if (pending) return

    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname || "/")
      router.push(`/sign-in?callbackUrl=${callbackUrl}`)
      return
    }

    const nextFollowing = !following
    setPending(true)
    setFollowing(nextFollowing)

    try {
      const response = await fetch(`/api/profile/${handle}/follow`, {
        method: nextFollowing ? "POST" : "DELETE",
      })
      const result = (await response.json()) as {
        success: boolean
        following?: boolean
        followerCount?: number
        error?: string
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Request failed")
      }

      setFollowing(result.following ?? nextFollowing)
      if (typeof result.followerCount === "number") {
        onFollowerCountChange?.(result.followerCount)
      }
    } catch {
      setFollowing(!nextFollowing)
    } finally {
      setPending(false)
    }
  }, [
    following,
    handle,
    isLoggedIn,
    onFollowerCountChange,
    pathname,
    pending,
    router,
  ])

  return { following, pending, toggle }
}

type ProfileFollowButtonProps = {
  handle: string
  initialFollowing?: boolean
  variant?: "header" | "bio"
  className?: string
  onFollowerCountChange?: (count: number) => void
}

export function ProfileFollowButton({
  handle,
  initialFollowing = false,
  variant = "header",
  className = "",
  onFollowerCountChange,
}: ProfileFollowButtonProps) {
  const { isLoggedIn } = useAuth()
  const { following, pending, toggle } = useProfileFollow({
    handle,
    initialFollowing,
    isLoggedIn,
    onFollowerCountChange,
  })

  if (variant === "bio") {
    return (
      <button
        type="button"
        onClick={() => void toggle()}
        disabled={pending}
        className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-opacity disabled:cursor-wait ${
          following
            ? "border border-[var(--ink-border)] bg-transparent text-[var(--ink-fg)] hover:border-[var(--ink-fg)]"
            : "bg-[var(--ink-fg)] text-[var(--ink-bg)] hover:opacity-90"
        } ${className}`}
        aria-pressed={following}
      >
        {pending ? "…" : following ? "Following" : "Follow"}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={pending}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition-colors disabled:cursor-wait ${
        following
          ? "border border-[var(--ink-border)] text-[var(--ink-fg)] hover:border-[var(--ink-fg)]"
          : "border border-[var(--ink-border)] text-[var(--ink-fg)] hover:border-[var(--ink-fg)] hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)]"
      } ${className}`}
      aria-pressed={following}
    >
      {pending ? "…" : following ? "Following" : "Follow"}
    </button>
  )
}
