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
import { authClient } from "@/lib/auth/client"

type AuthContextValue = {
  isLoggedIn: boolean
  isLoading: boolean
  isAdmin: boolean
  userId: string | undefined
  userName: string | undefined
  userEmail: string | undefined
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!session?.user) {
      setIsAdmin(false)
      return
    }

    let cancelled = false

    fetch("/api/auth/admin-status")
      .then((response) => response.json())
      .then((data: { isAdmin?: boolean }) => {
        if (!cancelled) {
          setIsAdmin(Boolean(data.isAdmin))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsAdmin(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [session?.user?.id])

  const signOut = useCallback(async () => {
    await authClient.signOut()
    window.location.href = "/"
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: Boolean(session?.user),
      isLoading: isPending,
      isAdmin,
      userId: session?.user?.id,
      userName: session?.user?.name ?? undefined,
      userEmail: session?.user?.email ?? undefined,
      signOut,
    }),
    [session?.user, isPending, isAdmin, signOut],
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
