import type { PieceType } from "@/lib/generated/prisma/client"
import type { ContentTag } from "@/lib/feed/types"

export type { ContentTag }

const TAG_TO_PRISMA: Record<ContentTag, PieceType> = {
  poem: "POEM",
  story: "STORY",
  essay: "ESSAY",
}

const PRISMA_TO_TAG: Record<PieceType, ContentTag> = {
  POEM: "poem",
  STORY: "story",
  ESSAY: "essay",
}

export function contentTagToPieceType(tag: ContentTag): PieceType {
  return TAG_TO_PRISMA[tag]
}

export function pieceTypeToContentTag(type: PieceType): ContentTag {
  return PRISMA_TO_TAG[type]
}
