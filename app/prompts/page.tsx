import { PromptsPage } from "@/components/inkwell/prompts/prompts-page"
import { pastPrompts, weeklyPrompt } from "@/lib/feed"
import { promptSubmissionToPiecePost } from "@/lib/prompts/map"
import { getCurrentUser } from "@/lib/auth/server"
import { attachLikedToFeedPosts } from "@/lib/social"

export const metadata = {
  title: "Prompts | inkwell",
  description:
    "Weekly writing prompts — read submissions and write your response on inkwell.",
}

export default async function PromptsRoutePage() {
  const user = await getCurrentUser()

  const submissions = await attachLikedToFeedPosts(
    weeklyPrompt.submissions.map(promptSubmissionToPiecePost),
    user?.id,
  )

  return (
    <PromptsPage
      currentPrompt={weeklyPrompt}
      pastPrompts={pastPrompts}
      submissions={submissions}
    />
  )
}
