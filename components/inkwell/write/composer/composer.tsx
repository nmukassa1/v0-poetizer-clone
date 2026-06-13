"use client"

import Link from "next/link"
import { ComposerBottomBar } from "./composer-bottom-bar"
import { ComposerEditor } from "./composer-editor"
import { ComposerFormatToolbar } from "./composer-format-toolbar"
import { ComposerGlobalStyles } from "./composer-global-styles"
import { ComposerPreview } from "./composer-preview"
import { ComposerPromptBanner } from "./composer-prompt-banner"
import { ComposerPublished } from "./composer-published"
import { ComposerSettingsSheet } from "./composer-settings-sheet"
import { ComposerSidebar } from "./composer-sidebar"
import { ComposerWordCount } from "./composer-word-count"
import type { ComposerAuthor, ComposerInitialDraft, ComposerLinkedPrompt } from "./types"
import { useComposer } from "./use-composer"

export function Composer({
  author,
  initialDraft = null,
  linkedPrompt = null,
  draftError = null,
  publishedPieceId: loadPublishedPieceId = null,
}: {
  author: ComposerAuthor
  initialDraft?: ComposerInitialDraft | null
  linkedPrompt?: ComposerLinkedPrompt | null
  draftError?: string | null
  publishedPieceId?: string | null
}) {
  const c = useComposer(author, initialDraft, linkedPrompt)

  if (draftError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-medium text-[var(--ink-fg)]">
            {draftError}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/write?new=1"
              className="rounded-full bg-[var(--ink-fg)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90"
            >
              Start a new piece
            </Link>
            {loadPublishedPieceId ? (
              <Link
                href={`/read/${loadPublishedPieceId}`}
                className="rounded-full border border-[var(--ink-border)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
              >
                View piece
              </Link>
            ) : (
              <Link
                href="/profile"
                className="rounded-full border border-[var(--ink-border)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
              >
                Back to profile
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (c.phase === "published") {
    return (
      <ComposerPublished
        title={c.title}
        visibility={c.visibility}
        publishedPieceId={c.publishedPieceId}
        editingPieceId={c.pieceId}
        linkedPrompt={c.linkedPrompt}
      />
    )
  }

  return (
    <div className="min-h-screen pb-32">
      {linkedPrompt ? <ComposerPromptBanner prompt={linkedPrompt} /> : null}

      {c.phase === "edit" ? (
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <ComposerEditor
            type={c.type}
            title={c.title}
            onTitleChange={c.setTitle}
            titleRef={c.titleRef}
            bodyRef={c.bodyRef}
            onBodyInput={c.recalcFromEditor}
          />
          <ComposerSidebar {...c.settingsProps} />
        </div>
      ) : (
        <ComposerPreview
          type={c.type}
          title={c.title}
          bodyHtml={c.bodyHtml}
          excerpt={c.excerpt}
          tags={c.tags}
          date={c.today}
          authorName={c.authorName}
        />
      )}

      <ComposerBottomBar
        phase={c.phase}
        visibility={c.visibility}
        publishError={c.publishError}
        isPublishing={c.isPublishing}
        onPreview={c.startPreview}
        onBackToEdit={c.backToEdit}
        onPublish={c.confirmPublish}
      />

      {c.phase === "edit" && <ComposerWordCount wordCount={c.wordCount} />}

      {c.phase === "edit" && c.popover && (
        <ComposerFormatToolbar
          position={c.popover}
          onBold={() => c.applyFormat("bold")}
          onItalic={() => c.applyFormat("italic")}
          onBlockquote={() => c.applyFormat("formatBlock", "blockquote")}
          onLink={c.applyLink}
        />
      )}

      <ComposerSettingsSheet
        open={c.settingsOpen && c.phase === "edit"}
        onClose={() => c.setSettingsOpen(false)}
        {...c.settingsProps}
      />

      <ComposerGlobalStyles />
    </div>
  )
}
