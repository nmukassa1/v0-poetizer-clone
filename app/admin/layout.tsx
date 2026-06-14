import type { ReactNode } from "react"
import { requireAdminPage } from "@/lib/admin/require-admin-page"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminPage()
  return children
}
