import { getCurrentUser } from "@/lib/auth/server"
import type { PastPrompt } from "@/lib/feed"
import { pieceToFeedPost } from "@/lib/piece/map"
import { attachLikedToFeedPosts } from "@/lib/social"
import {
  promptToDetail,
  promptToLiveView,
  promptToPastScoreboard,
} from "@/lib/prompts/db-map"
import {
  countPromptSubmissions,
  countSubmissionsForPrompts,
  getActivePromptRecord,
  getPromptRecordBySlug,
  getTopPiecesForPromptSlugs,
  listPromptRecords,
  listPublishedPiecesByPromptSlug,
} from "@/lib/prompts/queries"
import type { LivePromptView } from "@/lib/prompts/types"
import { syncExpiredActivePrompts } from "@/lib/prompts/sync-status"

async function buildScoreboardData(active: Awaited<
  ReturnType<typeof getActivePromptRecord>
>) {
  const allPrompts = await listPromptRecords()
  const archivePrompts = allPrompts.filter(
    (prompt) => prompt.slug !== active?.slug,
  )
  const slugs = archivePrompts.map((prompt) => prompt.slug)

  const [counts, highlights] = await Promise.all([
    countSubmissionsForPrompts(slugs),
    getTopPiecesForPromptSlugs(slugs),
  ])

  const pastPrompts: PastPrompt[] = archivePrompts.map((prompt) =>
    promptToPastScoreboard(
      prompt,
      counts.get(prompt.slug) ?? 0,
      highlights.get(prompt.slug) ?? [],
    ),
  )

  let currentPrompt: LivePromptView | null = null

  if (active) {
    const [activeCount, activePreview] = await Promise.all([
      countPromptSubmissions(active.slug),
      listPublishedPiecesByPromptSlug(active.slug, {
        limit: 4,
        order: "likes",
      }),
    ])
    currentPrompt = promptToLiveView(active, activeCount, activePreview)
  }

  return { pastPrompts, currentPrompt }
}

export async function loadLivePromptForFeed() {
  const active = await getActivePromptRecord()
  if (!active) return null

  const [count, preview] = await Promise.all([
    countPromptSubmissions(active.slug),
    listPublishedPiecesByPromptSlug(active.slug, { limit: 4, order: "likes" }),
  ])

  return promptToLiveView(active, count, preview)
}

export async function loadPromptsIndexPageData() {
  const active = await getActivePromptRecord()

  if (!active) {
    const { pastPrompts, currentPrompt } = await buildScoreboardData(null)
    return { kind: "empty" as const, pastPrompts, currentPrompt }
  }

  const pageData = await loadPromptPageData(active.slug)
  if (!pageData) {
    const { pastPrompts, currentPrompt } = await buildScoreboardData(null)
    return { kind: "empty" as const, pastPrompts, currentPrompt }
  }

  return { kind: "prompt" as const, ...pageData }
}

export async function loadPromptPageData(slug: string) {
  const promptRecord = await getPromptRecordBySlug(slug)
  if (!promptRecord) return null

  const user = await getCurrentUser()
  const active = await getActivePromptRecord()

  const [submissionCount, submissionPieces, scoreboard] = await Promise.all([
    countPromptSubmissions(slug),
    listPublishedPiecesByPromptSlug(slug),
    buildScoreboardData(active),
  ])

  const submissions = await attachLikedToFeedPosts(
    submissionPieces.map(pieceToFeedPost),
    user?.id,
  )

  return {
    prompt: promptToDetail(promptRecord, submissionCount),
    pastPrompts: scoreboard.pastPrompts,
    currentPrompt: scoreboard.currentPrompt,
    activeSlug: slug,
    submissions,
  }
}

export async function loadPromptMetadataBySlug(slug: string) {
  const promptRecord = await getPromptRecordBySlug(slug)
  if (!promptRecord) return null

  const submissionCount = await countPromptSubmissions(slug)
  return promptToDetail(promptRecord, submissionCount)
}

export async function loadAdminPromptsPageData() {
  await syncExpiredActivePrompts()

  const prompts = await listPromptRecords()
  const slugs = prompts.map((prompt) => prompt.slug)
  const counts = await countSubmissionsForPrompts(slugs)

  return prompts.map((prompt) => ({
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    status: prompt.status,
    startsAt: prompt.startsAt.toISOString(),
    endsAt: prompt.endsAt.toISOString(),
    submissionCount: counts.get(prompt.slug) ?? 0,
    createdAt: prompt.createdAt.toISOString(),
    updatedAt: prompt.updatedAt.toISOString(),
  }))
}
