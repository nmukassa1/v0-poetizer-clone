import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PromptsPage } from "@/components/inkwell/prompts/prompts-page"
import {
  loadPromptMetadataBySlug,
  loadPromptPageData,
} from "@/lib/prompts/load-prompt-page-data"
import { buildPromptMetadata } from "@/lib/prompts/metadata"

type PromptDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PromptDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const prompt = await loadPromptMetadataBySlug(slug)

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
