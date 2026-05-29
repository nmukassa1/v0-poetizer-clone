"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "inkwell-auth"

type AuthContextValue = {
  isLoggedIn: boolean
  signIn: () => void
  signOut: () => void
  toggleAuth: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredAuth(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(STORAGE_KEY) === "1"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setIsLoggedIn(readStoredAuth())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(STORAGE_KEY, isLoggedIn ? "1" : "0")
  }, [isLoggedIn, hydrated])

  const signIn = useCallback(() => setIsLoggedIn(true), [])
  const signOut = useCallback(() => setIsLoggedIn(false), [])
  const toggleAuth = useCallback(() => setIsLoggedIn((v) => !v), [])

  const value = useMemo(
    () => ({ isLoggedIn, signIn, signOut, toggleAuth }),
    [isLoggedIn, signIn, signOut, toggleAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
