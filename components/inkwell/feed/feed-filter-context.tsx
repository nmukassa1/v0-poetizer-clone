"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import type { FeedFilter } from "./types"

type FeedFilterContextValue = {
  filter: FeedFilter
  setFilter: (filter: FeedFilter) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const FeedFilterContext = createContext<FeedFilterContextValue | null>(null)

export function FeedFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<FeedFilter>("all")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <FeedFilterContext.Provider
      value={{ filter, setFilter, menuOpen, setMenuOpen }}
    >
      {children}
    </FeedFilterContext.Provider>
  )
}

export function useFeedFilter() {
  return useContext(FeedFilterContext)
}
