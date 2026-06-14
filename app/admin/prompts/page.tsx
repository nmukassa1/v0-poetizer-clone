import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { AdminPromptsPage } from "@/components/inkwell/admin/prompts/admin-prompts-page"
import { getCurrentUser } from "@/lib/auth/server"
import { isAdminEmail } from "@/lib/auth/require-admin"
import { loadAdminPromptsPageData } from "@/lib/prompts/load-prompt-page-data"

export const metadata: Metadata = {
  title: "Manage prompts | inkwell",
  description: "Create and manage weekly writing prompts on inkwell.",
}

export default async function AdminPromptsRoutePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  if (!isAdminEmail(user.email)) {
    notFound()
  }

  const prompts = await loadAdminPromptsPageData()

  return <AdminPromptsPage prompts={prompts} />
}
