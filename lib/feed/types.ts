export type ContentTag = "poem" | "story" | "essay"

export interface Featured {
  id?: string
  authorHandle?: string
  type: ContentTag
  date: string
  title: string
  excerpt: string
  author: string
  bio: string
}

export interface PromptSubmission {
  title: string
  author: string
  type: ContentTag
  likes: number
  comments: number
}

export interface WeeklyPrompt {
  title: string
  count: number
  days: number
  submissions: PromptSubmission[]
}

export interface SocialPost {
  kind: "social"
  author: string
  handle: string
  time: string
  text: string
  likes: number
  comments: number
  shares: number
}

export interface PiecePost {
  kind: "piece"
  id: string
  type: ContentTag
  date: string
  title: string
  author: string
  authorHandle: string
  excerpt: string
  likes: number
  comments: number
  shares: number
  likedByMe?: boolean
}

export type FeedItem = SocialPost | PiecePost

export type FeedFilter = "all" | "pieces" | "posts" | "poems" | "stories"
