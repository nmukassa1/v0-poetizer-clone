import type { ContentTag } from "@/lib/feed-data"
import type { Visibility } from "./types"

export const CONTENT_TYPES: {
  id: ContentTag
  label: string
  placeholder: string
}[] = [
  { id: "poem", label: "Poem", placeholder: "Begin your verse…" },
  { id: "story", label: "Story", placeholder: "It begins…" },
  { id: "essay", label: "Essay", placeholder: "Begin here…" },
]

export const VISIBILITIES: { id: Visibility; label: string; hint: string }[] = [
  { id: "public", label: "Public", hint: "Anyone can read" },
  { id: "followers", label: "Followers", hint: "Only people who follow you" },
  { id: "draft", label: "Draft", hint: "Only visible to you" },
]
