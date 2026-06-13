import { NextResponse } from "next/server"
import {
  createPromptRecord,
  type PromptMutationResult,
} from "@/lib/prompts/mutations"
import { loadAdminPromptsPageData } from "@/lib/prompts/load-prompt-page-data"

export async function GET() {
  const prompts = await loadAdminPromptsPageData()
  return NextResponse.json({ prompts })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" } satisfies PromptMutationResult,
      { status: 400 },
    )
  }

  const result = await createPromptRecord(body)

  if (!result.success) {
    return NextResponse.json(result, { status: 400 })
  }

  return NextResponse.json(result)
}
