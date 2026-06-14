import type { Featured } from "./types"

export const featured: Featured = {
  type: "poem",
  date: "May 21",
  title: "Whispers of Dusk",
  excerpt:
    "Dawn rose like an eerie mist from an unearthly grave,\nI felt a doubt caress my cheek and I tried to ride the wave.\nWaiting for an answer to a question I never asked…",
  author: "Eleanor Vance",
  bio: "Poet · Portland · The Lantern Review",
}

export const trendingWriters = [
  { name: "Sofia Chen", handle: "sofiac", bio: "Poet · San Francisco", followers: "2.4k", pieces: 38 },
  { name: "Kwame Asante", handle: "kwamea", bio: "Fiction · Accra / London", followers: "1.8k", pieces: 22 },
  { name: "Mara Osei", handle: "maraosei", bio: "Poet & essayist", followers: "3.1k", pieces: 51 },
]

export const lovedPieces = [
  { title: "Fragments", author: "Sofia Chen", type: "poem" as const, likes: 891, excerpt: "In the space between heartbeats, where silence learns to speak…" },
  { title: "The Clockmaker's Daughter", author: "Theodore Blake", type: "story" as const, likes: 742, excerpt: "Every evening at precisely six o'clock, when the sun painted long shadows…" },
  { title: "On Writing in a Second Language", author: "Lena Müller", type: "essay" as const, likes: 603, excerpt: "There is a particular grief in reaching for a word and finding only its outline…" },
  { title: "Threshold", author: "Kwame Asante", type: "poem" as const, likes: 567, excerpt: "The door was always open but we stood on either side of it…" },
]

export const quoteOfDay = {
  text: "The first draft is just you telling yourself the story.",
  author: "Terry Pratchett",
}
