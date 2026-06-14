import type { LivePromptView } from "@/lib/prompts/types";
import Link from "next/link";
import { CommentIcon, HeartIcon, Tag } from "@/components/inkwell/primitives";
import {
  getPromptHref,
  getPromptWriteHref,
  getSubmissionReadHref,
} from "@/lib/prompts/registry";

export function PromptRail({
  prompt,
  variant = "feed",
}: {
  prompt: LivePromptView;
  variant?: "feed" | "sidebar";
}) {
  const promptHref = getPromptHref(prompt.slug);
  const isSidebar = variant === "sidebar";

  return (
    <div>
      <div
        className={`mb-3.5 flex flex-col gap-2.5 rounded-xl border border-[var(--ink-prompt-border)] bg-[var(--ink-prompt-bg)] p-3.5 ${
          isSidebar
            ? "px-4 py-4"
            : "min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-3 min-[480px]:px-[18px] min-[480px]:py-3.5"
        }`}
      >
        <Link
          href={promptHref}
          className="min-w-0 transition-opacity hover:opacity-90"
        >
          <div className="mb-1 text-[9px] font-bold tracking-[0.1em] text-[var(--ink-prompt-meta)]">
            THIS WEEK&apos;S PROMPT
          </div>
          <div className="font-serif text-sm font-bold text-[var(--ink-prompt-title)] min-[480px]:text-[15px]">
            &ldquo;{prompt.title}&rdquo;
          </div>
          <div className="mt-1 text-[11px] text-[var(--ink-prompt-meta)]">
            {prompt.count} submissions · {prompt.days} days left
          </div>
        </Link>
        <Link
          href={getPromptWriteHref(prompt.slug)}
          className={`w-fit shrink-0 rounded-lg border-0 bg-[var(--ink-prompt-btn)] px-3.5 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 ${
            isSidebar ? "w-full text-center" : ""
          }`}
        >
          Write now
        </Link>
      </div>
      {prompt.submissions.length > 0 ? (
        <div className="ink-scrollbar-hide -mx-0.5 flex gap-2.5 overflow-x-auto px-0.5 pb-1 [-webkit-overflow-scrolling:touch]">
          {prompt.submissions.map((submission) => (
            <Link
              key={submission.id}
              href={getSubmissionReadHref(prompt.slug, submission.id)}
              className="flex aspect-square w-[128px] shrink-0 flex-col rounded-[10px] border border-[var(--ink-prompt-border)] bg-white p-3 transition-colors hover:border-[var(--ink-prompt-btn)]/40 min-[480px]:w-[140px]"
            >
              <Tag label={submission.type} />
              <div className="mt-1.5 line-clamp-3 flex-1 font-serif text-[12px] font-semibold leading-snug text-[var(--ink-prompt-title)] min-[480px]:text-[13px]">
                {submission.title}
              </div>
              <div className="mt-auto space-y-1.5 pt-1">
                <div className="truncate text-[10px] text-[var(--ink-prompt-meta)] min-[480px]:text-[11px]">
                  {submission.author}
                </div>
                <div className="flex gap-2.5 text-[10px] text-[var(--ink-subtle)] min-[480px]:text-[11px]">
                  <span className="flex items-center gap-1">
                    <HeartIcon /> {submission.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <CommentIcon /> {submission.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--ink-prompt-border)] px-4 py-6 text-center font-sans text-[12px] text-[var(--ink-prompt-meta)]">
          No submissions yet. Be the first to write a response.
        </div>
      )}
    </div>
  );
}
