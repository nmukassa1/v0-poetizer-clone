import type { PiecePost, PromptSubmission } from "@/lib/feed"

export function promptSubmissionToPiecePost(
  submission: PromptSubmission,
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
  }
}
