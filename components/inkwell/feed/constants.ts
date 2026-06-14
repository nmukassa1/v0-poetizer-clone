import type { FeedFilter } from "./types"

export const FEED_FILTERS: { key: FeedFilter; label: string }[] = [
  { key: "poems", label: "Poems" },
  { key: "stories", label: "Stories" },
  { key: "essays", label: "Essays" },
]

export function feedFilterHref(filter: FeedFilter) {
  if (filter === "all") return "/"
  return `/?filter=${filter}`
}

export function getActiveFeedFilter(
  pathname: string,
  filterParam: string | null,
): FeedFilter | null {
  if (pathname !== "/") return null
  if (
    filterParam === "poems" ||
    filterParam === "stories" ||
    filterParam === "essays"
  ) {
    return filterParam
  }
  return "all"
}
