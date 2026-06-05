import { getCurrentUser } from "@/lib/auth/server"
import { excerptFromBody } from "@/lib/piece/excerpt"
import { getPieceByIdForAuthor } from "@/lib/piece/queries"
import type { PublishPieceResult } from "@/lib/piece/publish"
import { contentTagToPieceType } from "@/lib/piece/types"
import { visibilityFromInput } from "@/lib/piece/visibility"
import { prisma } from "@/lib/db"
import { publishPieceSchema } from "@/lib/validations/piece"

export async function updatePiece(
  pieceId: string,
  input: unknown,
): Promise<PublishPieceResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to save." }
  }

  const parsed = publishPieceSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const existing = await getPieceByIdForAuthor(pieceId, user.id)
  if (!existing) {
    return { success: false, error: "Piece not found." }
  }

  if (existing.status !== "DRAFT") {
    return {
      success: false,
      error: "Published pieces cannot be edited here yet.",
    }
  }

  const { title, body, type, excerpt, visibility, tags } = parsed.data
  const { status, visibility: pieceVisibility } = visibilityFromInput(visibility)
  const excerptText = excerpt?.trim() || excerptFromBody(body)

  try {
    const piece = await prisma.piece.update({
      where: { id: pieceId },
      data: {
        title,
        body,
        excerpt: excerptText,
        type: contentTagToPieceType(type),
        status,
        visibility: pieceVisibility,
        tags,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
      select: { id: true, status: true },
    })

    return {
      success: true,
      pieceId: piece.id,
      status: piece.status,
    }
  } catch (error) {
    console.error("[updatePiece]", error)
    return {
      success: false,
      error: "Could not save your piece. Please try again.",
    }
  }
}
