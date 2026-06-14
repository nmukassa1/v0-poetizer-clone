import Link from "next/link";
import { PromptRail } from "@/components/inkwell/cards";
import type { LivePromptView } from "@/lib/prompts/types";
import { getPromptHref } from "@/lib/prompts/registry";

export function FeedPromptSection({
  livePrompt,
  variant = "inline",
}: {
  livePrompt: LivePromptView | null;
  variant?: "inline" | "sidebar";
}) {
  if (!livePrompt) {
    return null;
  }

  const promptHref = getPromptHref(livePrompt.slug);

  return (
    <section>
      {variant === "sidebar" ? (
        <div className="mb-4 lg:mt-7 flex items-center justify-between gap-3">
          <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-prompt-meta)]">
            This week&apos;s prompt
          </p>
          <Link
            href={promptHref}
            className="shrink-0 font-sans text-xs font-medium text-[var(--ink-prompt-btn)] underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
      ) : (
        <div className="my-7 flex items-center gap-3 max-[479px]:my-6 sm:my-7 lg:my-6">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="h-px flex-1 bg-[var(--ink-border)]" />
            <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-prompt-meta)] min-[480px]:text-[11px]">
              This week&apos;s prompt
            </span>
            <div className="h-px flex-1 bg-[var(--ink-border)]" />
          </div>
          <Link
            href={promptHref}
            className="shrink-0 font-sans text-xs font-medium text-[var(--ink-prompt-btn)] underline-offset-4 hover:underline min-[480px]:text-sm"
          >
            View all
          </Link>
        </div>
      )}

      <PromptRail
        prompt={livePrompt}
        variant={variant === "sidebar" ? "sidebar" : "feed"}
      />
    </section>
  );
}
