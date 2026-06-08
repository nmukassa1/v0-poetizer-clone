import type { ContentTag } from "@/lib/feed/types"

export const WRITER_SPOTLIGHT_HANDLE = "eleanorv"

export type WriterSpotlightData = {
  name: string
  handle: string
  location: string
  bio: string
  pieceCount: number
  followerCountLabel: string
  canFollow: boolean
  initialFollowing: boolean
  featured: {
    id: string
    type: ContentTag
    title: string
    excerpt: string
  } | null
}

export const FALLBACK_WRITER_SPOTLIGHT: WriterSpotlightData = {
  name: "Eleanor Vance",
  handle: "eleanorv",
  location: "Portland, OR",
  bio: "Editor of The Lantern Review. Writes at the edge of dusk, the seam of the day where memory loosens.",
  pieceCount: 3,
  followerCountLabel: "284",
  canFollow: false,
  initialFollowing: false,
  featured: {
    id: "seed-piece-whispers-of-dusk",
    type: "poem",
    title: "Whispers of Dusk",
    excerpt:
      "Dawn rose like an eerie mist from an unearthly grave…",
  },
}
