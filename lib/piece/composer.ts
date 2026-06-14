import type { ContentTag } from "@/lib/feed/types"
import { excerptFromBody } from "@/lib/piece/excerpt"
import type { PieceWithAuthor } from "@/lib/piece/map"
import { pieceTypeToContentTag } from "@/lib/piece/types"
import { visibilityToComposerInput } from "@/lib/piece/visibility"
import type { ComposerVisibility } from "@/lib/piece/visibility"

export type ComposerInitialDraft = {
  pieceId: string
  type: ContentTag
  title: string
  bodyHtml: string
  excerpt: string
  excerptOverridden: boolean
  tags: string[]
  visibility: ComposerVisibility
  promptSlug?: string | null
  updatedAt: Date
}

export function pieceToComposerInitial(
  piece: PieceWithAuthor,
): ComposerInitialDraft {
  const autoExcerpt = excerptFromBody(piece.body, 500)
  const excerptOverridden =
    piece.excerpt.trim().length > 0 && piece.excerpt !== autoExcerpt

  return {
    pieceId: piece.id,
    type: pieceTypeToContentTag(piece.type),
    title: piece.title,
    bodyHtml: piece.body,
    excerpt: piece.excerpt,
    excerptOverridden,
    tags: piece.tags,
    promptSlug: piece.promptSlug,
    visibility: visibilityToComposerInput(piece.status, piece.visibility),
    updatedAt: piece.updatedAt,
  }
}
