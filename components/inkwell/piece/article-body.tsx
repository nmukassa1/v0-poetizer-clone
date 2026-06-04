import { pieceLayoutForType } from "@/lib/piece/layout"
import type { ContentTag } from "@/lib/feed/types"

const DROP_CAP_CLASS =
  "first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.5rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--ink-fg)]"

export function ArticleBodyHtml({
  type,
  paragraphs,
  emptyMessage,
}: {
  type: ContentTag
  paragraphs: string[]
  emptyMessage?: string
}) {
  const { isPoem, bodyClass } = pieceLayoutForType(type, "preview")

  if (paragraphs.length === 0 && emptyMessage) {
    return (
      <p className="font-serif text-[15px] italic text-[var(--ink-subtle)]">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div
      className={`space-y-7 ${bodyClass} ${isPoem ? "whitespace-pre-line" : ""}`}
    >
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={!isPoem && i === 0 ? DROP_CAP_CLASS : ""}
          dangerouslySetInnerHTML={{ __html: p }}
        />
      ))}
    </div>
  )
}

export function ArticleBodyText({
  type,
  paragraphs,
  renderParagraph,
}: {
  type: ContentTag
  paragraphs: string[]
  renderParagraph: (text: string) => React.ReactNode
}) {
  const { isPoem, bodyClass } = pieceLayoutForType(type, "read")

  return (
    <div className={`space-y-7 ${bodyClass}`}>
      {paragraphs.map((paragraph, i) => {
        const showDropCap = !isPoem && i === 0
        return (
          <p
            key={i}
            className={
              showDropCap
                ? DROP_CAP_CLASS
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
  )
}
