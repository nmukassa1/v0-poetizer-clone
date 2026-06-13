import type { ContentTag, PastPrompt, PromptSubmission, WeeklyPrompt } from "@/lib/feed"
import { pastPrompts, weeklyPrompt } from "@/lib/feed"
import type { PromptDetail } from "./types"

function weeklyPromptToDetail(prompt: WeeklyPrompt): PromptDetail {
  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    status: "active",
    count: prompt.count,
    days: prompt.days,
    dateLabel: `${prompt.startsAt} – ${prompt.endsAt}`,
    submissions: prompt.submissions,
  }
}

function submissionFromHighlight(
  prompt: PastPrompt,
  entry: { title: string; author: string; likes: number },
  suffix: string,
  type: ContentTag = "poem",
): PromptSubmission {
  return {
    id: `${prompt.slug}-${suffix}`,
    title: entry.title,
    author: entry.author,
    authorHandle: entry.author.toLowerCase().replace(/\s+/g, ""),
    type,
    date: prompt.dateLabel,
    excerpt: `A response to “${prompt.title}.”`,
    likes: entry.likes,
    comments: Math.max(1, Math.round(entry.likes / 8)),
  }
}

function pastPromptToDetail(prompt: PastPrompt): PromptDetail {
  const submissions: PromptSubmission[] = []

  if (prompt.topSubmission) {
    submissions.push(
      submissionFromHighlight(prompt, prompt.topSubmission, "top"),
    )
  }
  if (prompt.runnerUp) {
    submissions.push(
      submissionFromHighlight(prompt, prompt.runnerUp, "runner-up", "story"),
    )
  }

  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description:
      prompt.description ??
      `Writers responded to the prompt “${prompt.title}.”`,
    status: prompt.status,
    count: prompt.submissionCount,
    dateLabel: prompt.dateLabel,
    submissions,
  }
}

export function getCurrentPrompt(): WeeklyPrompt {
  return weeklyPrompt
}

export function getCurrentPromptSlug(): string {
  return weeklyPrompt.slug
}

export function getPastPrompts(): PastPrompt[] {
  return pastPrompts
}

export function getPromptBySlug(slug: string): PromptDetail | null {
  if (weeklyPrompt.slug === slug) {
    return weeklyPromptToDetail(weeklyPrompt)
  }

  const past = pastPrompts.find((entry) => entry.slug === slug)
  if (!past) return null

  return pastPromptToDetail(past)
}

export function getPromptHref(slug: string): string {
  return `/prompt/${slug}`
}

export function getPromptWriteHref(slug: string): string {
  return `/write?prompt=${slug}&new=1`
}
