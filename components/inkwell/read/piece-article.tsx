import type { RefObject } from "react"
import type { ContentTag } from "@/lib/feed-data"
import { Avatar, Tag } from "@/components/inkwell/primitives"

export function PieceArticle({
  articleRef,
  type,
  title,
  author,
  date,
  minutes,
  paragraphs,
  renderParagraph,
}: {
  articleRef: RefObject<HTMLElement | null>
  type: ContentTag
  title: string
  author: string
  date: string
  minutes: number
  paragraphs: string[]
  renderParagraph: (text: string) => React.ReactNode
}) {
  const isPoem = type === "poem"
  const articleColumn = isPoem
    ? "mx-auto max-w-[480px] px-5 text-center min-[480px]:px-6 min-[480px]:max-w-[520px]"
    : "mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]"
  const titleSize = isPoem
    ? "text-[28px] min-[480px]:text-[36px] lg:text-[44px]"
    : "text-[28px] min-[480px]:text-[40px] lg:text-[52px]"
  const bodyClass = isPoem
    ? "font-serif text-base leading-[2] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[2.1]"
    : "font-serif text-[16px] leading-[1.8] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.85]"

  return (
    <article
      ref={articleRef}
      className={`pt-12 min-[480px]:pt-16 lg:pt-20 ${articleColumn}`}
    >
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
        className={`mb-6 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] ${titleSize}`}
      >
        {title}
      </h1>

      <div
        className={`mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--ink-muted)] ${
          isPoem ? "justify-center" : ""
        }`}
      >
        <Avatar seed={author} size={28} />
        <span className="font-medium text-[var(--ink-fg)]">{author}</span>
        <span className="text-[var(--ink-subtle)]">·</span>
        <span>{date}</span>
        <span className="text-[var(--ink-subtle)]">·</span>
        <span>{minutes} min read</span>
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

      <div className={`space-y-7 ${bodyClass}`}>
        {paragraphs.map((paragraph, i) => {
          const showDropCap = !isPoem && i === 0
          return (
            <p
              key={i}
              className={
                showDropCap
                  ? "first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.5rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--ink-fg)]"
                  : isPoem
                    ? "whitespace-pre-line"
                    : ""
              }
            >
              {renderParagraph(paragraph)}
            </p>
          )
        })}
      </div>

      <div
        className={`mt-12 flex items-center gap-3 ${
          isPoem ? "justify-center" : ""
        }`}
        aria-hidden
      >
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
        <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
          ◆
        </span>
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
      </div>
    </article>
  )
}
