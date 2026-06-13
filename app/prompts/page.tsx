import { PromptsPage } from "@/components/inkwell/prompts/prompts-page"
import { PromptsEmptyPage } from "@/components/inkwell/prompts/prompts-empty-state"
import { buildPromptsIndexMetadata } from "@/lib/prompts/metadata"
import { getCurrentPromptSlug, getPastPrompts } from "@/lib/prompts/registry"
import { loadPromptPageData } from "@/lib/prompts/load-prompt-page-data"

export const metadata = buildPromptsIndexMetadata()

export default async function PromptsRoutePage() {
  const slug = getCurrentPromptSlug()

  if (!slug) {
    return <PromptsEmptyPage pastPrompts={getPastPrompts()} />
  }

  const data = await loadPromptPageData(slug)

  if (!data) {
    return <PromptsEmptyPage pastPrompts={getPastPrompts()} />
  }

  return <PromptsPage {...data} />
}
