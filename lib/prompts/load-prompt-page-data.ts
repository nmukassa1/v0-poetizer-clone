import { getCurrentUser } from "@/lib/auth/server"
import { pastPrompts, weeklyPrompt } from "@/lib/feed"
import { pieceToFeedPost } from "@/lib/piece/map"
import { listPublishedPiecesByPromptSlug } from "@/lib/piece/queries"
import { attachLikedToFeedPosts } from "@/lib/social"
import { getPromptBySlug } from "@/lib/prompts/registry"
import { promptSubmissionToPiecePost } from "@/lib/prompts/map"

export async function loadPromptPageData(slug: string) {
  const prompt = getPromptBySlug(slug)
  if (!prompt) return null

  const user = await getCurrentUser()

  const [dbPieces] = await Promise.all([
    listPublishedPiecesByPromptSlug(slug),
  ])

  const dbPosts = dbPieces.map(pieceToFeedPost)
  const dbIds = new Set(dbPosts.map((post) => post.id))

  const mockPosts = prompt.submissions
    .filter((submission) => !dbIds.has(submission.id))
    .map((submission) =>
      promptSubmissionToPiecePost(submission, {
        slug: prompt.slug,
        title: prompt.title,
      }),
    )

  const mergedPosts = [...dbPosts, ...mockPosts]
  const submissions = await attachLikedToFeedPosts(mergedPosts, user?.id)

  return {
    prompt: {
      ...prompt,
      count: Math.max(prompt.count, submissions.length),
    },
    pastPrompts,
    currentPrompt: weeklyPrompt,
    activeSlug: slug,
    submissions,
  }
}
