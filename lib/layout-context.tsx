"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type LayoutView = "single" | "grid"

interface LayoutContextType {
  view: LayoutView
  setView: (view: LayoutView) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<LayoutView>("single")

  return (
    <LayoutContext.Provider value={{ view, setView }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
