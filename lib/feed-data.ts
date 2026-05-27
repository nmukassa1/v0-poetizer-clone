export type ContentTag = "poem" | "story" | "essay"

export interface Featured {
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
  type: ContentTag
  date: string
  title: string
  author: string
  excerpt: string
  likes: number
  comments: number
  shares: number
}

export type FeedItem = SocialPost | PiecePost

export type FeedFilter = "all" | "pieces" | "posts" | "poems" | "stories"

export const featured: Featured = {
  type: "poem",
  date: "May 21",
  title: "Whispers of Dusk",
  excerpt:
    "Dawn rose like an eerie mist from an unearthly grave,\nI felt a doubt caress my cheek and I tried to ride the wave.\nWaiting for an answer to a question I never asked…",
  author: "Eleanor Vance",
  bio: "Poet · Portland · The Lantern Review",
}

export const weeklyPrompt: WeeklyPrompt = {
  title: "Things left unsaid",
  count: 48,
  days: 3,
  submissions: [
    { title: "Fragments", author: "Sofia Chen", type: "poem", likes: 89, comments: 23 },
    { title: "After the Call", author: "Mara Osei", type: "poem", likes: 37, comments: 9 },
    { title: "Undelivered", author: "Jin Park", type: "story", likes: 54, comments: 17 },
    { title: "Draft No. 7", author: "Lena Müller", type: "essay", likes: 29, comments: 6 },
  ],
}

export const feedItems: FeedItem[] = [
  {
    kind: "social",
    author: "Sofia Chen",
    handle: "sofiac",
    time: "2h",
    text: "There's something about writing a poem at 6am before anyone else is awake that feels like finding a secret room in a house you've lived in for years. Anyway, new piece up.",
    likes: 142,
    comments: 18,
    shares: 31,
  },
  {
    kind: "piece",
    type: "story",
    date: "May 21",
    title: "The Last Train Home",
    author: "James Whitmore",
    excerpt:
      "The station platform stretched endlessly into the fog, its edges softened by the haze that crept in from the harbour. Margaret pulled her coat tighter, watching the empty tracks gleam under the amber lights…",
    likes: 56,
    comments: 14,
    shares: 8,
  },
  {
    kind: "social",
    author: "Theodore Blake",
    handle: "tblake",
    time: "4h",
    text: "Hot take: the best first lines in fiction aren't the ones that grab you. They're the ones that make you feel like you've arrived somewhere you already know. Still thinking about this.",
    likes: 208,
    comments: 44,
    shares: 67,
  },
  {
    kind: "piece",
    type: "poem",
    date: "May 21",
    title: "Saltwater Memory",
    author: "Jin Park",
    excerpt:
      "I left a version of myself\nby the sea that summer —\nshe is still there, I think,\nhands full of cold light\nand the names of fish I never learned…",
    likes: 94,
    comments: 21,
    shares: 12,
  },
  {
    kind: "social",
    author: "Mara Osei",
    handle: "maraosei",
    time: "5h",
    text: "Just submitted to this week's prompt and I have that feeling you get after a long cry — emptied out in the best possible way. Writing about what's unsaid is terrifying. Do it anyway.",
    likes: 311,
    comments: 52,
    shares: 89,
  },
  {
    kind: "piece",
    type: "story",
    date: "May 20",
    title: "The Clockmaker's Daughter",
    author: "Theodore Blake",
    excerpt:
      "Every evening at precisely six o'clock, when the sun painted long shadows across the cobblestones, Eliza would climb the narrow stairs to her father's workshop. Tonight, for the first time in forty years, every clock had stopped…",
    likes: 142,
    comments: 31,
    shares: 24,
  },
  {
    kind: "social",
    author: "Lena Müller",
    handle: "lenaschreibt",
    time: "6h",
    text: "Reminder that editing is not the enemy of the first draft. They are different people doing different jobs. Let the first draft be reckless. Let the edit be ruthless. Don't confuse the two.",
    likes: 477,
    comments: 63,
    shares: 201,
  },
  {
    kind: "piece",
    type: "essay",
    date: "May 20",
    title: "On Writing in a Second Language",
    author: "Lena Müller",
    excerpt:
      "There is a particular grief in reaching for a word and finding only its outline — the shape of the feeling, not the feeling itself. Writing in English, for me, is always an act of translation. Not from German, exactly, but from something pre-verbal…",
    likes: 203,
    comments: 47,
    shares: 55,
  },
  {
    kind: "social",
    author: "Eleanor Vance",
    handle: "eleanorv",
    time: "8h",
    text: "Someone in the comments said my poem reminded them of standing in a cold kitchen at 3am and somehow that is the most accurate thing anyone has ever said about my work.",
    likes: 529,
    comments: 88,
    shares: 134,
  },
  {
    kind: "piece",
    type: "poem",
    date: "May 20",
    title: "Threshold",
    author: "Kwame Asante",
    excerpt:
      "The door was always open\nbut we stood on either side of it\npretending the wind\nhad nothing to do with us —\npretending the distance\nwas a kind of grammar\nwe had both agreed to speak…",
    likes: 167,
    comments: 38,
    shares: 19,
  },
]

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

export function filterFeed(items: FeedItem[], filter: FeedFilter): FeedItem[] {
  if (filter === "all") return items
  if (filter === "pieces") return items.filter((item) => item.kind === "piece")
  if (filter === "posts") return items.filter((item) => item.kind === "social")
  if (filter === "poems")
    return items.filter((item) => item.kind === "piece" && item.type === "poem")
  if (filter === "stories")
    return items.filter((item) => item.kind === "piece" && item.type === "story")
  return items
}
