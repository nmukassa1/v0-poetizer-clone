import Link from "next/link"
import type { PastPrompt, PromptStatus } from "@/lib/feed"
import type { LivePromptView } from "@/lib/prompts/types"
import { getPromptHref } from "@/lib/prompts/registry"

function statusLabel(status: PromptStatus) {
  switch (status) {
    case "active":
      return "Live"
    case "voting":
      return "Voting"
    case "closed":
      return "Closed"
  }
}

function ScoreboardCard({
  slug,
  dateLabel,
  status,
  title,
  submissionCount,
  topSubmission,
  runnerUp,
  active = false,
  sidebar = false,
}: {
  slug: string
  dateLabel: string
  status: PromptStatus
  title: string
  submissionCount: number
  topSubmission?: { title: string; author: string; likes: number }
  runnerUp?: { title: string; author: string; likes: number }
  active?: boolean
  sidebar?: boolean
}) {
  const rows = [
    topSubmission
      ? {
          label: topSubmission.title,
          meta: topSubmission.author,
          value: topSubmission.likes,
          highlight: true,
        }
      : null,
    runnerUp
      ? {
          label: runnerUp.title,
          meta: runnerUp.author,
          value: runnerUp.likes,
          highlight: false,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string
    meta: string
    value: number
    highlight: boolean
  }>

  return (
    <Link
      href={getPromptHref(slug)}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col rounded-[10px] border p-2.5 transition-colors min-[480px]:p-3 ${
        sidebar ? "w-full" : "w-[132px] shrink-0 min-[480px]:w-[148px]"
      } ${
        active
          ? "border-[var(--ink-prompt-btn)] bg-[var(--ink-prompt-bg)] ring-1 ring-[var(--ink-prompt-btn)]"
          : "border-[var(--ink-prompt-border)] bg-white hover:border-[var(--ink-prompt-btn)]/40"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-1 text-[10px] font-medium">
        <span className="text-[var(--ink-subtle)]">{dateLabel}</span>
        <span
          className={`flex items-center gap-1 ${
            status === "active"
              ? "text-[var(--ink-prompt-btn)]"
              : "text-[var(--ink-prompt-meta)]"
          }`}
        >
          {status === "active" && (
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#e05252]"
              aria-hidden
            />
          )}
          {statusLabel(status)}
        </span>
      </div>

      <p className="mb-2 line-clamp-2 font-serif text-[11px] font-semibold leading-snug text-[var(--ink-prompt-title)] min-[480px]:text-xs">
        {title}
      </p>

      {rows.length > 0 ? (
        <div className="mt-auto space-y-1.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-1.5 text-[10px]"
            >
              {row.highlight ? (
                <span
                  className="shrink-0 text-[var(--ink-prompt-btn)]"
                  aria-hidden
                >
                  ▸
                </span>
              ) : (
                <span className="w-[7px] shrink-0" aria-hidden />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[var(--ink-prompt-title)]">
                  {row.label}
                </p>
                <p className="truncate text-[var(--ink-prompt-meta)]">{row.meta}</p>
              </div>
              <span className="shrink-0 tabular-nums font-semibold text-[var(--ink-fg)]">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-auto flex items-end justify-between gap-2">
          <span className="text-[10px] text-[var(--ink-muted)]">Entries</span>
          <span className="font-serif text-xl font-bold tabular-nums text-[var(--ink-prompt-title)]">
            {submissionCount}
          </span>
        </div>
      )}
    </Link>
  )
}

export function PromptScoreboard({
  pastPrompts,
  currentPrompt,
  activeSlug,
  variant = "rail",
}: {
  pastPrompts: PastPrompt[]
  currentPrompt: LivePromptView | null
  activeSlug: string
  variant?: "rail" | "sidebar"
}) {
  const sidebar = variant === "sidebar"
  const cards = [
    ...pastPrompts.map((prompt) => (
      <ScoreboardCard
        key={prompt.id}
        slug={prompt.slug}
        sidebar={sidebar}
        dateLabel={prompt.dateLabel}
        status={prompt.status}
        title={prompt.title}
        submissionCount={prompt.submissionCount}
        topSubmission={prompt.topSubmission}
        runnerUp={prompt.runnerUp}
        active={prompt.slug === activeSlug}
      />
    )),
    ...(currentPrompt
      ? [
          <ScoreboardCard
            key={currentPrompt.id}
            slug={currentPrompt.slug}
            sidebar={sidebar}
            dateLabel={currentPrompt.startsAt}
            status="active"
            title={currentPrompt.title}
            submissionCount={currentPrompt.count}
            active={currentPrompt.slug === activeSlug}
          />,
        ]
      : []),
  ]

  return (
    <section aria-label="Previous prompts">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
          {currentPrompt ? "Previous prompts" : "Prompt archive"}
        </h2>
        <span className="font-sans text-[10px] text-[var(--ink-subtle)]">
          {pastPrompts.length + (currentPrompt ? 1 : 0)} weeks
        </span>
      </div>

      <div
        className={
          sidebar
            ? "ink-scrollbar-hide max-h-[calc(100dvh-6.5rem)] space-y-2 overflow-y-auto pr-1"
            : "ink-scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-webkit-overflow-scrolling:touch] min-[480px]:-mx-6 min-[480px]:px-6"
        }
      >
        {cards}
      </div>
    </section>
  )
}
