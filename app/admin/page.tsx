import type { Metadata } from "next"
import { AdminHubPage } from "@/components/inkwell/admin/admin-hub-page"

export const metadata: Metadata = {
  title: "Admin | inkwell",
  description: "Inkwell administration.",
}

export default function AdminRoutePage() {
  return <AdminHubPage />
}
