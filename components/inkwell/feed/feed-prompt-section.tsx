import Link from "next/link"
import { PromptRail } from "@/components/inkwell/cards"
import { getCurrentPrompt, getPromptHref } from "@/lib/prompts/registry"

export function FeedPromptSection() {
  const currentPrompt = getCurrentPrompt()

  if (!currentPrompt) {
    return null
  }

  return (
    <section>
      <div className="my-7 flex items-center gap-3 max-[479px]:my-6 sm:my-7 lg:my-6">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="h-px flex-1 bg-[var(--ink-border)]" />
          <span className="font-serif text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-prompt-meta)]">
            This week&apos;s prompt
          </span>
          <div className="h-px flex-1 bg-[var(--ink-border)]" />
        </div>
        <Link
          href={getPromptHref(currentPrompt.slug)}
          className="shrink-0 font-sans text-[11px] font-medium text-[var(--ink-prompt-btn)] underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>
      <PromptRail prompt={currentPrompt} />
    </section>
  )
}
