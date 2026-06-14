import type { Metadata } from "next"
import type { PromptDetail } from "./types"

function promptMetaTitle(prompt: PromptDetail): string {
  switch (prompt.status) {
    case "active":
      return `This week: ${prompt.title}`
    case "voting":
      return `Voting: ${prompt.title}`
    case "closed":
      return `Past prompt: ${prompt.title}`
  }
}

function promptMetaDescription(prompt: PromptDetail): string {
  const submissionsLabel = `${prompt.count} submission${prompt.count === 1 ? "" : "s"}`

  if (prompt.status === "active" && prompt.days != null) {
    return `${prompt.description} ${submissionsLabel} · ${prompt.days} days left to write.`
  }

  return `${prompt.description} ${submissionsLabel} on inkwell.`
}

export function buildPromptMetadata(prompt: PromptDetail): Metadata {
  const title = promptMetaTitle(prompt)

  return {
    title: `${title} | inkwell`,
    description: promptMetaDescription(prompt),
    openGraph: {
      title,
      description: prompt.description,
      type: "website",
    },
  }
}

export function buildPromptsIndexMetadata(): Metadata {
  return {
    title: "Prompts | inkwell",
    description:
      "Weekly writing prompts — read submissions and write your response on inkwell.",
    openGraph: {
      title: "Weekly writing prompts",
      description:
        "Read community responses and write to the live prompt on inkwell.",
      type: "website",
    },
  }
}
