import { PromptsPage } from "@/components/inkwell/prompts/prompts-page"
import { getCurrentPromptSlug } from "@/lib/prompts/registry"
import { loadPromptPageData } from "@/lib/prompts/load-prompt-page-data"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Prompts | inkwell",
  description:
    "Weekly writing prompts — read submissions and write your response on inkwell.",
}

export default async function PromptsRoutePage() {
  const data = await loadPromptPageData(getCurrentPromptSlug())

  if (!data) {
    redirect("/")
  }

  return <PromptsPage {...data} />
}
