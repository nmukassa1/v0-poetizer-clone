"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/inkwell/auth-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ProfileSettings() {
  const { isLoggedIn, signOut } = useAuth()
  const router = useRouter()
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  function handleDeleteAccount() {
    signOut()
    setDeleteOpen(false)
    router.replace("/")
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[560px] px-4 pb-20 pt-6 min-[480px]:px-6 lg:px-8 lg:pb-24">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to profile
      </Link>

      <header className="mt-6">
        <h1 className="font-serif text-2xl font-semibold text-[var(--ink-fg)] min-[480px]:text-3xl">
          Profile settings
        </h1>
        <p className="mt-2 font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
          Manage your account security and preferences.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink-fg)]">
          Change password
        </h2>
        <p className="mt-1 font-serif text-[13px] text-[var(--ink-muted)]">
          Update the password you use to sign in.
        </p>

        <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label
              htmlFor="current-password"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Current password
            </Label>
            <Input
              id="current-password"
              type="password"
              autoComplete="current-password"
              className="border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="new-password"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              New password
            </Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              className="border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="confirm-password"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Confirm new password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              className="border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex rounded-full bg-[var(--ink-fg)] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)]"
          >
            Update password
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border border-[#e8d4d4] bg-[color-mix(in_srgb,#fff5f5_40%,var(--ink-bg))] p-5 min-[480px]:p-6">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink-fg)]">
          Delete account
        </h2>
        <p className="mt-1 font-serif text-[13px] leading-relaxed text-[var(--ink-muted)]">
          Permanently remove your profile, drafts, and published pieces. This
          cannot be undone.
        </p>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="mt-5 inline-flex rounded-full border border-[#c45c5c] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[#a33f3f] transition-colors hover:bg-[#a33f3f] hover:text-white"
            >
              Delete account
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border-[var(--ink-border)] bg-[var(--ink-bg)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif text-[var(--ink-fg)]">
                Delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription className="font-serif text-[var(--ink-muted)]">
                All of your writing, saved pieces, and profile data will be
                removed permanently. You will be signed out immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-sans text-[11px]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-[#a33f3f] font-sans text-[11px] hover:bg-[#8a3333]"
              >
                Delete account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  )
}
