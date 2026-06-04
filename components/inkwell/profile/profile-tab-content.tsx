import type { ContentTag, PiecePost } from "@/lib/feed-data"
import type { PublicProfile } from "@/lib/profiles"
import { getProfileHrefByHandle } from "@/lib/profiles"
import { Tag } from "@/components/inkwell/primitives"
import { PieceCard } from "@/components/inkwell/piece-card"
import { ProfileEmptyState } from "./profile-empty-state"
import type { ProfileMode, ProfileTabKey } from "./types"

export function ProfileTabContent({
  tab,
  mode,
  profile,
  pieces,
  saved,
  drafts,
}: {
  tab: ProfileTabKey
  mode: ProfileMode
  profile: PublicProfile
  pieces: PiecePost[]
  saved: PiecePost[]
  drafts: PiecePost[]
}) {
  if (tab === "pieces") {
    if (pieces.length === 0) {
      return (
        <ProfileEmptyState
          title="No published pieces yet"
          copy="When a new piece is published, it will appear here."
          ctaLabel={mode === "me" ? "Write your first piece" : undefined}
          ctaHref={mode === "me" ? "/write" : undefined}
        />
      )
    }
    return pieces.map((item) => (
      <PieceCard
        key={item.id}
        post={item}
        readHref={`/read/${item.id}`}
        authorHref={getProfileHrefByHandle(item.authorHandle)}
      />
    ))
  }

  if (tab === "saved") {
    if (saved.length === 0) {
      return (
        <ProfileEmptyState
          title="Nothing saved yet"
          copy="Saved pieces will gather here so you can return to them anytime."
        />
      )
    }
    return saved.map((item) => (
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
          ctaHref="/write"
        />
      )
    }
    return drafts.map((item) => (
      <PieceCard
        key={item.id}
        post={item}
        readHref="/write"
        authorHref={getProfileHrefByHandle(item.authorHandle)}
      />
    ))
  }

  if (tab === "about") {
    return (
      <article className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6">
        <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)]">
          About {profile.name.split(" ")[0]}
        </h2>
        <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
          {mode === "public"
            ? "Eleanor writes poems about transition, domestic spaces, and the soft weather at the edge of evening. Her work appears in The Lantern Review and Night Window Journal."
            : "You write across essays and poems, mostly circling memory, language, and small moments that refuse to fade. This page grows as your body of work grows."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["poem", "story", "essay"] as ContentTag[]).map((kind) => (
            <Tag key={kind} label={kind} />
          ))}
        </div>
      </article>
    )
  }

  return null
}
