import { PromptsPage } from "@/components/inkwell/prompts/prompts-page"
import { PromptsEmptyPage } from "@/components/inkwell/prompts/prompts-empty-state"
import { buildPromptsIndexMetadata } from "@/lib/prompts/metadata"
import { loadPromptsIndexPageData } from "@/lib/prompts/load-prompt-page-data"

export const metadata = buildPromptsIndexMetadata()

export default async function PromptsRoutePage() {
  const data = await loadPromptsIndexPageData()

  if (data.kind === "empty") {
    return (
      <PromptsEmptyPage pastPrompts={data.pastPrompts} />
    )
  }

  return <PromptsPage {...data} />
}
