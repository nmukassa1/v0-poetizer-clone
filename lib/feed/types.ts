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

export type PromptStatus = "active" | "voting" | "closed"

export interface PromptSubmission {
  id: string
  title: string
  author: string
  authorHandle: string
  type: ContentTag
  excerpt: string
  date: string
  likes: number
  comments: number
}

export interface PiecePrompt {
  slug: string
  title: string
}

export interface WeeklyPrompt {
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

export interface PastPrompt {
  id: string
  slug: string
  title: string
  description?: string
  dateLabel: string
  status: PromptStatus
  submissionCount: number
  topSubmission?: {
    title: string
    author: string
    likes: number
  }
  runnerUp?: {
    title: string
    author: string
    likes: number
  }
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
  prompt?: PiecePrompt
}

export type FeedItem = SocialPost | PiecePost

export type FeedFilter = "all" | "pieces" | "posts" | "poems" | "stories"
