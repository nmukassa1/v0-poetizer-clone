import { getPromptBySlug } from "@/lib/prompts/registry"

export function resolvePromptSlugForSave(
  inputSlug: string | null | undefined,
  existingSlug: string | null | undefined,
):
  | { ok: true; promptSlug: string | null }
  | { ok: false; error: string } {
  if (existingSlug) {
    return { ok: true, promptSlug: existingSlug }
  }

  if (!inputSlug) {
    return { ok: true, promptSlug: null }
  }

  const prompt = getPromptBySlug(inputSlug)
  if (!prompt) {
    return { ok: false, error: "Unknown prompt." }
  }

  if (prompt.status !== "active") {
    return {
      ok: false,
      error: "This prompt is no longer accepting submissions.",
    }
  }

  return { ok: true, promptSlug: inputSlug }
}
