import type { PieceType } from "@/lib/generated/prisma/client"

/** Matches `ContentTag` in `lib/feed-data.ts`. */
export type ContentTag = "poem" | "story" | "essay"

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
