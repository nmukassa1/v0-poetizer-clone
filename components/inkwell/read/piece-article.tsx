import type { RefObject } from "react"
import type { ContentTag } from "@/lib/feed/types"
import { pieceLayoutForType } from "@/lib/piece/layout"
import { ArticleBodyText } from "@/components/inkwell/piece/article-body"
import { ArticleMeta } from "@/components/inkwell/piece/article-meta"
import { ArticleOrnament } from "@/components/inkwell/piece/article-ornament"
import { ArticleTypeHeader } from "@/components/inkwell/piece/article-type-header"

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
  const { isPoem, articleColumn, titleSize } = pieceLayoutForType(type, "read")

  return (
    <article
      ref={articleRef}
      className={`pt-12 min-[480px]:pt-16 lg:pt-20 ${articleColumn}`}
    >
      <ArticleTypeHeader type={type} isPoem={isPoem} />

      <h1
        className={`mb-6 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] ${titleSize}`}
      >
        {title}
      </h1>

      <ArticleMeta author={author} date={date} minutes={minutes} isPoem={isPoem} />

      <div className="mb-12">
        <ArticleOrnament isPoem={isPoem} variant="triple" />
      </div>

      <ArticleBodyText
        type={type}
        paragraphs={paragraphs}
        renderParagraph={renderParagraph}
      />

      <div className="mt-12">
        <ArticleOrnament isPoem={isPoem} variant="single" />
      </div>
    </article>
  )
}
