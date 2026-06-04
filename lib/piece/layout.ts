import type { ContentTag } from "@/lib/feed/types"

export type PieceLayoutVariant = "read" | "preview" | "editor"

export function pieceLayoutForType(
  type: ContentTag,
  variant: PieceLayoutVariant = "read",
) {
  const isPoem = type === "poem"

  const readArticleColumn = isPoem
    ? "mx-auto max-w-[480px] px-5 text-center min-[480px]:px-6 min-[480px]:max-w-[520px]"
    : "mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]"

  const previewArticleColumn = isPoem
    ? "mx-auto max-w-[480px] px-5 text-center min-[480px]:px-6 min-[480px]:max-w-[520px]"
    : "mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]"

  const editorColumn = isPoem
    ? "mx-auto max-w-[520px] px-5 text-center min-[480px]:px-6"
    : "mx-auto max-w-[680px] px-5 min-[480px]:px-6"

  const bodyClass = isPoem
    ? "font-serif text-base leading-[2] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[2.1]"
    : "font-serif text-[16px] leading-[1.8] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.85]"

  const titleByVariant: Record<PieceLayoutVariant, string> = {
    read: isPoem
      ? "text-[28px] min-[480px]:text-[36px] lg:text-[44px]"
      : "text-[28px] min-[480px]:text-[40px] lg:text-[52px]",
    preview: isPoem
      ? "text-[28px] min-[480px]:text-[36px] lg:text-[44px]"
      : "text-[28px] min-[480px]:text-[40px] lg:text-[52px]",
    editor: isPoem
      ? "text-[28px] min-[480px]:text-[34px] lg:text-[40px]"
      : "text-[28px] min-[480px]:text-[36px] lg:text-[44px]",
  }

  const articleColumn =
    variant === "editor"
      ? editorColumn
      : variant === "preview"
        ? previewArticleColumn
        : readArticleColumn

  return {
    isPoem,
    articleColumn,
    editorColumn,
    titleSize: titleByVariant[variant],
    bodyClass,
    dropCapClass:
      "first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.5rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--ink-fg)]",
  }
}
