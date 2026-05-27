"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowLeft, PenSquare } from "lucide-react"
import {
  v4FeedItems,
  v4LovedPieces,
  type ContentTag,
  type V4PiecePost,
} from "@/lib/v4-feed-data"
import { Avatar, Divider, Tag } from "@/components/v5/primitives"
import { PieceCard } from "@/components/v5/piece-card"
import { StreakWidget } from "@/components/v5/streak-widget"
import { getPublicProfileByHandle, getPublicProfileHref } from "@/lib/profile-directory"

type ProfileMode = "public" | "me"
type TabKey = "pieces" | "saved" | "drafts" | "about"

const meProfile = {
  name: "You",
  handle: "you",
  location: "London, UK",
  bio: "Writer in progress. Chasing clarity through essays and quiet poems.",
  followers: "126",
  following: "84",
}

const drafts: V4PiecePost[] = [
  {
    kind: "piece",
    type: "essay",
    date: "Updated 2h ago",
    title: "What We Keep Between Lines",
    author: "You",
    excerpt:
      "There are pages we never publish because they were written for one room, one hour, one person we no longer are…",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    kind: "piece",
    type: "poem",
    date: "Updated yesterday",
    title: "Small Weather",
    author: "You",
    excerpt:
      "morning on the windowsill\ntea cooling to a memory\nsomeone laughs downstairs\nand the kettle answers…",
    likes: 0,
    comments: 0,
    shares: 0,
  },
]

function toPieceCardItem(item: (typeof v4LovedPieces)[number]): V4PiecePost {
  return {
    kind: "piece",
    type: item.type,
    date: "Saved",
    title: item.title,
    author: item.author,
    excerpt: item.excerpt,
    likes: item.likes,
    comments: Math.max(4, Math.round(item.likes / 20)),
    shares: Math.max(2, Math.round(item.likes / 40)),
  }
}

function EmptyState({
  title,
  copy,
  ctaLabel,
  ctaHref,
}: {
  title: string
  copy: string
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--v5-border)] bg-[var(--v5-bg)] px-5 py-10 text-center min-[480px]:px-8">
      <h3 className="font-serif text-xl font-semibold text-[var(--v5-fg)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md font-serif text-[15px] leading-relaxed text-[var(--v5-muted)]">
        {copy}
      </p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-5 inline-flex rounded-full bg-[var(--v5-fg)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--v5-bg)]"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
}

export function ProfilePage({
  basePath = "/v7",
  initialMode = "me",
  lockMode = false,
  initialPublicHandle = "eleanorv",
}: {
  basePath?: string
  initialMode?: ProfileMode
  lockMode?: boolean
  initialPublicHandle?: string
}) {
  const [mode, setMode] = useState<ProfileMode>(initialMode)
  const [publicHandle, setPublicHandle] = useState(initialPublicHandle)
  const [tab, setTab] = useState<TabKey>("pieces")
  const readHref = `${basePath}/read`
  const publicProfile = getPublicProfileByHandle(publicHandle)

  const profile = mode === "me" ? meProfile : publicProfile

  const pieces = useMemo(() => {
    const authorName = mode === "me" ? "Lena Müller" : publicProfile.name
    return v4FeedItems
      .filter((item): item is V4PiecePost => item.kind === "piece")
      .filter((item) => item.author === authorName)
  }, [mode, publicProfile.name])

  const saved = useMemo(
    () =>
      v4LovedPieces
        .filter((item) => (mode === "public" ? item.author !== profile.name : true))
        .map(toPieceCardItem),
    [mode, profile.name],
  )

  const tabs: { key: TabKey; label: string }[] =
    mode === "me"
      ? [
          { key: "pieces", label: "Pieces" },
          { key: "saved", label: "Saved" },
          { key: "drafts", label: "Drafts" },
          { key: "about", label: "About" },
        ]
      : [
          { key: "pieces", label: "Pieces" },
          { key: "saved", label: "Saved" },
          { key: "about", label: "About" },
        ]

  if (!tabs.some((item) => item.key === tab)) {
    setTab("pieces")
  }

  const pieceCount = mode === "me" ? pieces.length : Math.max(3, pieces.length)

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px] pb-24 lg:max-w-6xl lg:pb-28 xl:max-w-7xl">
      <header className="sticky top-0 z-20 border-b border-[var(--v5-border)] bg-[color-mix(in_srgb,var(--v5-bg)_95%,transparent)] backdrop-blur-md">
        <div className="flex h-12 items-center justify-between gap-3 px-4 min-[480px]:h-[52px] min-[480px]:px-6 lg:h-16 lg:px-8 xl:px-10">
          <Link
            href={basePath}
            className="group inline-flex items-center gap-2 text-[var(--v5-fg)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-lg font-bold tracking-tight min-[480px]:text-xl lg:text-2xl">
              inkwell
            </span>
          </Link>

          {!lockMode && (
            <div className="inline-flex rounded-full border border-[var(--v5-border)] p-1">
              <button
                type="button"
                onClick={() => setMode("public")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors min-[480px]:px-3.5 ${
                  mode === "public"
                    ? "bg-[var(--v5-fg)] text-[var(--v5-bg)]"
                    : "text-[var(--v5-muted)]"
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setMode("me")}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors min-[480px]:px-3.5 ${
                  mode === "me"
                    ? "bg-[var(--v5-fg)] text-[var(--v5-bg)]"
                    : "text-[var(--v5-muted)]"
                }`}
              >
                My profile
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="px-4 min-[480px]:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-12 xl:px-10">
        <main className="min-w-0">
          <section className="pt-8 min-[480px]:pt-10 lg:pt-12">
            <div className="rounded-2xl border border-[var(--v5-border)] bg-[var(--v5-bg)] p-5 min-[480px]:p-6 lg:p-7">
              {mode === "public" && !lockMode && (
                <div className="mb-4">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--v5-subtle)]">
                    Viewing public profile
                  </label>
                  <select
                    value={publicHandle}
                    onChange={(e) => setPublicHandle(e.target.value)}
                    className="w-full rounded-lg border border-[var(--v5-border)] bg-[var(--v5-bg)] px-3 py-2 text-sm text-[var(--v5-fg)] outline-none min-[480px]:w-auto"
                  >
                    <option value="eleanorv">Eleanor Vance</option>
                    <option value="lenaschreibt">Lena Muller</option>
                    <option value="jinpark">Jin Park</option>
                    <option value="tblake">Theodore Blake</option>
                    <option value="kwamea">Kwame Asante</option>
                    <option value="sofiac">Sofia Chen</option>
                    <option value="jwhitmore">James Whitmore</option>
                    <option value="maraosei">Mara Osei</option>
                  </select>
                </div>
              )}
              <div className="flex flex-wrap items-start gap-4 min-[480px]:gap-5">
                <Avatar seed={profile.name} size={72} />
                <div className="min-w-0 flex-1">
                  <h1 className="font-serif text-2xl font-semibold leading-tight text-[var(--v5-fg)] min-[480px]:text-[30px]">
                    {profile.name}
                  </h1>
                  <p className="mt-1 text-[12px] text-[var(--v5-subtle)]">
                    @{profile.handle} · {profile.location}
                  </p>
                  <p className="mt-3 max-w-xl font-serif text-[15px] leading-relaxed text-[var(--v5-muted)]">
                    {profile.bio}
                  </p>
                </div>
                {mode === "public" ? (
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-[var(--v5-border)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--v5-fg)] transition-colors hover:border-[var(--v5-fg)] hover:bg-[var(--v5-fg)] hover:text-[var(--v5-bg)]"
                  >
                    Follow
                  </button>
                ) : (
                  <Link
                    href={`${basePath}/write`}
                    className="shrink-0 rounded-full bg-[var(--v5-fg)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--v5-bg)]"
                  >
                    New piece
                  </Link>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 min-[480px]:gap-3">
                <StatPill label="Pieces" value={pieceCount.toString()} />
                <StatPill label="Followers" value={profile.followers} />
                <StatPill label="Following" value={profile.following} />
                <StatPill
                  label="Top type"
                  value={mode === "public" ? "poem" : "essay"}
                  tag
                />
              </div>
            </div>
          </section>

          {mode === "me" && (
            <section>
              <Divider label="Your streaks" />
              <StreakWidget />
            </section>
          )}

          <section>
            <Divider label="Library" />
            <nav className="mb-3 flex flex-wrap gap-1.5" aria-label="Profile tabs">
              {tabs.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors ${
                    tab === item.key
                      ? "border-[var(--v5-fg)] bg-[var(--v5-fg)] text-[var(--v5-bg)]"
                      : "border-[var(--v5-border)] text-[var(--v5-muted)] hover:border-[var(--v5-fg)]/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {tab === "pieces" &&
              (pieces.length > 0 ? (
                pieces.map((item, i) => (
                  <PieceCard
                    key={`${item.title}-${i}`}
                    post={item}
                    readHref={readHref}
                    authorHref={getPublicProfileHref(basePath, item.author)}
                  />
                ))
              ) : (
                <EmptyState
                  title="No published pieces yet"
                  copy="When a new piece is published, it will appear here."
                  ctaLabel={mode === "me" ? "Write your first piece" : undefined}
                  ctaHref={mode === "me" ? `${basePath}/write` : undefined}
                />
              ))}

            {tab === "saved" &&
              (saved.length > 0 ? (
                saved.map((item, i) => (
                  <PieceCard
                    key={`${item.title}-saved-${i}`}
                    post={item}
                    readHref={readHref}
                    authorHref={getPublicProfileHref(basePath, item.author)}
                  />
                ))
              ) : (
                <EmptyState
                  title="Nothing saved yet"
                  copy="Saved pieces will gather here so you can return to them anytime."
                />
              ))}

            {tab === "drafts" &&
              (mode === "me" ? (
                drafts.map((item, i) => (
                  <PieceCard
                    key={`${item.title}-draft-${i}`}
                    post={item}
                    readHref={`${basePath}/write`}
                    authorHref={getPublicProfileHref(basePath, item.author)}
                  />
                ))
              ) : (
                <EmptyState
                  title="Drafts are private"
                  copy="Only the author can see drafts."
                />
              ))}

            {tab === "about" && (
              <article className="rounded-2xl border border-[var(--v5-border)] bg-[var(--v5-bg)] p-5 min-[480px]:p-6">
                <h2 className="font-serif text-xl font-semibold text-[var(--v5-fg)]">
                  About {profile.name.split(" ")[0]}
                </h2>
                <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--v5-muted)]">
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
            )}
          </section>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-[82px] space-y-6">
            <section className="rounded-xl border border-[var(--v5-border)] bg-[var(--v5-bg)] p-4">
              <h3 className="font-serif text-base font-semibold text-[var(--v5-fg)]">
                {mode === "me" ? "Writing desk" : "About this writer"}
              </h3>
              <p className="mt-2 font-serif text-[13px] leading-relaxed text-[var(--v5-muted)]">
                {mode === "me"
                  ? "Continue your current draft or start a fresh piece."
                  : "Follow to see new pieces as soon as they are published."}
              </p>
              {mode === "me" ? (
                <Link
                  href={`${basePath}/write`}
                  className="mt-4 inline-flex rounded-full bg-[var(--v5-fg)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--v5-bg)]"
                >
                  New piece
                </Link>
              ) : (
                <button
                  type="button"
                  className="mt-4 inline-flex rounded-full border border-[var(--v5-border)] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--v5-fg)]"
                >
                  Follow writer
                </button>
              )}
            </section>

            <section className="rounded-xl border border-[var(--v5-border)] bg-[var(--v5-bg)] p-4">
              <h3 className="font-serif text-base font-semibold text-[var(--v5-fg)]">
                Profile notes
              </h3>
              <ul className="mt-2 space-y-2 text-[12px] leading-relaxed text-[var(--v5-muted)]">
                <li>• Pieces link into the reader view.</li>
                <li>• Drafts open in the composer.</li>
                <li>• Profile mode can be replaced by real auth later.</li>
              </ul>
            </section>
          </div>
        </aside>
      </div>

      {mode === "me" && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-20 lg:hidden">
          <Link
            href={`${basePath}/write`}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[var(--v5-fg)] px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--v5-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <PenSquare className="h-4 w-4" />
            New piece
          </Link>
        </div>
      )}
    </div>
  )
}

function StatPill({
  label,
  value,
  tag = false,
}: {
  label: string
  value: string
  tag?: boolean
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--v5-border)] bg-[var(--v5-bg)] px-3 py-1.5">
      <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--v5-subtle)]">
        {label}
      </span>
      {tag ? (
        <Tag label={value} />
      ) : (
        <span className="text-[12px] font-semibold text-[var(--v5-fg)]">{value}</span>
      )}
    </div>
  )
}
