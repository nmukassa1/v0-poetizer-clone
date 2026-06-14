import Link from "next/link"
import type { PromptDetail } from "@/lib/prompts/types"
import { getPromptWriteHref } from "@/lib/prompts/registry"

function statusBadge(status: PromptDetail["status"]) {
  switch (status) {
    case "active":
      return {
        label: "This week's prompt",
        live: true,
      }
    case "voting":
      return {
        label: "Voting open",
        live: false,
      }
    case "closed":
      return {
        label: "Past prompt",
        live: false,
      }
  }
}

export function PromptHero({ prompt }: { prompt: PromptDetail }) {
  const badge = statusBadge(prompt.status)
  const showWriteCta = prompt.status === "active"

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--ink-prompt-border)] bg-[var(--ink-prompt-bg)] px-5 py-8 min-[480px]:px-8 min-[480px]:py-10 lg:px-10 lg:py-12">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--ink-prompt-btn)" }}
        aria-hidden
      />

      <div className="relative">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-prompt-border)] bg-white/60 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-prompt-meta)]">
            {badge.live ? (
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#f04444]"
                aria-hidden
              />
            ) : null}
            {badge.label}
          </span>
          <span className="font-sans text-[11px] text-[var(--ink-prompt-meta)]">
            {prompt.dateLabel}
          </span>
        </div>

        <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-prompt-title)] min-[480px]:text-4xl lg:text-5xl">
          &ldquo;{prompt.title}&rdquo;
        </h1>

        <p className="mt-4 max-w-2xl font-serif text-[15px] leading-relaxed text-[var(--ink-prompt-title)]/80 min-[480px]:text-base min-[480px]:leading-[1.75]">
          {prompt.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 min-[480px]:mt-8">
          {showWriteCta ? (
            <Link
              href={getPromptWriteHref(prompt.slug)}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--ink-prompt-btn)] px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Write your response
            </Link>
          ) : null}
          <p className="font-sans text-[13px] text-[var(--ink-prompt-meta)]">
            <span className="font-semibold text-[var(--ink-prompt-title)]">
              {prompt.count}
            </span>{" "}
            submissions
            {prompt.days != null ? (
              <>
                {" "}
                ·{" "}
                <span className="font-semibold text-[var(--ink-prompt-title)]">
                  {prompt.days}
                </span>{" "}
                days left
              </>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  )
}
