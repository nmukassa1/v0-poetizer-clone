import type { BrowseFilter } from "./types"

export const BROWSE_FILTERS: { key: BrowseFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Short stories" },
  { key: "essays", label: "Essays" },
]
