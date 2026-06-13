import type { PromptStatus, PromptSubmission } from "@/lib/feed"

export type PromptDetail = {
  id: string
  slug: string
  title: string
  description: string
  status: PromptStatus
  count: number
  days?: number
  dateLabel: string
  submissions: PromptSubmission[]
}
