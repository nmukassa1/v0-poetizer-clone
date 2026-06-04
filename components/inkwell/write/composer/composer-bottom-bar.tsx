import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Phase, Visibility } from "./types"

export function ComposerBottomBar({
  phase,
  visibility,
  publishError,
  isPublishing,
  onPreview,
  onBackToEdit,
  onPublish,
}: {
  phase: Phase
  visibility: Visibility
  publishError: string | null
  isPublishing: boolean
  onPreview: () => void
  onBackToEdit: () => void
  onPublish: () => void
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 min-[480px]:pb-6">
      <div className="pointer-events-auto flex w-full max-w-lg flex-col gap-2">
        {publishError && phase === "preview" && (
          <p
            role="alert"
            className="rounded-lg border border-[#e8d4d4] bg-[color-mix(in_srgb,#fff5f5_92%,var(--ink-bg))] px-3 py-2 text-center font-sans text-[12px] text-[#a33f3f]"
          >
            {publishError}
          </p>
        )}
        <div className="flex items-center justify-between gap-2 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-[11px] font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Exit
          </Link>
          {phase === "edit" ? (
            <button
              type="button"
              onClick={onPreview}
              className="rounded-full bg-[var(--ink-fg)] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90"
            >
              Preview
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onBackToEdit}
                disabled={isPublishing}
                className="rounded-full border border-[var(--ink-border)] px-3.5 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] disabled:opacity-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onPublish}
                disabled={isPublishing}
                className="rounded-full bg-[var(--ink-fg)] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPublishing
                  ? "Saving…"
                  : visibility === "draft"
                    ? "Save draft"
                    : "Publish"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
