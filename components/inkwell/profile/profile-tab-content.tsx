"use client"

import { useRouter } from "next/navigation"
import type { PiecePost } from "@/lib/feed"
import type { PublicProfile } from "@/lib/profile"
import { getProfileHrefByHandle } from "@/lib/profile"
import { PieceCard } from "@/components/inkwell/piece-card"
import { ProfileEmptyState } from "./profile-empty-state"
import { ProfileAboutSection } from "./profile-about-section"
import type { ProfileMode, ProfileTabKey } from "./types"

export function ProfileTabContent({
  tab,
  mode,
  profile,
  pieces,
  likes,
  drafts,
  canEditAbout = false,
}: {
  tab: ProfileTabKey
  mode: ProfileMode
  profile: PublicProfile
  pieces: PiecePost[]
  likes: PiecePost[]
  drafts: PiecePost[]
  canEditAbout?: boolean
}) {
  const router = useRouter()

  function handleDeleted() {
    router.refresh()
  }

  if (tab === "pieces") {
    if (pieces.length === 0) {
      return (
        <ProfileEmptyState
          title="No published pieces yet"
          copy="When a new piece is published, it will appear here."
          ctaLabel={mode === "me" ? "Write your first piece" : undefined}
          ctaHref={mode === "me" ? "/write?new=1" : undefined}
        />
      )
    }
    return pieces.map((item) => (
      <PieceCard
        key={item.id}
        post={item}
        readHref={`/read/${item.id}`}
        authorHref={getProfileHrefByHandle(item.authorHandle)}
        showDelete={mode === "me"}
        onDeleted={handleDeleted}
      />
    ))
  }

  if (tab === "likes") {
    if (likes.length === 0) {
      return (
        <ProfileEmptyState
          title="No likes yet"
          copy={
            mode === "me"
              ? "Pieces you like will appear here."
              : `${profile.name.split(" ")[0]} hasn't liked any pieces yet.`
          }
        />
      )
    }
    return likes.map((item) => (
      <PieceCard
        key={item.id}
        post={item}
        readHref={`/read/${item.id}`}
        authorHref={getProfileHrefByHandle(item.authorHandle)}
      />
    ))
  }

  if (tab === "drafts") {
    if (mode !== "me") {
      return (
        <ProfileEmptyState
          title="Drafts are private"
          copy="Only the author can see drafts."
        />
      )
    }
    if (drafts.length === 0) {
      return (
        <ProfileEmptyState
          title="No drafts yet"
          copy="Choose Draft visibility when publishing to save without going live."
          ctaLabel="Start writing"
          ctaHref="/write?new=1"
        />
      )
    }
    return drafts.map((item) => (
      <PieceCard
        key={item.id}
        post={item}
        readHref={`/write?pieceId=${item.id}`}
        authorHref={getProfileHrefByHandle(item.authorHandle)}
        ctaLabel="Continue draft"
        showDelete
        onDeleted={handleDeleted}
      />
    ))
  }

  if (tab === "about") {
    return (
      <ProfileAboutSection
        mode={mode}
        profile={profile}
        pieces={pieces}
        canEdit={canEditAbout}
      />
    )
  }

  return null
}
