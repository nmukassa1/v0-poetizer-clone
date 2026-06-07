import { prisma } from "@/lib/db"

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
