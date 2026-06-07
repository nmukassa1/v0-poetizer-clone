import Link from "next/link"
import { Avatar } from "@/components/inkwell/primitives"
import { ProfileFollowButton } from "@/components/inkwell/social/profile-follow-button"

export function AuthorBioCard({
  author,
  authorHandle,
  authorPieces,
  authorBio,
  profileHref,
  canFollow = false,
  initialFollowing = false,
}: {
  author: string
  authorHandle: string
  authorPieces: number
  authorBio: string
  profileHref: string
  canFollow?: boolean
  initialFollowing?: boolean
}) {
  return (
    <section className="mx-auto mb-12 mt-16 max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]">
      <div className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-7">
        <div className="flex items-start gap-4">
          <Avatar seed={author} size={64} />
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg font-semibold leading-tight text-[var(--ink-fg)]">
              {author}
            </p>
            <p className="mt-0.5 text-[11px] text-[var(--ink-subtle)]">
              @{authorHandle} · {authorPieces}{" "}
              {authorPieces === 1 ? "piece" : "pieces"}
            </p>
            <p className="mt-3 font-serif text-[14px] leading-relaxed text-[var(--ink-muted)] min-[480px]:text-[15px]">
              {authorBio}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {canFollow ? (
            <ProfileFollowButton
              handle={authorHandle}
              initialFollowing={initialFollowing}
              variant="bio"
            />
          ) : null}
          <Link
            href={profileHref}
            className="inline-flex rounded-full border border-[var(--ink-border)] bg-transparent px-4 py-2 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
          >
            View profile
          </Link>
        </div>
      </div>
    </section>
  )
}
