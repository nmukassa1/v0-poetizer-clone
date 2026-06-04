"use server"

import { publishPiece, type PublishPieceResult } from "@/lib/piece/publish"

export type { PublishPieceResult }

export async function publishPieceAction(
  input: unknown,
): Promise<PublishPieceResult> {
  return publishPiece(input)
}
