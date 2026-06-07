import { prisma } from "@/lib/db"
import { mapCommentRow } from "@/lib/social/map-comment"
import type { PieceCommentView } from "@/lib/social/types"

const commentSelect = {
  id: true,
  body: true,
  createdAt: true,
  profileId: true,
  profile: {
    select: { id: true, name: true, handle: true },
  },
} as const

export async function listCommentsForPiece(
  pieceId: string,
  viewerProfileId?: string,
  limit = 100,
): Promise<PieceCommentView[]> {
  const rows = await prisma.pieceComment.findMany({
    where: { pieceId },
    orderBy: { createdAt: "asc" },
    take: limit,
    select: commentSelect,
  })

  return rows.map((row) => mapCommentRow(row, viewerProfileId))
}
