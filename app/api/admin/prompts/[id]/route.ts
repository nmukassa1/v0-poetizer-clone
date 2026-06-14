import { NextResponse } from "next/server"
import { authorizeAdminApi } from "@/lib/auth/require-admin"
import {
  deletePromptRecord,
  updatePromptRecord,
  type PromptMutationResult,
} from "@/lib/prompts/mutations"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await authorizeAdminApi()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" } satisfies PromptMutationResult,
      { status: 400 },
    )
  }

  const result = await updatePromptRecord(id, body)

  if (!result.success) {
    const status = result.error.includes("not found") ? 404 : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await authorizeAdminApi()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { id } = await params
  const result = await deletePromptRecord(id)

  if (!result.success) {
    const status = result.error.includes("not found") ? 404 : 400
    return NextResponse.json(result, { status })
  }

  return NextResponse.json(result)
}
