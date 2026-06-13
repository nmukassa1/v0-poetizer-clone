import Link from "next/link"
import type { ComposerLinkedPrompt } from "./types"
import { getPromptHref } from "@/lib/prompts/registry"

export function ComposerPromptBanner({
  prompt,
}: {
  prompt: ComposerLinkedPrompt
}) {
  return (
    <div className="border-b border-[var(--ink-prompt-border)] bg-[var(--ink-prompt-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-prompt-meta)]">
            Writing for this week&apos;s prompt
          </p>
          <p className="mt-1 font-serif text-base font-semibold text-[var(--ink-prompt-title)] min-[480px]:text-lg">
            &ldquo;{prompt.title}&rdquo;
          </p>
          <p className="mt-1 line-clamp-2 font-sans text-[12px] leading-relaxed text-[var(--ink-prompt-meta)] min-[480px]:line-clamp-1">
            {prompt.description}
          </p>
        </div>
        <Link
          href={getPromptHref(prompt.slug)}
          className="shrink-0 font-sans text-[12px] font-medium text-[var(--ink-prompt-btn)] underline-offset-4 hover:underline"
        >
          View prompt page
        </Link>
      </div>
    </div>
  )
}
