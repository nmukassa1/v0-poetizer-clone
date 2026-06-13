import { getCurrentUser } from "@/lib/auth/server"
import { pastPrompts, weeklyPrompt } from "@/lib/feed"
import { attachLikedToFeedPosts } from "@/lib/social"
import {
  getPromptBySlug,
} from "@/lib/prompts/registry"
import { promptSubmissionToPiecePost } from "@/lib/prompts/map"

export async function loadPromptPageData(slug: string) {
  const prompt = getPromptBySlug(slug)
  if (!prompt) return null

  const user = await getCurrentUser()

  const submissions = await attachLikedToFeedPosts(
    prompt.submissions.map((submission) =>
      promptSubmissionToPiecePost(submission, {
        slug: prompt.slug,
        title: prompt.title,
      }),
    ),
    user?.id,
  )

  return {
    prompt,
    pastPrompts,
    currentPrompt: weeklyPrompt,
    activeSlug: slug,
    submissions,
  }
}
