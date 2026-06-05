import type { ContentTag } from "@/lib/feed/types"

export type SeedPiece = {
  id: string
  authorHandle: string
  type: ContentTag
  title: string
  excerpt: string
  body: string
  tags: string[]
  likeCount: number
  commentCount: number
  shareCount: number
  /** Days before today */
  publishedDaysAgo: number
}

function poem(lines: string[]): string {
  return lines.map((line) => `<p>${line}</p>`).join("")
}

function prose(paragraphs: string[]): string {
  return paragraphs.map((p) => `<p>${p}</p>`).join("")
}

export const SEED_PIECES: SeedPiece[] = [
  {
    id: "seed-piece-whispers-of-dusk",
    authorHandle: "eleanorv",
    type: "poem",
    title: "Whispers of Dusk",
    excerpt:
      "Dawn rose like an eerie mist from an unearthly grave, I felt a doubt caress my cheek and I tried to ride the wave…",
    body: poem([
      "Dawn rose like an eerie mist from an unearthly grave,",
      "I felt a doubt caress my cheek and I tried to ride the wave.",
      "Waiting for an answer to a question I never asked —",
      "the porch light still on, the kettle still warm,",
      "as if someone might return before the hour turned.",
      "I wrote your name in the condensation on the window",
      "and watched it slide away before I could finish.",
    ]),
    tags: ["dusk", "memory", "portland"],
    likeCount: 529,
    commentCount: 88,
    shareCount: 134,
    publishedDaysAgo: 1,
  },
  {
    id: "seed-piece-last-train-home",
    authorHandle: "jwhitmore",
    type: "story",
    title: "The Last Train Home",
    excerpt:
      "The station platform stretched endlessly into the fog, its edges softened by the haze that crept in from the harbour…",
    body: prose([
      "The station platform stretched endlessly into the fog, its edges softened by the haze that crept in from the harbour. Margaret pulled her coat tighter, watching the empty tracks gleam under the amber lights.",
      "She had taken this train every Friday for twelve years. Same seat, same newspaper, same polite nod to the guard who never remembered her name. Tonight the timetable board flickered once and went dark.",
      "When the train finally arrived, it was quieter than she expected — no screech of brakes, no rush of displaced air. The doors opened onto an empty carriage smelling of rain and old wool.",
      "Margaret stepped inside. The guard looked up and smiled as if he had been waiting only for her. \"Last service,\" he said. \"After this, the line closes for good.\"",
      "She found her seat by the window. Outside, the platform dissolved into mist, and the city lights arranged themselves into a constellation she almost recognized.",
    ]),
    tags: ["fiction", "harbour", "night"],
    likeCount: 56,
    commentCount: 14,
    shareCount: 8,
    publishedDaysAgo: 1,
  },
  {
    id: "seed-piece-saltwater-memory",
    authorHandle: "jinpark",
    type: "poem",
    title: "Saltwater Memory",
    excerpt:
      "I left a version of myself by the sea that summer — she is still there, I think, hands full of cold light…",
    body: poem([
      "I left a version of myself",
      "by the sea that summer —",
      "she is still there, I think,",
      "hands full of cold light",
      "and the names of fish I never learned.",
      "The tide returns her footprints",
      "each morning, proof",
      "that leaving is only another way",
      "of arriving somewhere else.",
    ]),
    tags: ["sea", "summer", "departure"],
    likeCount: 94,
    commentCount: 21,
    shareCount: 12,
    publishedDaysAgo: 1,
  },
  {
    id: "seed-piece-clockmakers-daughter",
    authorHandle: "tblake",
    type: "story",
    title: "The Clockmaker's Daughter",
    excerpt:
      "Every evening at precisely six o'clock, when the sun painted long shadows across the cobblestones, Eliza would climb the narrow stairs…",
    body: prose([
      "Every evening at precisely six o'clock, when the sun painted long shadows across the cobblestones, Eliza would climb the narrow stairs to her father's workshop. The room smelled of oil and brass and the particular dust that accumulates in places where time is taken apart and put back together.",
      "Tonight, for the first time in forty years, every clock had stopped.",
      "Eliza moved between the workbenches slowly, as if sound itself might shatter. Her father sat in his chair by the window, hands folded, eyes on the harbor.",
      "\"They're not broken,\" he said without turning. \"They're waiting.\"",
      "She followed his gaze to the tide line, where the water had drawn back farther than anyone in the village could remember. In the exposed mud, half-buried, a face she knew looked up at the sky.",
    ]),
    tags: ["clocks", "workshop", "harbor"],
    likeCount: 142,
    commentCount: 31,
    shareCount: 24,
    publishedDaysAgo: 2,
  },
  {
    id: "seed-piece-second-language",
    authorHandle: "lenaschreibt",
    type: "essay",
    title: "On Writing in a Second Language",
    excerpt:
      "There is a particular grief in reaching for a word and finding only its outline — the shape of the feeling, not the feeling itself…",
    body: prose([
      "There is a particular grief in reaching for a word and finding only its outline — the shape of the feeling, not the feeling itself. Writing in English, for me, is always an act of translation. Not from German, exactly, but from something pre-verbal: the room I am in before language arrives.",
      "In that room, sentences have no subject. Memory arrives as texture — wool, rain on a tram window, the click of a typewriter key. When I write in English, I am building a bridge backward into that room, plank by plank, hoping the other side still exists.",
      "People ask whether I lose nuance. I do. I also gain distance — the kind that lets you see a grief from the outside and, sometimes, name it for the first time.",
      "The first draft is reckless in any language. The edit is where I decide which country the finished piece will live in.",
    ]),
    tags: ["essay", "language", "craft"],
    likeCount: 203,
    commentCount: 47,
    shareCount: 55,
    publishedDaysAgo: 2,
  },
  {
    id: "seed-piece-threshold",
    authorHandle: "kwamea",
    type: "poem",
    title: "Threshold",
    excerpt:
      "The door was always open but we stood on either side of it pretending the wind had nothing to do with us…",
    body: poem([
      "The door was always open",
      "but we stood on either side of it",
      "pretending the wind",
      "had nothing to do with us —",
      "pretending the distance",
      "was a kind of grammar",
      "we had both agreed to speak.",
      "I kept my hand on the frame.",
      "You kept yours in your pocket.",
      "Neither of us crossed.",
    ]),
    tags: ["threshold", "distance", "grammar"],
    likeCount: 167,
    commentCount: 38,
    shareCount: 19,
    publishedDaysAgo: 2,
  },
  {
    id: "seed-piece-fragments",
    authorHandle: "sofiac",
    type: "poem",
    title: "Fragments",
    excerpt:
      "In the space between heartbeats, where silence learns to speak, I gather what the night refused to keep…",
    body: poem([
      "In the space between heartbeats,",
      "where silence learns to speak,",
      "I gather what the night refused to keep —",
      "a button, a name, the last warm cup",
      "before the kitchen went dark.",
      "Morning arranges them on the table",
      "like evidence of a life",
      "I am still learning to inhabit.",
    ]),
    tags: ["dawn", "silence", "fragments"],
    likeCount: 891,
    commentCount: 112,
    shareCount: 67,
    publishedDaysAgo: 3,
  },
  {
    id: "seed-piece-after-the-call",
    authorHandle: "maraosei",
    type: "poem",
    title: "After the Call",
    excerpt:
      "The phone cools in my palm like a stone pulled from a river. I say nothing to the room. The room understands…",
    body: poem([
      "The phone cools in my palm",
      "like a stone pulled from a river.",
      "I say nothing to the room.",
      "The room understands.",
      "Outside, a neighbor's dog",
      "barks at a sound I can't hear.",
      "I write unsaid",
      "until the page is full enough",
      "to put the phone down.",
    ]),
    tags: ["unsaid", "phone", "night"],
    likeCount: 37,
    commentCount: 9,
    shareCount: 4,
    publishedDaysAgo: 4,
  },
  {
    id: "seed-piece-undelivered",
    authorHandle: "jinpark",
    type: "story",
    title: "Undelivered",
    excerpt:
      "The letter arrived three weeks late, postmarked from a town that no longer exists on any map I trust…",
    body: prose([
      "The letter arrived three weeks late, postmarked from a town that no longer exists on any map I trust. The envelope was soft at the corners, as if it had been carried in someone's pocket for a long walk.",
      "I didn't open it right away. I made tea. I washed a cup that was already clean. I stood at the window and counted the boats in the harbor, a habit I thought I'd outgrown.",
      "When I finally slit the seal, there was only one line inside: \"I meant to tell you before the bridge closed.\"",
      "I looked up the town. The bridge had been dismantled in 1998. The letter was dated last Tuesday.",
      "I wrote a reply anyway. I walked to the post office in the rain. The clerk weighed it, shrugged, and said some things find their own route.",
    ]),
    tags: ["letters", "bridge", "delay"],
    likeCount: 54,
    commentCount: 17,
    shareCount: 11,
    publishedDaysAgo: 5,
  },
  {
    id: "seed-piece-draft-no-7",
    authorHandle: "lenaschreibt",
    type: "essay",
    title: "Draft No. 7",
    excerpt:
      "The seventh version of an essay is where you stop lying to yourself about what the piece is actually about…",
    body: prose([
      "The seventh version of an essay is where you stop lying to yourself about what the piece is actually about. Versions one through six were polite. They circled the subject, complimented it, and left without asking for anything in return.",
      "Draft seven begins with the sentence you hid in a footnote in draft three. It ends where draft five refused to go — at the kitchen table, at 2 a.m., with the blue light of the fridge and the understanding that some truths only arrive when you are too tired to decorate them.",
      "I don't believe in perfect drafts. I believe in honest ones. Honesty is not clarity. Sometimes it is a mess on the floor you have to walk through anyway.",
    ]),
    tags: ["drafting", "essay", "honesty"],
    likeCount: 29,
    commentCount: 6,
    shareCount: 3,
    publishedDaysAgo: 6,
  },
]
