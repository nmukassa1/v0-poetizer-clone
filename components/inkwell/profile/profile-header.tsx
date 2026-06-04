import Link from "next/link"
import type { PublicProfile } from "@/lib/profile"
import { Avatar } from "@/components/inkwell/primitives"
import { DEMO_PROFILE_HANDLES } from "./constants"
import { ProfileStatPill } from "./profile-stat-pill"
import type { ProfileMode } from "./types"

export function ProfileHeader({
  mode,
  lockMode,
  profile,
  pieceCount,
  publicHandle,
  onPublicHandleChange,
}: {
  mode: ProfileMode
  lockMode: boolean
  profile: PublicProfile
  pieceCount: number
  publicHandle: string
  onPublicHandleChange: (handle: string) => void
}) {
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
              @{profile.handle} · {profile.location}
            </p>
            <p className="mt-3 max-w-xl font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
              {profile.bio}
            </p>
          </div>
          {mode === "public" ? (
            <button
              type="button"
              className="shrink-0 rounded-full border border-[var(--ink-border)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] hover:bg-[var(--ink-fg)] hover:text-[var(--ink-bg)]"
            >
              Follow
            </button>
          ) : (
            <Link
              href="/write"
              className="shrink-0 rounded-full bg-[var(--ink-fg)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--ink-bg)]"
            >
              New piece
            </Link>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 min-[480px]:gap-3">
          <ProfileStatPill label="Pieces" value={pieceCount.toString()} />
          <ProfileStatPill label="Followers" value={profile.followers} />
          <ProfileStatPill label="Following" value={profile.following} />
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
