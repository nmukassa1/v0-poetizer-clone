import type { PieceStatus, PieceVisibility } from "@/lib/generated/prisma/client"
import type { PublishPieceInput } from "@/lib/validations/piece"

export type ComposerVisibility = PublishPieceInput["visibility"]

export function visibilityFromInput(
  visibility: ComposerVisibility,
): { status: PieceStatus; visibility: PieceVisibility } {
  if (visibility === "draft") {
    return { status: "DRAFT", visibility: "PRIVATE" }
  }
  if (visibility === "followers") {
    return { status: "PUBLISHED", visibility: "FOLLOWERS" }
  }
  return { status: "PUBLISHED", visibility: "PUBLIC" }
}

export function visibilityToComposerInput(
  status: PieceStatus,
  visibility: PieceVisibility,
): ComposerVisibility {
  if (status === "DRAFT") return "draft"
  if (visibility === "FOLLOWERS") return "followers"
  return "public"
}
