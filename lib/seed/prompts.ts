import type { PromptStatus } from "@/lib/generated/prisma/client"

type SeedPrompt = {
  slug: string
  title: string
  description: string
  status: PromptStatus
  startsDaysAgo: number
  endsDaysFromStart: number
}

export const SEED_PROMPTS: SeedPrompt[] = [
  {
    slug: "things-left-unsaid",
    title: "Things left unsaid",
    description:
      "Write about what was never spoken — the letter you never sent, the apology that stayed in your throat, the truth you chose to bury. Poems, stories, and essays welcome.",
    status: "ACTIVE",
    startsDaysAgo: 6,
    endsDaysFromStart: 7,
  },
  {
    slug: "first-light",
    title: "First light",
    description:
      "Write about the first moments of day — dawn breaking, a room filling with light, the hour before anyone else wakes.",
    status: "CLOSED",
    startsDaysAgo: 34,
    endsDaysFromStart: 7,
  },
  {
    slug: "a-door-left-open",
    title: "A door left open",
    description:
      "Write about thresholds — what you walked toward, what you left behind, or the choice not to close the door.",
    status: "CLOSED",
    startsDaysAgo: 41,
    endsDaysFromStart: 7,
  },
  {
    slug: "salt-and-memory",
    title: "Salt and memory",
    description:
      "Write about taste, the sea, preservation, or the way memory stings and heals in equal measure.",
    status: "CLOSED",
    startsDaysAgo: 48,
    endsDaysFromStart: 7,
  },
  {
    slug: "the-last-train-home",
    title: "The last train home",
    description:
      "Write about late-night departures, empty platforms, and the journey back to somewhere — or someone.",
    status: "CLOSED",
    startsDaysAgo: 55,
    endsDaysFromStart: 7,
  },
  {
    slug: "letters-never-sent",
    title: "Letters never sent",
    description:
      "Write about correspondence that never reached its reader — drafts, unsent messages, words held back.",
    status: "CLOSED",
    startsDaysAgo: 62,
    endsDaysFromStart: 7,
  },
]

function promptWindow(startsDaysAgo: number, endsDaysFromStart: number) {
  const startsAt = new Date()
  startsAt.setUTCDate(startsAt.getUTCDate() - startsDaysAgo)
  startsAt.setUTCHours(12, 0, 0, 0)

  const endsAt = new Date(startsAt)
  endsAt.setUTCDate(endsAt.getUTCDate() + endsDaysFromStart)
  endsAt.setUTCHours(12, 0, 0, 0)

  return { startsAt, endsAt }
}

export async function seedPrompts(prisma: {
  prompt: {
    upsert: (args: {
      where: { slug: string }
      create: {
        slug: string
        title: string
        description: string
        status: PromptStatus
        startsAt: Date
        endsAt: Date
      }
      update: {
        title: string
        description: string
        status: PromptStatus
        startsAt: Date
        endsAt: Date
      }
    }) => Promise<unknown>
  }
}) {
  for (const prompt of SEED_PROMPTS) {
    const { startsAt, endsAt } = promptWindow(
      prompt.startsDaysAgo,
      prompt.endsDaysFromStart,
    )

    await prisma.prompt.upsert({
      where: { slug: prompt.slug },
      create: {
        slug: prompt.slug,
        title: prompt.title,
        description: prompt.description,
        status: prompt.status,
        startsAt,
        endsAt,
      },
      update: {
        title: prompt.title,
        description: prompt.description,
        status: prompt.status,
        startsAt,
        endsAt,
      },
    })
  }

  return SEED_PROMPTS.length
}
