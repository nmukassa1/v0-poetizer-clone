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
}

export type LivePromptView = {
  id: string
  slug: string
  title: string
  description: string
  count: number
  days: number
  startsAt: string
  endsAt: string
  submissions: PromptSubmission[]
}

export type AdminPromptRow = {
  id: string
  slug: string
  title: string
  description: string
  status: PromptStatus
  startsAt: string
  endsAt: string
  submissionCount: number
  createdAt: string
  updatedAt: string
}
