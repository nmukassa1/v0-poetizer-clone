export type SeedProfile = {
  id: string
  handle: string
  name: string
  bio: string
  location: string
}

export const SEED_PROFILES: SeedProfile[] = [
  {
    id: "seed-user-eleanorv",
    handle: "eleanorv",
    name: "Eleanor Vance",
    location: "Portland, OR",
    bio: "Editor of The Lantern Review. Writing at dusk, where memory loosens.",
  },
  {
    id: "seed-user-lenaschreibt",
    handle: "lenaschreibt",
    name: "Lena Müller",
    location: "Berlin, DE",
    bio: "Essayist writing at the seam between languages and memory.",
  },
  {
    id: "seed-user-jinpark",
    handle: "jinpark",
    name: "Jin Park",
    location: "Seoul, KR",
    bio: "Poet of tide-lines, departure, and weather-worn tenderness.",
  },
  {
    id: "seed-user-tblake",
    handle: "tblake",
    name: "Theodore Blake",
    location: "Brighton, UK",
    bio: "Story writer drawn to old workshops, clocks, and haunted rooms.",
  },
  {
    id: "seed-user-kwamea",
    handle: "kwamea",
    name: "Kwame Asante",
    location: "Accra / London",
    bio: "Fiction writer exploring distance, grammar, and belonging.",
  },
  {
    id: "seed-user-sofiac",
    handle: "sofiac",
    name: "Sofia Chen",
    location: "San Francisco, US",
    bio: "Poet writing in dawn light before the city wakes.",
  },
  {
    id: "seed-user-jwhitmore",
    handle: "jwhitmore",
    name: "James Whitmore",
    location: "Liverpool, UK",
    bio: "Short fiction focused on stations, harbors, and quiet departures.",
  },
  {
    id: "seed-user-maraosei",
    handle: "maraosei",
    name: "Mara Osei",
    location: "Accra, GH",
    bio: "Poet and essayist writing through what remains unsaid.",
  },
]

export const SEED_USER_ID_PREFIX = "seed-user-"
