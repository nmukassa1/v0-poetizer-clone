import { getCurrentUser } from "@/lib/auth/server"
import { prisma } from "@/lib/db"
import { mapCommentRow } from "@/lib/social/map-comment"
import type { PieceCommentView } from "@/lib/social/types"

export type CommentPieceResult =
  | { success: true; comment: PieceCommentView; commentCount: number }
  | { success: false; error: string }

export type DeleteCommentResult =
  | { success: true; commentCount: number }
  | { success: false; error: string }

const publishedPublicWhere = {
  status: "PUBLISHED" as const,
  visibility: "PUBLIC" as const,
}

const MAX_COMMENT_LENGTH = 2000

export function normalizeCommentBody(body: unknown): string | null {
  if (typeof body !== "string") return null
  const trimmed = body.trim()
  if (trimmed.length === 0) return null
  if (trimmed.length > MAX_COMMENT_LENGTH) return null
  return trimmed
}

async function getCommentablePiece(pieceId: string) {
  return prisma.piece.findFirst({
    where: { id: pieceId, ...publishedPublicWhere },
    select: { id: true, commentCount: true },
  })
}

export async function createComment(
  pieceId: string,
  body: unknown,
): Promise<CommentPieceResult> {
  const normalized = normalizeCommentBody(body)
  if (!normalized) {
    return {
      success: false,
      error: `Comment must be 1–${MAX_COMMENT_LENGTH} characters.`,
    }
  }

  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to comment." }
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, handle: true },
  })
  if (!profile) {
    return {
      success: false,
      error: "Profile not found. Try signing out and back in.",
    }
  }

  const piece = await getCommentablePiece(pieceId)
  if (!piece) {
    return { success: false, error: "Piece not found." }
  }

  try {
    const created = await prisma.$transaction(async (tx) => {
      const comment = await tx.pieceComment.create({
        data: {
          pieceId,
          profileId: profile.id,
          body: normalized,
        },
        select: {
          id: true,
          body: true,
          createdAt: true,
          profileId: true,
          profile: {
            select: { id: true, name: true, handle: true },
          },
        },
      })

      const updated = await tx.piece.update({
        where: { id: pieceId },
        data: { commentCount: { increment: 1 } },
        select: { commentCount: true },
      })

      return { comment, commentCount: updated.commentCount }
    })

    return {
      success: true,
      comment: mapCommentRow(created.comment, profile.id),
      commentCount: created.commentCount,
    }
  } catch (error) {
    console.error("[createComment]", error)
    return {
      success: false,
      error: "Could not post your comment. Please try again.",
    }
  }
}

export async function deleteComment(
  pieceId: string,
  commentId: string,
): Promise<DeleteCommentResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to delete comments." }
  }

  const comment = await prisma.pieceComment.findFirst({
    where: { id: commentId, pieceId },
    select: { id: true, profileId: true },
  })

  if (!comment) {
    return { success: false, error: "Comment not found." }
  }

  if (comment.profileId !== user.id) {
    return { success: false, error: "You can only delete your own comments." }
  }

  try {
    const updated = await prisma.$transaction(async (tx) => {
      await tx.pieceComment.delete({ where: { id: commentId } })

      const piece = await tx.piece.update({
        where: { id: pieceId },
        data: { commentCount: { decrement: 1 } },
        select: { commentCount: true },
      })

      return piece
    })

    return {
      success: true,
      commentCount: Math.max(0, updated.commentCount),
    }
  } catch (error) {
    console.error("[deleteComment]", error)
    return {
      success: false,
      error: "Could not delete this comment. Please try again.",
    }
  }
}
