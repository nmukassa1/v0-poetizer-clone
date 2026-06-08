import { prisma } from "@/lib/db"
import type { PieceWithAuthor } from "@/lib/piece/map"

const publishedPublicPieceWhere = {
  status: "PUBLISHED" as const,
  visibility: "PUBLIC" as const,
}

const likedPieceInclude = {
  piece: {
    include: {
      author: {
        select: {
          name: true,
          handle: true,
          bio: true,
          location: true,
        },
      },
    },
  },
} as const

export async function listLikedPiecesForProfile(
  profileId: string,
  limit = 50,
): Promise<PieceWithAuthor[]> {
  const rows = await prisma.pieceLike.findMany({
    where: {
      profileId,
      piece: publishedPublicPieceWhere,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: likedPieceInclude,
  })

  return rows.map((row) => row.piece)
}

export async function getLikedPieceIdsForUser(
  profileId: string,
  pieceIds: string[],
): Promise<Set<string>> {
  if (pieceIds.length === 0) return new Set()

  const rows = await prisma.pieceLike.findMany({
    where: {
      profileId,
      pieceId: { in: pieceIds },
    },
    select: { pieceId: true },
  })

  return new Set(rows.map((row) => row.pieceId))
}

export async function isPieceLikedByUser(
  profileId: string,
  pieceId: string,
): Promise<boolean> {
  const row = await prisma.pieceLike.findUnique({
    where: {
      profileId_pieceId: { profileId, pieceId },
    },
    select: { pieceId: true },
  })
  return Boolean(row)
}
