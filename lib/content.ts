export type ContentType = "poem" | "story"

export interface ContentItem {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  date: string
  type: ContentType
  likes: number
  comments: number
}
