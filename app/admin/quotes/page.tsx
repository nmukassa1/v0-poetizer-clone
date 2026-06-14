import type { Metadata } from "next"
import { AdminQuotesPage } from "@/components/inkwell/admin/quotes/admin-quotes-page"
import { loadAdminQuotesPageData } from "@/lib/quotes/queries"

export const metadata: Metadata = {
  title: "Manage quotes | inkwell",
  description: "Add and manage inspirational quotes on inkwell.",
}

export default async function AdminQuotesRoutePage() {
  const quotes = await loadAdminQuotesPageData()

  return <AdminQuotesPage quotes={quotes} />
}
