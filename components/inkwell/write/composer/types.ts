import type { ContentTag } from "@/lib/feed-data"

export type Visibility = "public" | "followers" | "draft"
export type Phase = "edit" | "preview" | "published"

export type ComposerAuthor = { name: string; handle: string } | null

export type ComposerState = {
  type: ContentTag
  title: string
  bodyHtml: string
  excerpt: string
  excerptOverridden: boolean
  tags: string[]
  tagDraft: string
  visibility: Visibility
  wordCount: number
  savedAgoText: string
  settingsOpen: boolean
  phase: Phase
  publishedPieceId: string | null
  publishError: string | null
  isPublishing: boolean
  popover: { x: number; y: number } | null
}
