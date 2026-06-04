import type { PieceStatus, PieceVisibility } from "@/lib/generated/prisma/client"
import type { PublishPieceInput } from "@/lib/validations/piece"

export function visibilityFromInput(
  visibility: PublishPieceInput["visibility"],
): { status: PieceStatus; visibility: PieceVisibility } {
  if (visibility === "draft") {
    return { status: "DRAFT", visibility: "PRIVATE" }
  }
  if (visibility === "followers") {
    return { status: "PUBLISHED", visibility: "FOLLOWERS" }
  }
  return { status: "PUBLISHED", visibility: "PUBLIC" }
}
