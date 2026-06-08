"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { Avatar } from "@/components/inkwell/primitives"
import { ProfileStatPill } from "@/components/inkwell/profile/profile-stat-pill"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getProfileHrefByHandle } from "@/lib/profile"
import type { ProfileListItem } from "@/lib/social/types"

type FollowListKind = "followers" | "following"

type ProfileFollowListDialogProps = {
  handle: string
  profileName: string
  kind: FollowListKind
  countLabel: string
}

const titles: Record<FollowListKind, string> = {
  followers: "Followers",
  following: "Following",
}

export function ProfileFollowListDialog({
  handle,
  profileName,
  kind,
  countLabel,
}: ProfileFollowListDialogProps) {
  const [open, setOpen] = useState(false)
  const [profiles, setProfiles] = useState<ProfileListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProfiles = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/profile/${handle}/${kind}`)
      const result = (await response.json()) as {
        success: boolean
        profiles?: ProfileListItem[]
        error?: string
      }

      if (!response.ok || !result.success || !result.profiles) {
        throw new Error(result.error ?? "Could not load profiles.")
      }

      setProfiles(result.profiles)
    } catch (loadError) {
      setProfiles([])
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load profiles.",
      )
    } finally {
      setLoading(false)
    }
  }, [handle, kind])

  useEffect(() => {
    if (open) {
      void loadProfiles()
    }
  }, [open, loadProfiles])

  const title = titles[kind]
  const emptyMessage =
    kind === "followers"
      ? "No followers yet."
      : "Not following anyone yet."

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ProfileStatPill
          label={title}
          value={countLabel}
          interactive
          aria-label={`View ${title.toLowerCase()}`}
        />
      </DialogTrigger>
      <DialogContent className="flex max-h-[min(85vh,640px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="border-b border-neutral-200 px-6 py-5 text-left">
          <DialogTitle className="font-serif">{title}</DialogTitle>
          <DialogDescription className="font-serif">
            {profileName} · @{handle}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {loading ? (
            <p className="px-4 py-8 text-center font-sans text-sm text-neutral-500">
              Loading…
            </p>
          ) : error ? (
            <p className="px-4 py-8 text-center font-sans text-sm text-[#a33f3f]">
              {error}
            </p>
          ) : profiles.length === 0 ? (
            <p className="px-4 py-8 text-center font-serif text-sm italic text-neutral-500">
              {emptyMessage}
            </p>
          ) : (
            <ul className="space-y-1">
              {profiles.map((profile) => (
                <li key={profile.id}>
                  <Link
                    href={getProfileHrefByHandle(profile.handle)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-neutral-100"
                  >
                    <Avatar seed={profile.name} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-sm font-medium text-neutral-950">
                        {profile.name}
                      </p>
                      <p className="truncate font-sans text-[12px] text-neutral-500">
                        @{profile.handle}
                      </p>
                      {profile.bio ? (
                        <p className="mt-1 line-clamp-2 font-serif text-[12px] leading-relaxed text-neutral-600">
                          {profile.bio}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
