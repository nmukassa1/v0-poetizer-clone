import { prisma } from "@/lib/db"

/** Close active prompts whose deadline has passed. */
export async function syncExpiredActivePrompts() {
  await prisma.prompt.updateMany({
    where: {
      status: "ACTIVE",
      endsAt: { lte: new Date() },
    },
    data: { status: "CLOSED" },
  })
}

export function isPromptAcceptingSubmissions(prompt: {
  status: string
  endsAt: Date
}) {
  return prompt.status === "ACTIVE" && prompt.endsAt > new Date()
}
