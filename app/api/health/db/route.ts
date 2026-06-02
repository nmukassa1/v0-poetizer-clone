import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        error: "DATABASE_URL is not configured",
      },
      { status: 503 },
    )
  }

  const health = await checkDatabaseConnection()

  return NextResponse.json(health, { status: health.ok ? 200 : 503 })
}
