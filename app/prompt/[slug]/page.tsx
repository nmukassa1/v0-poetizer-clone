import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PromptsPage } from "@/components/inkwell/prompts/prompts-page"
import { loadPromptPageData } from "@/lib/prompts/load-prompt-page-data"
import { buildPromptMetadata } from "@/lib/prompts/metadata"
import { getPromptBySlug } from "@/lib/prompts/registry"

type PromptDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PromptDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const prompt = getPromptBySlug(slug)

  if (!prompt) {
    return { title: "Prompt not found | inkwell" }
  }

  return buildPromptMetadata(prompt)
}

export default async function PromptDetailRoutePage({
  params,
}: PromptDetailPageProps) {
  const { slug } = await params
  const data = await loadPromptPageData(slug)

  if (!data) {
    notFound()
  }

  return <PromptsPage {...data} />
}
