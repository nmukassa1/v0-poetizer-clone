export type PublicProfile = {
  handle: string
  name: string
  location: string
  bio: string
  followers: string
  following: string
}

const publicProfiles: PublicProfile[] = [
  {
    handle: "eleanorv",
    name: "Eleanor Vance",
    location: "Portland, OR",
    bio: "Editor of The Lantern Review. Writing at dusk, where memory loosens.",
    followers: "284",
    following: "162",
  },
  {
    handle: "lenaschreibt",
    name: "Lena Müller",
    location: "Berlin, DE",
    bio: "Essayist writing at the seam between languages and memory.",
    followers: "1.2k",
    following: "318",
  },
  {
    handle: "jinpark",
    name: "Jin Park",
    location: "Seoul, KR",
    bio: "Poet of tide-lines, departure, and weather-worn tenderness.",
    followers: "940",
    following: "211",
  },
  {
    handle: "tblake",
    name: "Theodore Blake",
    location: "Brighton, UK",
    bio: "Story writer drawn to old workshops, clocks, and haunted rooms.",
    followers: "1.5k",
    following: "280",
  },
  {
    handle: "kwamea",
    name: "Kwame Asante",
    location: "Accra / London",
    bio: "Fiction writer exploring distance, grammar, and belonging.",
    followers: "1.8k",
    following: "390",
  },
  {
    handle: "sofiac",
    name: "Sofia Chen",
    location: "San Francisco, US",
    bio: "Poet writing in dawn light before the city wakes.",
    followers: "2.4k",
    following: "401",
  },
  {
    handle: "jwhitmore",
    name: "James Whitmore",
    location: "Liverpool, UK",
    bio: "Short fiction focused on stations, harbors, and quiet departures.",
    followers: "730",
    following: "126",
  },
  {
    handle: "maraosei",
    name: "Mara Osei",
    location: "Accra, GH",
    bio: "Poet and essayist writing through what remains unsaid.",
    followers: "3.1k",
    following: "502",
  },
]

const handleByName = new Map(publicProfiles.map((profile) => [profile.name, profile.handle]))
handleByName.set("Lena Muller", "lenaschreibt")
const profileByHandle = new Map(publicProfiles.map((profile) => [profile.handle, profile]))

export function getHandleForAuthor(name: string): string {
  return handleByName.get(name) ?? "eleanorv"
}

export function getPublicProfileByHandle(handle: string): PublicProfile {
  return profileByHandle.get(handle) ?? publicProfiles[0]
}

export function getPublicProfileHref(basePath: string, authorName: string): string {
  return `${basePath}/profile/${getHandleForAuthor(authorName)}`
}
