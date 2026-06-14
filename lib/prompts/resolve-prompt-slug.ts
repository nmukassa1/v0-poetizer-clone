import { getPromptRecordBySlug } from "@/lib/prompts/queries"
import {
  isPromptAcceptingSubmissions,
  syncExpiredActivePrompts,
} from "@/lib/prompts/sync-status"

export async function resolvePromptSlugForSave(
  inputSlug: string | null | undefined,
  existingSlug: string | null | undefined,
): Promise<
  | { ok: true; promptSlug: string | null }
  | { ok: false; error: string }
> {
  if (existingSlug) {
    return { ok: true, promptSlug: existingSlug }
  }

  if (!inputSlug) {
    return { ok: true, promptSlug: null }
  }

  await syncExpiredActivePrompts()

  const prompt = await getPromptRecordBySlug(inputSlug)
  if (!prompt) {
    return { ok: false, error: "Unknown prompt." }
  }

  if (!isPromptAcceptingSubmissions(prompt)) {
    return {
      ok: false,
      error: "This prompt is no longer accepting submissions.",
    }
  }

  return { ok: true, promptSlug: inputSlug }
}

export async function getLinkedPromptForComposer(slug: string | null | undefined) {
  if (!slug) return null

  await syncExpiredActivePrompts()

  const prompt = await getPromptRecordBySlug(slug)
  if (!prompt || !isPromptAcceptingSubmissions(prompt)) return null

  return {
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    status: prompt.status,
  }
}
