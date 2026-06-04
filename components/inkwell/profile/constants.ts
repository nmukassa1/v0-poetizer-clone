import type { PublicProfile } from "@/lib/profiles"

export const DEFAULT_ME_PROFILE: PublicProfile = {
  name: "You",
  handle: "you",
  location: "—",
  bio: "Sign in and publish your first piece to fill out this profile.",
  followers: "—",
  following: "—",
}

export const DEMO_PROFILE_HANDLES = [
  { value: "eleanorv", label: "Eleanor Vance" },
  { value: "lenaschreibt", label: "Lena Muller" },
  { value: "jinpark", label: "Jin Park" },
  { value: "tblake", label: "Theodore Blake" },
  { value: "kwamea", label: "Kwame Asante" },
  { value: "sofiac", label: "Sofia Chen" },
  { value: "jwhitmore", label: "James Whitmore" },
  { value: "maraosei", label: "Mara Osei" },
] as const
