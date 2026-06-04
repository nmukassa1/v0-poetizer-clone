import type { FeedFilter } from "./types"

export const FEED_FILTERS: { key: FeedFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Stories" },
  { key: "essays", label: "Essays" },
]
