import type { Piece, Profile } from "@/lib/generated/prisma/client"
import type { Featured, PiecePost } from "@/lib/feed/types"
import { pieceTypeToContentTag } from "@/lib/piece/types"

export type PieceWithAuthor = Piece & {
  author: Pick<Profile, "name" | "handle" | "bio" | "location">
}

function formatPieceDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatPieceDateLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function pieceToFeedPost(piece: PieceWithAuthor): PiecePost {
  return {
    kind: "piece",
    id: piece.id,
    type: pieceTypeToContentTag(piece.type),
    date: formatPieceDate(piece.publishedAt ?? piece.createdAt),
    title: piece.title,
    author: piece.author.name,
    authorHandle: piece.author.handle,
    excerpt: piece.excerpt,
    likes: piece.likeCount,
    comments: piece.commentCount,
    shares: piece.shareCount,
  }
}

export function draftToFeedPost(piece: PieceWithAuthor): PiecePost {
  return {
    ...pieceToFeedPost(piece),
    date: `Updated ${formatPieceDate(piece.updatedAt)}`,
  }
}

export function pieceToFeatured(piece: PieceWithAuthor): Featured & { id: string } {
  return {
    id: piece.id,
    type: pieceTypeToContentTag(piece.type),
    date: formatPieceDate(piece.publishedAt ?? piece.createdAt),
    title: piece.title,
    excerpt: piece.excerpt,
    author: piece.author.name,
    authorHandle: piece.author.handle,
    bio: piece.author.bio ?? piece.author.location ?? "Writer on inkwell",
  }
}

export type ReadingRoomPiece = {
  id: string
  type: PiecePost["type"]
  date: string
  title: string
  author: string
  authorBio: string
  authorHandle: string
  authorPieces: number
  bodyHtml: string
  likes: number
  comments: number
  likedByMe?: boolean
}

export function pieceToReadingRoom(
  piece: PieceWithAuthor,
  authorPieces: number,
): ReadingRoomPiece {
  return {
    id: piece.id,
    type: pieceTypeToContentTag(piece.type),
    date: formatPieceDateLong(piece.publishedAt ?? piece.createdAt),
    title: piece.title,
    author: piece.author.name,
    authorBio:
      piece.author.bio ??
      piece.author.location ??
      "Writer on inkwell",
    authorHandle: piece.author.handle,
    authorPieces,
    bodyHtml: piece.body,
    likes: piece.likeCount,
    comments: piece.commentCount,
  }
}
