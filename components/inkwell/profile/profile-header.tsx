"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import type { PublicProfile } from "@/lib/profile"
import { Avatar } from "@/components/inkwell/primitives"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DEMO_PROFILE_HANDLES } from "./constants"
import { ProfileEditForm } from "./profile-edit-form"
import { ProfileStatPill } from "./profile-stat-pill"
import { ProfileFollowListDialog } from "./profile-follow-list-dialog"
import { ProfileFollowButton } from "@/components/inkwell/social/profile-follow-button"
import { formatSocialCount } from "@/lib/social/format-count"
import type { ProfileMode } from "./types"

export function ProfileHeader({
  mode,
  lockMode,
  profile,
  pieceCount,
  publicHandle,
  onPublicHandleChange,
  canFollow = false,
  initialFollowing = false,
  onFollowerCountChange,
}: {
  mode: ProfileMode
  lockMode: boolean
  profile: PublicProfile
  pieceCount: number
  publicHandle: string
  onPublicHandleChange: (handle: string) => void
  canFollow?: boolean
  initialFollowing?: boolean
  onFollowerCountChange?: (count: number) => void
}) {
  const locationLabel = profile.location?.trim() || "—"
  const [editOpen, setEditOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [followerCountLabel, setFollowerCountLabel] = useState(profile.followers)
  const [followingCountLabel, setFollowingCountLabel] = useState(profile.following)

  const editProfile = {
    name: profile.name,
    handle: profile.handle,
    bio: profile.bio,
    location: profile.location === "—" ? "" : profile.location,
  }

  useEffect(() => {
    setFollowerCountLabel(profile.followers)
    setFollowingCountLabel(profile.following)
  }, [profile.followers, profile.following])

  useEffect(() => {
    if (editOpen) {
      setFormKey((key) => key + 1)
    }
  }, [editOpen, editProfile.name, editProfile.handle, editProfile.bio, editProfile.location])

  return (
    <section className="pt-8 min-[480px]:pt-10 lg:pt-12">
      <div className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6 lg:p-7">
        {mode === "public" && !lockMode && (
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-subtle)]">
              Viewing public profile
            </label>
            <select
              value={publicHandle}
              onChange={(e) => onPublicHandleChange(e.target.value)}
              className="w-full rounded-lg border border-[var(--ink-border)] bg-[var(--ink-bg)] px-3 py-2 text-sm text-[var(--ink-fg)] outline-none min-[480px]:w-auto"
            >
              {DEMO_PROFILE_HANDLES.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-wrap items-start gap-4 min-[480px]:gap-5">
          <Avatar seed={profile.name} size={72} />
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-2xl font-semibold leading-tight text-[var(--ink-fg)] min-[480px]:text-[30px]">
              {profile.name}
            </h1>
            <p className="mt-1 text-[12px] text-[var(--ink-subtle)]">
              @{profile.handle} · {locationLabel}
            </p>
            {profile.bio ? (
              <p className="mt-3 max-w-xl font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
                {profile.bio}
              </p>
            ) : null}
          </div>
          {mode === "public" && canFollow ? (
            <ProfileFollowButton
              handle={profile.handle}
              initialFollowing={initialFollowing}
              onFollowerCountChange={(count) => {
                const label = formatSocialCount(count)
                setFollowerCountLabel(label)
                onFollowerCountChange?.(count)
              }}
            />
          ) : mode === "public" ? null : (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-border)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
                  >
                    <Pencil className="h-3 w-3" strokeWidth={2} />
                    Edit profile
                  </button>
                </DialogTrigger>
                <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Update your public name, handle, bio, and location.
                    </DialogDescription>
                  </DialogHeader>
                  <ProfileEditForm
                    key={formKey}
                    initialProfile={editProfile}
                    idPrefix="header-edit"
                    onSaved={() => setEditOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <Link
                href="/write?new=1"
                className="inline-flex rounded-full bg-[var(--ink-fg)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-bg)]"
              >
                New piece
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 min-[480px]:gap-3">
          <ProfileStatPill label="Pieces" value={pieceCount.toString()} />
          <ProfileFollowListDialog
            handle={profile.handle}
            profileName={profile.name}
            kind="followers"
            countLabel={followerCountLabel}
          />
          <ProfileFollowListDialog
            handle={profile.handle}
            profileName={profile.name}
            kind="following"
            countLabel={followingCountLabel}
          />
          <ProfileStatPill
            label="Top type"
            value={mode === "public" ? "poem" : "essay"}
            tag
          />
        </div>
      </div>
    </section>
  )
}
