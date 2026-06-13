import { redirect } from "next/navigation"
import { Composer } from "@/components/inkwell/write/composer"
import type { ComposerLinkedPrompt } from "@/components/inkwell/write/composer/types"
import { getCurrentUser } from "@/lib/auth/server"
import { pieceToComposerInitial } from "@/lib/piece/composer"
import {
  getLatestDraftByUserId,
  getPieceByIdForAuthor,
  getProfileByUserId,
} from "@/lib/piece/queries"
import { getPromptBySlug } from "@/lib/prompts/registry"

export const dynamic = "force-dynamic"

function resolveLinkedPrompt(options: {
  promptParam?: string
  piecePromptSlug?: string | null
}): ComposerLinkedPrompt | null {
  const slug = options.piecePromptSlug ?? options.promptParam
  if (!slug) return null

  const prompt = getPromptBySlug(slug)
  if (!prompt) return null

  if (!options.piecePromptSlug && prompt.status !== "active") {
    return null
  }

  return {
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
  }
}

export default async function WritePage({
  searchParams,
}: {
  searchParams: Promise<{ pieceId?: string; new?: string; prompt?: string }>
}) {
  const { pieceId, new: newPiece, prompt: promptParam } = await searchParams
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
  let piecePromptSlug: string | null = null

  if (pieceId && profile) {
    const piece = await getPieceByIdForAuthor(pieceId, profile.id)

    if (!piece) {
      draftError = "Draft not found."
    } else if (piece.status !== "DRAFT") {
      draftError = "This piece is already published."
      publishedPieceId = piece.id
    } else {
      initialDraft = pieceToComposerInitial(piece)
      piecePromptSlug = piece.promptSlug
    }
  }

  const linkedPrompt = resolveLinkedPrompt({
    promptParam,
    piecePromptSlug: piecePromptSlug ?? initialDraft?.promptSlug,
  })

  return (
    <Composer
      author={
        profile
          ? { name: profile.name, handle: profile.handle }
          : null
      }
      initialDraft={initialDraft}
      linkedPrompt={linkedPrompt}
      draftError={draftError}
      publishedPieceId={publishedPieceId}
    />
  )
}
