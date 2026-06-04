"use client"

import { ComposerBottomBar } from "./composer-bottom-bar"
import { ComposerEditor } from "./composer-editor"
import { ComposerFormatToolbar } from "./composer-format-toolbar"
import { ComposerGlobalStyles } from "./composer-global-styles"
import { ComposerPreview } from "./composer-preview"
import { ComposerPublished } from "./composer-published"
import { ComposerSettingsSheet } from "./composer-settings-sheet"
import { ComposerSidebar } from "./composer-sidebar"
import { ComposerWordCount } from "./composer-word-count"
import type { ComposerAuthor } from "./types"
import { useComposer } from "./use-composer"

export function Composer({ author }: { author: ComposerAuthor }) {
  const c = useComposer(author)

  if (c.phase === "published") {
    return (
      <ComposerPublished
        title={c.title}
        visibility={c.visibility}
        publishedPieceId={c.publishedPieceId}
      />
    )
  }

  return (
    <div className="min-h-screen pb-32">
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
