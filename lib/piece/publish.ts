import { getCurrentUser } from "@/lib/auth/server"
import { excerptFromBody } from "@/lib/piece/excerpt"
import { visibilityFromInput } from "@/lib/piece/visibility"
import { contentTagToPieceType } from "@/lib/piece/types"
import { resolvePromptSlugForSave } from "@/lib/prompts/resolve-prompt-slug"
import { prisma } from "@/lib/db"
import { publishPieceSchema } from "@/lib/validations/piece"

export type PublishPieceResult =
  | { success: true; pieceId: string; status: "DRAFT" | "PUBLISHED" }
  | { success: false; error: string; fieldErrors?: Record<string, string[] | undefined> }

export async function publishPiece(
  input: unknown,
): Promise<PublishPieceResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "You must be signed in to publish." }
  }

  const parsed = publishPieceSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
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

  const { title, body, type, excerpt, visibility, tags, promptSlug } = parsed.data
  const { status, visibility: pieceVisibility } = visibilityFromInput(visibility)
  const excerptText = excerpt?.trim() || excerptFromBody(body)

  const resolvedPrompt = resolvePromptSlugForSave(promptSlug, null)
  if (!resolvedPrompt.ok) {
    return { success: false, error: resolvedPrompt.error }
  }

  try {
    const piece = await prisma.piece.create({
      data: {
        title,
        body,
        excerpt: excerptText,
        type: contentTagToPieceType(type),
        status,
        visibility: pieceVisibility,
        tags,
        promptSlug: resolvedPrompt.promptSlug,
        authorId: profile.id,
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
    console.error("[publishPiece]", error)
    return {
      success: false,
      error: "Could not save your piece. Please try again.",
    }
  }
}
