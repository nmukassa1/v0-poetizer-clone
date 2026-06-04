import { prisma } from "@/lib/db"

type EnsureProfileInput = {
  userId: string
  handle: string
  name: string
}

export async function ensureUserProfile({
  userId,
  handle,
  name,
}: EnsureProfileInput) {
  return prisma.profile.upsert({
    where: { id: userId },
    create: {
      id: userId,
      handle,
      name: name.trim(),
    },
    update: {
      name: name.trim(),
    },
  })
}

export async function isHandleTaken(handle: string): Promise<boolean> {
  const existing = await prisma.profile.findUnique({
    where: { handle },
    select: { id: true },
  })
  return Boolean(existing)
}
