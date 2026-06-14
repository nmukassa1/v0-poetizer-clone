export function getPromptHref(slug: string): string {
  return `/prompt/${slug}`
}

export function getPromptWriteHref(slug: string): string {
  return `/write?prompt=${slug}&new=1`
}

export function getSubmissionReadHref(
  promptSlug: string,
  submissionId: string,
): string {
  return `/read/${submissionId}`
}
