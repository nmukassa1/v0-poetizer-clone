import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth/server"

type RouteContext = { params: Promise<{ path: string[] }> }

export async function GET(request: NextRequest, context: RouteContext) {
  const { GET: handleGet } = auth.handler()
  return handleGet(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { POST: handlePost } = auth.handler()
  return handlePost(request, context)
}
