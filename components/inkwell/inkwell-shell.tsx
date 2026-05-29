"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/components/inkwell/auth-provider"
import { Header } from "@/components/inkwell/Header"

export function InkwellShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  )
}
