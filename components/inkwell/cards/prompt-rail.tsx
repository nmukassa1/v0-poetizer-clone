import type { LivePromptView } from "@/lib/prompts/types"
import Link from "next/link"
import { CommentIcon, HeartIcon, Tag } from "@/components/inkwell/primitives"
import {
  getPromptHref,
  getPromptWriteHref,
  getSubmissionReadHref,
} from "@/lib/prompts/registry"

export function PromptRail({ prompt }: { prompt: LivePromptView }) {
  const promptHref = getPromptHref(prompt.slug)

  return (
    <div>
      <div className="mb-3.5 flex flex-col gap-2.5 rounded-xl border border-[var(--ink-prompt-border)] bg-[var(--ink-prompt-bg)] p-3.5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-3 min-[480px]:px-[18px] min-[480px]:py-3.5">
        <Link href={promptHref} className="min-w-0 transition-opacity hover:opacity-90">
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
          className="w-fit shrink-0 rounded-lg border-0 bg-[var(--ink-prompt-btn)] px-3.5 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Write now
        </Link>
      </div>
      {prompt.submissions.length > 0 ? (
        <div className="ink-scrollbar-hide flex gap-2.5 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0 xl:grid-cols-4">
          {prompt.submissions.map((submission) => (
            <Link
              key={submission.id}
              href={getSubmissionReadHref(prompt.slug, submission.id)}
              className="min-w-[150px] shrink-0 rounded-[10px] border border-[var(--ink-prompt-border)] bg-white p-3 transition-colors hover:border-[var(--ink-prompt-btn)]/40 min-[480px]:min-w-[170px] min-[480px]:px-3.5 lg:min-w-0"
            >
              <Tag label={submission.type} />
              <div className="my-1.5 font-serif text-[13px] font-semibold text-[var(--ink-prompt-title)]">
                {submission.title}
              </div>
              <div className="mb-2 text-[11px] text-[var(--ink-prompt-meta)]">
                {submission.author}
              </div>
              <div className="flex gap-2.5 text-[11px] text-[var(--ink-subtle)]">
                <span className="flex items-center gap-1">
                  <HeartIcon /> {submission.likes}
                </span>
                <span className="flex items-center gap-1">
                  <CommentIcon /> {submission.comments}
                </span>
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
  )
}
