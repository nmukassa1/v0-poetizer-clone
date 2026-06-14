import { getCurrentUser } from "@/lib/auth/server"

function getAdminEmails(): Set<string> {
  const raw = process.env.INKWELL_ADMIN_EMAILS ?? ""
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false

  const admins = getAdminEmails()
  if (admins.size === 0) return false

  return admins.has(email.toLowerCase())
}

export async function getAdminUser() {
  const user = await getCurrentUser()
  if (!user?.email || !isAdminEmail(user.email)) {
    return null
  }

  return user
}

export type AdminAuthResult =
  | { ok: true; user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>> }
  | { ok: false; status: 401 | 403; error: string }

export async function authorizeAdminApi(): Promise<AdminAuthResult> {
  const user = await getCurrentUser()
  if (!user) {
    return { ok: false, status: 401, error: "Unauthorized" }
  }

  if (!isAdminEmail(user.email)) {
    return { ok: false, status: 403, error: "Forbidden" }
  }

  return { ok: true, user }
}
