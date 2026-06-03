import type { Piece, Profile } from "@/lib/generated/prisma/client"
import type { PiecePost } from "@/lib/feed-data"
import { pieceTypeToContentTag } from "@/lib/piece/types"

export type PieceWithAuthor = Piece & { author: Pick<Profile, "name" | "handle"> }

function formatPieceDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function pieceToFeedPost(piece: PieceWithAuthor): PiecePost {
  return {
    kind: "piece",
    type: pieceTypeToContentTag(piece.type),
    date: formatPieceDate(piece.publishedAt ?? piece.createdAt),
    title: piece.title,
    author: piece.author.name,
    excerpt: piece.excerpt,
    likes: piece.likeCount,
    comments: piece.commentCount,
    shares: piece.shareCount,
  }
}
