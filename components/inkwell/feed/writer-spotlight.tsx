"use client"

import Link from "next/link"
import { useState } from "react"
import { Avatar, Tag } from "@/components/inkwell/primitives"
import { ProfileFollowButton } from "@/components/inkwell/social/profile-follow-button"
import {
  FALLBACK_WRITER_SPOTLIGHT,
  type WriterSpotlightData,
} from "@/lib/feed/spotlight-data"
import { formatSocialCount } from "@/lib/social/format-count"
import { getProfileHrefByHandle } from "@/lib/profile"

export function WriterSpotlight({
  spotlight = FALLBACK_WRITER_SPOTLIGHT,
}: {
  spotlight?: WriterSpotlightData
}) {
  const [followerCountLabel, setFollowerCountLabel] = useState(
    spotlight.followerCountLabel,
  )

  const profileHref = getProfileHrefByHandle(spotlight.handle)
  const featuredReadHref = spotlight.featured
    ? `/read/${spotlight.featured.id}`
    : profileHref

  return (
    <article className="overflow-hidden rounded-xl border border-[var(--ink-border)] bg-[var(--ink-bg)]">
      <div className="flex items-start gap-3.5 px-3.5 pt-3.5 min-[480px]:gap-4 min-[480px]:px-4 min-[480px]:pt-4">
        <Avatar seed={spotlight.name} size={56} />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base font-semibold leading-tight text-[var(--ink-fg)] min-[480px]:text-[17px]">
            {spotlight.name}
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--ink-subtle)]">
            @{spotlight.handle} · {spotlight.location}
          </p>
        </div>
        {spotlight.canFollow ? (
          <ProfileFollowButton
            handle={spotlight.handle}
            initialFollowing={spotlight.initialFollowing}
            variant="header"
            onFollowerCountChange={(count) =>
              setFollowerCountLabel(formatSocialCount(count))
            }
          />
        ) : null}
      </div>

      <p className="px-3.5 pt-3 font-serif text-[13px] leading-relaxed text-[var(--ink-muted)] min-[480px]:px-4 min-[480px]:pt-3.5">
        {spotlight.bio}
      </p>

      {spotlight.featured ? (
        <Link
          href={featuredReadHref}
          className="mx-3.5 mt-3 block rounded-lg border border-[var(--ink-border-soft)] bg-white/40 p-3 transition-colors hover:border-[var(--ink-border)] min-[480px]:mx-4 min-[480px]:mt-3.5"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <Tag label={spotlight.featured.type} />
            <span className="text-[9px] uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
              Featured piece
            </span>
          </div>
          <p className="mb-1 font-serif text-sm font-semibold leading-snug text-[var(--ink-fg)]">
            {spotlight.featured.title}
          </p>
          <p className="font-serif text-[11px] italic leading-relaxed text-[var(--ink-muted)]">
            &ldquo;{spotlight.featured.excerpt}&rdquo;
          </p>
        </Link>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-[var(--ink-border-soft)] px-3.5 py-2.5 text-[10px] text-[var(--ink-subtle)] min-[480px]:px-4">
        <span>
          <strong className="font-semibold text-[var(--ink-fg)]">
            {spotlight.pieceCount}
          </strong>{" "}
          published
        </span>
        <span>
          <strong className="font-semibold text-[var(--ink-fg)]">
            {followerCountLabel}
          </strong>{" "}
          followers
        </span>
        <Link
          href={profileHref}
          className="text-[var(--ink-prompt-meta)] underline-offset-4 hover:underline"
        >
          View profile →
        </Link>
      </div>
    </article>
  )
}
