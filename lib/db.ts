import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * pg v8 treats require/prefer/verify-ca like verify-full; v9 will not.
 * Neon URLs often use sslmode=require — upgrade explicitly to avoid the warning.
 */
function normalizeConnectionString(connectionString: string): string {
  if (/sslmode=(require|prefer|verify-ca)(?:&|$)/.test(connectionString)) {
    return connectionString.replace(
      /sslmode=(require|prefer|verify-ca)/,
      "sslmode=verify-full",
    )
  }
  if (!/sslmode=/.test(connectionString)) {
    const sep = connectionString.includes("?") ? "&" : "?"
    return `${connectionString}${sep}sslmode=verify-full`
  }
  return connectionString
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured")
  }

  const adapter = new PrismaPg({
    connectionString: normalizeConnectionString(connectionString),
  })
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  })
}

/** Dev HMR can keep an old PrismaClient missing new models — recreate when stale. */
function isPrismaClientReady(
  client: PrismaClient | undefined,
): client is PrismaClient {
  return Boolean(
    client &&
      typeof client.profile?.findFirst === "function" &&
      typeof client.piece?.findFirst === "function" &&
      typeof client.pieceLike?.findMany === "function" &&
      typeof client.pieceComment?.findMany === "function" &&
      typeof client.profileFollow?.findMany === "function",
  )
}

function getPrismaClient(): PrismaClient {
  if (isPrismaClientReady(globalForPrisma.prisma)) {
    return globalForPrisma.prisma
  }

  const client = createPrismaClient()

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client
  }

  return client
}

export const prisma = getPrismaClient()

export type DatabaseHealth = {
  ok: boolean
  latencyMs: number
  error?: string
}

export async function checkDatabaseConnection(): Promise<DatabaseHealth> {
  const start = Date.now()

  try {
    await prisma.$queryRaw`SELECT 1`
    return { ok: true, latencyMs: Date.now() - start }
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : "Unknown database error",
    }
  }
}
