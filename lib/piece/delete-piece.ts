import { getCurrentUser } from "@/lib/auth/server"
import { getPieceByIdForAuthor } from "@/lib/piece/queries"
import { prisma } from "@/lib/db"

export type DeletePieceResult =
  | { success: true }
  | { success: false; error: string }

export async function deletePiece(pieceId: string): Promise<DeletePieceResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to delete." }
  }

  const existing = await getPieceByIdForAuthor(pieceId, user.id)
  if (!existing) {
    return { success: false, error: "Piece not found." }
  }

  try {
    await prisma.piece.delete({ where: { id: pieceId } })
    return { success: true }
  } catch (error) {
    console.error("[deletePiece]", error)
    return { success: false, error: "Could not delete this piece. Please try again." }
  }
}
