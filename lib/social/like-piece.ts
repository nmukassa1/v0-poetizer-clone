import { getCurrentUser } from "@/lib/auth/server"
import { prisma } from "@/lib/db"

export type LikePieceResult =
  | { success: true; likeCount: number; likedByMe: boolean }
  | { success: false; error: string }

const publishedPublicWhere = {
  status: "PUBLISHED" as const,
  visibility: "PUBLIC" as const,
}

async function getLikeablePiece(pieceId: string) {
  return prisma.piece.findFirst({
    where: { id: pieceId, ...publishedPublicWhere },
    select: { id: true, likeCount: true },
  })
}

export async function likePiece(pieceId: string): Promise<LikePieceResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to like pieces." }
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true },
  })
  if (!profile) {
    return {
      success: false,
      error: "Profile not found. Try signing out and back in.",
    }
  }

  const piece = await getLikeablePiece(pieceId)
  if (!piece) {
    return { success: false, error: "Piece not found." }
  }

  const existing = await prisma.pieceLike.findUnique({
    where: {
      profileId_pieceId: { profileId: profile.id, pieceId },
    },
    select: { pieceId: true },
  })

  if (existing) {
    return {
      success: true,
      likeCount: piece.likeCount,
      likedByMe: true,
    }
  }

  try {
    const updated = await prisma.$transaction(async (tx) => {
      await tx.pieceLike.create({
        data: { profileId: profile.id, pieceId },
      })
      return tx.piece.update({
        where: { id: pieceId },
        data: { likeCount: { increment: 1 } },
        select: { likeCount: true },
      })
    })

    return {
      success: true,
      likeCount: updated.likeCount,
      likedByMe: true,
    }
  } catch (error) {
    console.error("[likePiece]", error)
    return { success: false, error: "Could not like this piece. Please try again." }
  }
}

export async function unlikePiece(pieceId: string): Promise<LikePieceResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to unlike pieces." }
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true },
  })
  if (!profile) {
    return {
      success: false,
      error: "Profile not found. Try signing out and back in.",
    }
  }

  const piece = await getLikeablePiece(pieceId)
  if (!piece) {
    return { success: false, error: "Piece not found." }
  }

  try {
    const updated = await prisma.$transaction(async (tx) => {
      const removed = await tx.pieceLike.deleteMany({
        where: { profileId: profile.id, pieceId },
      })

      if (removed.count === 0) {
        return tx.piece.findUniqueOrThrow({
          where: { id: pieceId },
          select: { likeCount: true },
        })
      }

      return tx.piece.update({
        where: { id: pieceId },
        data: { likeCount: { decrement: 1 } },
        select: { likeCount: true },
      })
    })

    return {
      success: true,
      likeCount: Math.max(0, updated.likeCount),
      likedByMe: false,
    }
  } catch (error) {
    console.error("[unlikePiece]", error)
    return {
      success: false,
      error: "Could not unlike this piece. Please try again.",
    }
  }
}
