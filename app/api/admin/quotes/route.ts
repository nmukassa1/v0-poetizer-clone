import { NextResponse } from "next/server"
import { authorizeAdminApi } from "@/lib/auth/require-admin"
import {
  createQuoteRecord,
  type QuoteMutationResult,
} from "@/lib/quotes/mutations"
import { loadAdminQuotesPageData } from "@/lib/quotes/queries"

export async function GET() {
  const auth = await authorizeAdminApi()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const quotes = await loadAdminQuotesPageData()
  return NextResponse.json({ quotes })
}

export async function POST(request: Request) {
  const auth = await authorizeAdminApi()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" } satisfies QuoteMutationResult,
      { status: 400 },
    )
  }

  const result = await createQuoteRecord(body)

  if (!result.success) {
    return NextResponse.json(result, { status: 400 })
  }

  return NextResponse.json(result)
}
