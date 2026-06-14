import type { Metadata } from "next"
import { AdminPromptsPage } from "@/components/inkwell/admin/prompts/admin-prompts-page"
import { loadAdminPromptsPageData } from "@/lib/prompts/load-prompt-page-data"

export const metadata: Metadata = {
  title: "Manage prompts | inkwell",
  description: "Create and manage weekly writing prompts on inkwell.",
}

export default async function AdminPromptsRoutePage() {
  const prompts = await loadAdminPromptsPageData()

  return <AdminPromptsPage prompts={prompts} />
}
