import { ContentCardProps } from "@/components/v1/content-card"

export const sampleContent: ContentCardProps[] = [
  {
    id: "1",
    title: "Whispers of Dusk",
    content: `Dawn rose like an eerie mist from an unearthly grave,
I felt a doubt caress my cheek and I tried to ride the wave
Waiting for an answer to a question I never asked,
The lingering need to to feel, to know, you can't outlast,

I have learned to till my thoughts with a need to understand...`,
    author: {
      name: "Eleanor Vance",
    },
    date: "05/21/2026 09:46",
    type: "poem",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    title: "The Last Train Home",
    content: `The station platform stretched endlessly into the fog, its edges softened by the haze that crept in from the harbor. Margaret pulled her coat tighter, watching the empty tracks gleam under the amber lights.

She had waited here before, years ago, when time moved differently and goodbyes felt like promises. Now the benches held only shadows, and the departure board flickered with destinations she no longer recognized...`,
    author: {
      name: "James Whitmore",
    },
    date: "05/21/2026 08:22",
    type: "story",
    likes: 56,
    comments: 14,
  },
  {
    id: "3",
    title: "Fragments",
    content: `In the space between heartbeats,
where silence learns to speak,
I gather all the pieces
of the words I couldn't keep.

They scatter like autumn leaves,
dancing on indifferent wind,
each syllable a memory
of where we might have been...`,
    author: {
      name: "Sofia Chen",
    },
    date: "05/21/2026 07:15",
    type: "poem",
    likes: 89,
    comments: 23,
  },
  {
    id: "4",
    title: "The Clockmaker's Daughter",
    content: `Every evening at precisely six o'clock, when the sun painted long shadows across the cobblestones, Eliza would climb the narrow stairs to her father's workshop. The room smelled of brass filings and old wood, a scent she had come to associate with magic itself.

Tonight was different. Tonight, for the first time in forty years, every clock had stopped...`,
    author: {
      name: "Theodore Blake",
    },
    date: "05/20/2026 22:18",
    type: "story",
    likes: 142,
    comments: 31,
  },
]
