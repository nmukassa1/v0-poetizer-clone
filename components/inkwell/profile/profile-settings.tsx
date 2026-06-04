"use client"

import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
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

export type ProfileSettingsData = {
  name: string
  handle: string
  bio: string
  location: string
}

const fieldClassName =
  "border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="font-sans text-[12px] text-[#a33f3f]">{message}</p>
}

function StatusMessage({
  type,
  message,
}: {
  type: "success" | "error"
  message: string
}) {
  return (
    <p
      role={type === "error" ? "alert" : "status"}
      className={`rounded-lg px-3 py-2 font-sans text-[13px] ${
        type === "success"
          ? "border border-[#d4e8d4] bg-[color-mix(in_srgb,#f5fff5_40%,var(--ink-bg))] text-[#2d5a2d]"
          : "border border-[#e8d4d4] bg-[color-mix(in_srgb,#fff5f5_40%,var(--ink-bg))] text-[#a33f3f]"
      }`}
    >
      {message}
    </p>
  )
}

export function ProfileSettings({
  email,
  initialProfile,
}: {
  email: string
  initialProfile: ProfileSettingsData
}) {
  const { isLoggedIn, isLoading, signOut } = useAuth()
  const router = useRouter()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [name, setName] = useState(initialProfile.name)
  const [handle, setHandle] = useState(initialProfile.handle)
  const [bio, setBio] = useState(initialProfile.bio)
  const [location, setLocation] = useState(initialProfile.location)
  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [profileFieldErrors, setProfileFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({})
  const [isSavingProfile, startProfileTransition] = useTransition()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [passwordFieldErrors, setPasswordFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({})
  const [isChangingPassword, startPasswordTransition] = useTransition()

  const [deletePassword, setDeletePassword] = useState("")
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, startDeleteTransition] = useTransition()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in?callbackUrl=/profile/settings")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading || !isLoggedIn) {
    return null
  }

  function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setProfileMessage(null)
    setProfileFieldErrors({})

    startProfileTransition(async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, handle, bio, location }),
        })
        const result = await response.json()

        if (!response.ok || !result.success) {
          setProfileFieldErrors(result.fieldErrors ?? {})
          setProfileMessage({
            type: "error",
            text: result.error ?? "Could not save profile.",
          })
          return
        }

        setName(result.profile.name)
        setHandle(result.profile.handle)
        setBio(result.profile.bio)
        setLocation(result.profile.location)
        setProfileMessage({ type: "success", text: "Profile saved." })
        router.refresh()
      } catch {
        setProfileMessage({
          type: "error",
          text: "Could not reach the server.",
        })
      }
    })
  }

  function changePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPasswordMessage(null)
    setPasswordFieldErrors({})

    startPasswordTransition(async () => {
      try {
        const response = await fetch("/api/account/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        })
        const result = await response.json()

        if (!response.ok || !result.success) {
          setPasswordFieldErrors(result.fieldErrors ?? {})
          setPasswordMessage({
            type: "error",
            text: result.error ?? "Could not update password.",
          })
          return
        }

        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setPasswordMessage({
          type: "success",
          text: "Password updated.",
        })
      } catch {
        setPasswordMessage({
          type: "error",
          text: "Could not reach the server.",
        })
      }
    })
  }

  function handleDeleteAccount() {
    setDeleteError(null)

    startDeleteTransition(async () => {
      try {
        const response = await fetch("/api/account/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: deletePassword }),
        })
        const result = await response.json()

        if (!response.ok || !result.success) {
          setDeleteError(result.error ?? "Could not delete account.")
          return
        }

        setDeleteOpen(false)
        await signOut()
        router.replace("/")
      } catch {
        setDeleteError("Could not reach the server.")
      }
    })
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
          Update your public writer profile and account security.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink-fg)]">
          Public profile
        </h2>
        <p className="mt-1 font-serif text-[13px] text-[var(--ink-muted)]">
          Shown on your profile page and on pieces you publish.
        </p>

        {profileMessage && (
          <div className="mt-4">
            <StatusMessage type={profileMessage.type} message={profileMessage.text} />
          </div>
        )}

        <form className="mt-5 space-y-4" onSubmit={saveProfile}>
          <div className="space-y-2">
            <Label
              htmlFor="settings-email"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Email
            </Label>
            <Input
              id="settings-email"
              type="email"
              value={email}
              readOnly
              className={`${fieldClassName} text-[var(--ink-muted)]`}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="settings-name"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Display name
            </Label>
            <Input
              id="settings-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={fieldClassName}
            />
            <FieldError message={profileFieldErrors.name?.[0]} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="settings-handle"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Handle
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-sans text-sm text-[var(--ink-subtle)]">
                @
              </span>
              <Input
                id="settings-handle"
                name="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
                className={`${fieldClassName} pl-7`}
              />
            </div>
            <FieldError message={profileFieldErrors.handle?.[0]} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="settings-location"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Location
            </Label>
            <Input
              id="settings-location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, country"
              className={fieldClassName}
            />
            <FieldError message={profileFieldErrors.location?.[0]} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="settings-bio"
              className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
            >
              Bio
            </Label>
            <textarea
              id="settings-bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="A short introduction for readers"
              className="w-full resize-none rounded-lg border border-[var(--ink-border)] bg-transparent p-3 font-serif text-[13px] leading-relaxed text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 focus:border-[var(--ink-fg)]/40"
            />
            <FieldError message={profileFieldErrors.bio?.[0]} />
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="inline-flex rounded-full bg-[var(--ink-fg)] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] disabled:opacity-60"
          >
            {isSavingProfile ? "Saving…" : "Save profile"}
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6">
        <h2 className="font-serif text-lg font-semibold text-[var(--ink-fg)]">
          Change password
        </h2>
        <p className="mt-1 font-serif text-[13px] text-[var(--ink-muted)]">
          Update the password you use to sign in.
        </p>

        {passwordMessage && (
          <div className="mt-4">
            <StatusMessage
              type={passwordMessage.type}
              message={passwordMessage.text}
            />
          </div>
        )}

        <form className="mt-5 space-y-4" onSubmit={changePasswordSubmit}>
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={fieldClassName}
            />
            <FieldError message={passwordFieldErrors.currentPassword?.[0]} />
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={fieldClassName}
            />
            <FieldError message={passwordFieldErrors.newPassword?.[0]} />
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={fieldClassName}
            />
            <FieldError message={passwordFieldErrors.confirmPassword?.[0]} />
          </div>
          <button
            type="submit"
            disabled={isChangingPassword}
            className="inline-flex rounded-full bg-[var(--ink-fg)] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] disabled:opacity-60"
          >
            {isChangingPassword ? "Updating…" : "Update password"}
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
                All of your writing, drafts, and profile data will be removed
                permanently. Enter your password to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 py-2">
              <Label
                htmlFor="delete-password"
                className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
              >
                Password
              </Label>
              <Input
                id="delete-password"
                type="password"
                autoComplete="current-password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className={fieldClassName}
              />
              {deleteError && (
                <p className="font-sans text-[12px] text-[#a33f3f]">
                  {deleteError}
                </p>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="font-sans text-[11px]"
                disabled={isDeleting}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  handleDeleteAccount()
                }}
                disabled={isDeleting || !deletePassword}
                className="bg-[#a33f3f] font-sans text-[11px] hover:bg-[#8a3333]"
              >
                {isDeleting ? "Deleting…" : "Delete account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  )
}
