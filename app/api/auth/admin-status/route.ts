import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth/server"
import { isAdminEmail } from "@/lib/auth/require-admin"

export async function GET() {
  const user = await getCurrentUser()

  return NextResponse.json({
    isAdmin: isAdminEmail(user?.email),
  })
}
