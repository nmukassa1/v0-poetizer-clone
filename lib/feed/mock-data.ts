import type { FeedItem, Featured, PastPrompt, WeeklyPrompt } from "./types"

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
  id: "prompt-2026-w24",
  slug: "things-left-unsaid",
  title: "Things left unsaid",
  description:
    "Write about what was never spoken — the letter you never sent, the apology that stayed in your throat, the truth you chose to bury. Poems, stories, and essays welcome.",
  count: 48,
  days: 3,
  startsAt: "Jun 7",
  endsAt: "Jun 14",
  submissions: [
    {
      id: "mock-fragments",
      title: "Fragments",
      author: "Sofia Chen",
      authorHandle: "sofiac",
      type: "poem",
      date: "Jun 9",
      excerpt:
        "In the space between heartbeats,\nwhere silence learns to speak,\nI find the words I never said —\nturning over like stones in a river.",
      likes: 89,
      comments: 23,
    },
    {
      id: "mock-after-the-call",
      title: "After the Call",
      author: "Mara Osei",
      authorHandle: "maraosei",
      type: "poem",
      date: "Jun 8",
      excerpt:
        "The phone went cold in my hand\nbefore I could say\nwhat I'd rehearsed for weeks.",
      likes: 37,
      comments: 9,
    },
    {
      id: "mock-undelivered",
      title: "Undelivered",
      author: "Jin Park",
      authorHandle: "jinpark",
      type: "story",
      date: "Jun 8",
      excerpt:
        "The envelope sat in her desk drawer for eleven years, its flap still unsealed. She had written it the night he left, every sentence a small demolition.",
      likes: 54,
      comments: 17,
    },
    {
      id: "mock-draft-no-7",
      title: "Draft No. 7",
      author: "Lena Müller",
      authorHandle: "lenaschreibt",
      type: "essay",
      date: "Jun 7",
      excerpt:
        "There is a particular grief in reaching for a word and finding only its outline — the shape of the feeling, not the feeling itself.",
      likes: 29,
      comments: 6,
    },
    {
      id: "mock-unspoken",
      title: "What I Meant to Tell You",
      author: "Kwame Asante",
      authorHandle: "kwamea",
      type: "poem",
      date: "Jun 9",
      excerpt:
        "I kept your name in my mouth\nlike a prayer I was afraid to finish —\nuntil the silence finished it for me.",
      likes: 61,
      comments: 14,
    },
    {
      id: "mock-voicemail",
      title: "Voicemail, Unsent",
      author: "Theodore Blake",
      authorHandle: "tblake",
      type: "story",
      date: "Jun 10",
      excerpt:
        "He recorded it three times. Deleted the first two. On the third, his voice cracked on the word 'sorry' and he hung up before the beep.",
      likes: 43,
      comments: 11,
    },
  ],
}

export const pastPrompts: PastPrompt[] = [
  {
    id: "prompt-2026-w23",
    slug: "first-light",
    title: "First light",
    description:
      "Write about the first moments of day — dawn breaking, a room filling with light, the hour before anyone else wakes.",
    dateLabel: "May 31",
    status: "closed",
    submissionCount: 62,
    topSubmission: { title: "Dawn Chorus", author: "Eleanor Vance", likes: 124 },
    runnerUp: { title: "Before Anyone Wakes", author: "James Whitmore", likes: 98 },
  },
  {
    id: "prompt-2026-w22",
    slug: "a-door-left-open",
    title: "A door left open",
    description:
      "Write about thresholds — what you walked toward, what you left behind, or the choice not to close the door.",
    dateLabel: "May 24",
    status: "closed",
    submissionCount: 55,
    topSubmission: { title: "Threshold", author: "Kwame Asante", likes: 167 },
    runnerUp: { title: "The Hinge", author: "Sofia Chen", likes: 112 },
  },
  {
    id: "prompt-2026-w21",
    slug: "salt-and-memory",
    title: "Salt and memory",
    description:
      "Write about taste, the sea, preservation, or the way memory stings and heals in equal measure.",
    dateLabel: "May 17",
    status: "closed",
    submissionCount: 71,
    topSubmission: { title: "Saltwater Memory", author: "Jin Park", likes: 94 },
    runnerUp: { title: "Tide Lines", author: "Mara Osei", likes: 76 },
  },
  {
    id: "prompt-2026-w20",
    slug: "the-last-train-home",
    title: "The last train home",
    description:
      "Write about late-night departures, empty platforms, and the journey back to somewhere — or someone.",
    dateLabel: "May 10",
    status: "closed",
    submissionCount: 58,
    topSubmission: { title: "Platform 4", author: "Theodore Blake", likes: 88 },
    runnerUp: { title: "Midnight Departure", author: "Lena Müller", likes: 71 },
  },
  {
    id: "prompt-2026-w19",
    slug: "letters-never-sent",
    title: "Letters never sent",
    description:
      "Write about correspondence that never reached its reader — drafts, unsent messages, words held back.",
    dateLabel: "May 3",
    status: "closed",
    submissionCount: 64,
    topSubmission: { title: "Return to Sender", author: "Eleanor Vance", likes: 103 },
    runnerUp: { title: "Postmarked", author: "James Whitmore", likes: 89 },
  },
]

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
    id: "mock-last-train",
    type: "story",
    date: "May 21",
    title: "The Last Train Home",
    author: "James Whitmore",
    authorHandle: "jwhitmore",
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
    id: "mock-saltwater",
    type: "poem",
    date: "May 21",
    title: "Saltwater Memory",
    author: "Jin Park",
    authorHandle: "jinpark",
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
    id: "mock-clockmaker",
    type: "story",
    date: "May 20",
    title: "The Clockmaker's Daughter",
    author: "Theodore Blake",
    authorHandle: "tblake",
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
    id: "mock-second-language",
    type: "essay",
    date: "May 20",
    title: "On Writing in a Second Language",
    author: "Lena Müller",
    authorHandle: "lenaschreibt",
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
    id: "mock-threshold",
    type: "poem",
    date: "May 20",
    title: "Threshold",
    author: "Kwame Asante",
    authorHandle: "kwamea",
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
