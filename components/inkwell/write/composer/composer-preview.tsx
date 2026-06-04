import type { ContentTag } from "@/lib/feed/types"
import { htmlBlocksFromBody } from "@/lib/piece/body-html"
import { pieceLayoutForType } from "@/lib/piece/layout"
import { ArticleBodyHtml } from "@/components/inkwell/piece/article-body"
import { ArticleMeta } from "@/components/inkwell/piece/article-meta"
import { ArticleOrnament } from "@/components/inkwell/piece/article-ornament"
import { ArticleTypeHeader } from "@/components/inkwell/piece/article-type-header"

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
  const { isPoem, articleColumn, titleSize } = pieceLayoutForType(type, "preview")

  const paragraphs =
    typeof window !== "undefined" ? htmlBlocksFromBody(bodyHtml, type) : []

  return (
    <article className={`pt-12 min-[480px]:pt-16 lg:pt-20 ${articleColumn}`}>
      <ArticleTypeHeader type={type} isPoem={isPoem} />

      <h1
        className={`mb-6 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] ${titleSize}`}
      >
        {title || (
          <span className="text-[var(--ink-subtle)] italic">Untitled</span>
        )}
      </h1>

      <ArticleMeta author={authorName} date={date} isPoem={isPoem} />

      <div className="mb-12">
        <ArticleOrnament isPoem={isPoem} variant="triple" />
      </div>

      <ArticleBodyHtml
        type={type}
        paragraphs={paragraphs}
        emptyMessage="No body yet — go back and start writing."
      />

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

      <div className="mt-12">
        <ArticleOrnament isPoem={isPoem} variant="single" />
      </div>
    </article>
  )
}
