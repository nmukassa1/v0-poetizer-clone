import Link from "next/link"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import type { Phase, Visibility } from "./types"

export function ComposerBottomBar({
  phase,
  visibility,
  publishError,
  isPublishing,
  onPreview,
  onBackToEdit,
  onPublish,
  onOpenSettings,
}: {
  phase: Phase
  visibility: Visibility
  publishError: string | null
  isPublishing: boolean
  onPreview: () => void
  onBackToEdit: () => void
  onPublish: () => void
  onOpenSettings: () => void
}) {
  const publishLabel = isPublishing
    ? "Saving…"
    : visibility === "draft"
      ? "Save draft"
      : "Publish"

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] min-[480px]:px-4 min-[480px]:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex w-full max-w-lg flex-col gap-2">
        {publishError && phase === "preview" && (
          <p
            role="alert"
            className="rounded-lg border border-[#e8d4d4] bg-[color-mix(in_srgb,#fff5f5_92%,var(--ink-bg))] px-3 py-2 text-center font-sans text-[12px] text-[#a33f3f]"
          >
            {publishError}
          </p>
        )}
        <div className="flex items-center gap-1.5 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <Link
            href="/"
            aria-label="Exit composer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-2 font-sans text-[11px] font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)] min-[480px]:px-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden min-[360px]:inline">Exit</span>
          </Link>

          <div className="ml-auto flex min-w-0 items-center gap-1.5">
            {(phase === "edit" || phase === "preview") && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--ink-border)] p-2 text-[var(--ink-muted)] transition-colors hover:border-[var(--ink-fg)] hover:text-[var(--ink-fg)] lg:hidden"
                aria-label="Piece settings"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
              </button>
            )}

            {phase === "edit" ? (
              <button
                type="button"
                onClick={onPreview}
                className="shrink-0 rounded-full bg-[var(--ink-fg)] px-3.5 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 min-[480px]:px-4"
              >
                Preview
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onBackToEdit}
                  disabled={isPublishing}
                  className="shrink-0 rounded-full border border-[var(--ink-border)] px-3 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)] disabled:opacity-50 min-[480px]:px-3.5"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={onPublish}
                  disabled={isPublishing}
                  className="shrink-0 rounded-full bg-[var(--ink-fg)] px-3.5 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 min-[480px]:px-4"
                >
                  <span className="hidden min-[400px]:inline">{publishLabel}</span>
                  <span className="min-[400px]:hidden">
                    {isPublishing ? "…" : visibility === "draft" ? "Save" : "Publish"}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
