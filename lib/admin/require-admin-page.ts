import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/server"
import { isAdminEmail } from "@/lib/auth/require-admin"

export async function requireAdminPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  if (!isAdminEmail(user.email)) {
    notFound()
  }

  return user
}
