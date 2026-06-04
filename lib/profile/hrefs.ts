import { getHandleForAuthor } from "./data"

export function getPublicProfileHref(authorName: string): string {
  return `/profile/${getHandleForAuthor(authorName)}`
}

export function getProfileHrefByHandle(handle: string): string {
  return `/profile/${handle}`
}
