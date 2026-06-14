import type { Prompt } from "@/lib/generated/prisma/client"
import type { PastPrompt, PromptSubmission } from "@/lib/feed"
import type { PieceWithAuthor } from "@/lib/piece/map"
import { pieceTypeToContentTag } from "@/lib/piece/types"
import { dbPromptStatusToUi } from "@/lib/prompts/status"
import type {
  AdminPromptRow,
  LivePromptView,
  PromptDetail,
} from "@/lib/prompts/types"

function formatPromptDay(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatPromptDateLabel(startsAt: Date, endsAt: Date): string {
  return `${formatPromptDay(startsAt)} – ${formatPromptDay(endsAt)}`
}

export function daysUntilPromptEnd(endsAt: Date, now = new Date()): number {
  const ms = endsAt.getTime() - now.getTime()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export function pieceToPromptSubmission(piece: PieceWithAuthor): PromptSubmission {
  return {
    id: piece.id,
    title: piece.title,
    author: piece.author.name,
    authorHandle: piece.author.handle,
    type: pieceTypeToContentTag(piece.type),
    date: formatPromptDay(piece.publishedAt ?? piece.createdAt),
    excerpt: piece.excerpt,
    likes: piece.likeCount,
    comments: piece.commentCount,
  }
}

export function promptToDetail(
  prompt: Prompt,
  submissionCount: number,
  now = new Date(),
): PromptDetail {
  const status = dbPromptStatusToUi(prompt.status)

  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    status,
    count: submissionCount,
    days: status === "active" ? daysUntilPromptEnd(prompt.endsAt, now) : undefined,
    dateLabel: formatPromptDateLabel(prompt.startsAt, prompt.endsAt),
  }
}

export function promptToLiveView(
  prompt: Prompt,
  submissionCount: number,
  previewPieces: PieceWithAuthor[],
  now = new Date(),
): LivePromptView {
  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    count: submissionCount,
    days: daysUntilPromptEnd(prompt.endsAt, now),
    startsAt: formatPromptDay(prompt.startsAt),
    endsAt: formatPromptDay(prompt.endsAt),
    submissions: previewPieces.map(pieceToPromptSubmission),
  }
}

export function promptToPastScoreboard(
  prompt: Prompt,
  submissionCount: number,
  highlights: PieceWithAuthor[],
): PastPrompt {
  const top = highlights[0]
  const runnerUp = highlights[1]

  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    dateLabel: formatPromptDay(prompt.startsAt),
    status: dbPromptStatusToUi(prompt.status),
    submissionCount,
    topSubmission: top
      ? {
          title: top.title,
          author: top.author.name,
          likes: top.likeCount,
        }
      : undefined,
    runnerUp: runnerUp
      ? {
          title: runnerUp.title,
          author: runnerUp.author.name,
          likes: runnerUp.likeCount,
        }
      : undefined,
  }
}

export function promptToAdminRow(
  prompt: Prompt,
  submissionCount: number,
): AdminPromptRow {
  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    status: dbPromptStatusToUi(prompt.status),
    startsAt: prompt.startsAt.toISOString(),
    endsAt: prompt.endsAt.toISOString(),
    submissionCount,
    createdAt: prompt.createdAt.toISOString(),
    updatedAt: prompt.updatedAt.toISOString(),
  }
}

export function promptToMetadataInput(prompt: Prompt, submissionCount: number) {
  return promptToDetail(prompt, submissionCount)
}
