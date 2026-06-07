import { redirect } from "next/navigation"
import { Composer } from "@/components/inkwell/write/composer"
import { getCurrentUser } from "@/lib/auth/server"
import { pieceToComposerInitial } from "@/lib/piece/composer"
import {
  getLatestDraftByUserId,
  getPieceByIdForAuthor,
  getProfileByUserId,
} from "@/lib/piece/queries"

export const dynamic = "force-dynamic"

export default async function WritePage({
  searchParams,
}: {
  searchParams: Promise<{ pieceId?: string; new?: string }>
}) {
  const { pieceId, new: newPiece } = await searchParams
  const user = await getCurrentUser()
  const profile = user ? await getProfileByUserId(user.id) : null

  if (profile && !pieceId && newPiece !== "1") {
    const latestDraft = await getLatestDraftByUserId(profile.id)
    if (latestDraft) {
      redirect(`/write?pieceId=${latestDraft.id}`)
    }
  }

  let initialDraft = null
  let draftError: string | null = null
  let publishedPieceId: string | null = null

  if (pieceId && profile) {
    const piece = await getPieceByIdForAuthor(pieceId, profile.id)

    if (!piece) {
      draftError = "Draft not found."
    } else if (piece.status !== "DRAFT") {
      draftError = "This piece is already published."
      publishedPieceId = piece.id
    } else {
      initialDraft = pieceToComposerInitial(piece)
    }
  }

  return (
    <Composer
      author={
        profile
          ? { name: profile.name, handle: profile.handle }
          : null
      }
      initialDraft={initialDraft}
      draftError={draftError}
      publishedPieceId={publishedPieceId}
    />
  )
}
