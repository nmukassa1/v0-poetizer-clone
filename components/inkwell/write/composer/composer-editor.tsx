import type { RefObject } from "react"
import type { ContentTag } from "@/lib/feed/types"
import { pieceLayoutForType } from "@/lib/piece/layout"
import { CONTENT_TYPES } from "./constants"

export function ComposerEditor({
  type,
  title,
  onTitleChange,
  titleRef,
  bodyRef,
  onBodyInput,
}: {
  type: ContentTag
  title: string
  onTitleChange: (value: string) => void
  titleRef: RefObject<HTMLTextAreaElement | null>
  bodyRef: RefObject<HTMLDivElement | null>
  onBodyInput: () => void
}) {
  const { isPoem, editorColumn, titleSize, bodyClass } = pieceLayoutForType(
    type,
    "editor",
  )
  const typeMeta = CONTENT_TYPES.find((t) => t.id === type)

  return (
    <main className="min-w-0 pt-10 min-[480px]:pt-14 lg:pt-16">
      <div className={editorColumn}>
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Title"
          rows={1}
          className={`w-full resize-none border-0 bg-transparent p-0 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 ${titleSize} ${
            isPoem ? "text-center" : ""
          }`}
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = "auto"
            el.style.height = `${el.scrollHeight}px`
          }}
        />

        <div
          className={`mt-6 mb-8 flex items-center gap-2.5 ${
            isPoem ? "justify-center" : ""
          }`}
        >
          {!isPoem && <span className="h-px w-8 bg-[var(--ink-border)]" />}
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
            {typeMeta?.label}
          </span>
          {!isPoem && <span className="h-px w-8 bg-[var(--ink-border)]" />}
        </div>

        <div
          ref={bodyRef}
          contentEditable
          suppressContentEditableWarning
          onInput={onBodyInput}
          onBlur={onBodyInput}
          data-placeholder={typeMeta?.placeholder ?? ""}
          className={`composer-editor min-h-[40vh] outline-none ${bodyClass} ${
            isPoem ? "[&_p]:my-3" : "[&_p]:my-5"
          } [&_blockquote]:my-5 [&_blockquote]:border-l-[3px] [&_blockquote]:border-[var(--ink-fg)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_a]:text-[var(--ink-accent)] [&_a]:underline [&_a]:underline-offset-4`}
          style={{ whiteSpace: "pre-wrap" }}
        />

        <div className="my-12 flex items-center justify-center">
          <span className="font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)] select-none">
            ◆
          </span>
        </div>
      </div>
    </main>
  )
}
