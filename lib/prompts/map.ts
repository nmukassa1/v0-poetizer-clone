import type { PiecePost, PiecePrompt, PromptSubmission } from "@/lib/feed"

export function promptSubmissionToPiecePost(
  submission: PromptSubmission,
  prompt?: PiecePrompt,
): PiecePost {
  return {
    kind: "piece",
    id: submission.id,
    type: submission.type,
    date: submission.date,
    title: submission.title,
    author: submission.author,
    authorHandle: submission.authorHandle,
    excerpt: submission.excerpt,
    likes: submission.likes,
    comments: submission.comments,
    shares: 0,
    prompt,
  }
}
