import type { ContentTag } from "@/lib/feed-data"
import { Avatar, Tag } from "@/components/inkwell/primitives"
import { composerLayoutForType, paragraphsFromBody } from "./utils"

export function ComposerPreview({
  type,
  title,
  bodyHtml,
  excerpt,
  tags,
  date,
  authorName,
}: {
  type: ContentTag
  title: string
  bodyHtml: string
  excerpt: string
  tags: string[]
  date: string
  authorName: string
}) {
  const { isPoem, articleColumn, previewTitleSize, bodyClass } =
    composerLayoutForType(type)

  const paragraphs =
    typeof window !== "undefined" ? paragraphsFromBody(bodyHtml, type) : []

  return (
    <article className={`pt-12 min-[480px]:pt-16 lg:pt-20 ${articleColumn}`}>
      <div
        className={`mb-8 flex items-center gap-3 ${
          isPoem ? "justify-center" : ""
        }`}
      >
        {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
        <Tag label={type} />
        {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
      </div>

      <h1
        className={`mb-6 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] ${previewTitleSize}`}
      >
        {title || (
          <span className="text-[var(--ink-subtle)] italic">Untitled</span>
        )}
      </h1>

      <div
        className={`mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--ink-muted)] ${
          isPoem ? "justify-center" : ""
        }`}
      >
        <Avatar seed={authorName} size={28} />
        <span className="font-medium text-[var(--ink-fg)]">{authorName}</span>
        <span className="text-[var(--ink-subtle)]">·</span>
        <span>{date}</span>
      </div>

      <div
        className={`mb-12 flex items-center gap-3 ${
          isPoem ? "justify-center" : ""
        }`}
        aria-hidden
      >
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
        <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
          ◆ ◆ ◆
        </span>
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
      </div>

      {paragraphs.length === 0 ? (
        <p className="font-serif text-[15px] italic text-[var(--ink-subtle)]">
          No body yet — go back and start writing.
        </p>
      ) : (
        <div
          className={`space-y-7 ${bodyClass} ${isPoem ? "whitespace-pre-line" : ""}`}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                !isPoem && i === 0
                  ? "first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.5rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--ink-fg)]"
                  : ""
              }
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      )}

      {(excerpt || tags.length > 0) && (
        <div className="mx-auto mt-16 max-w-[640px] rounded-xl border border-[var(--ink-border)] bg-[var(--ink-inset)] p-5">
          <div className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
            Feed preview
          </div>
          {excerpt && (
            <p className="font-serif text-sm italic leading-relaxed text-[var(--ink-muted)]">
              &ldquo;{excerpt}&rdquo;
            </p>
          )}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--ink-tag-bg)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-tag-text)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-12 flex items-center justify-center gap-3" aria-hidden>
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
        <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
          ◆
        </span>
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
      </div>
    </article>
  )
}
