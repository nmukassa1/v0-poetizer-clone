"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type ProfileEditData = {
  name: string
  handle: string
  bio: string
  location: string
}

export const profileFieldClassName =
  "border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"

export function ProfileFieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="font-sans text-[12px] text-[#a33f3f]">{message}</p>
}

export function ProfileStatusMessage({
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

export function ProfileEditForm({
  initialProfile,
  email,
  showEmail = false,
  idPrefix = "profile",
  submitLabel = "Save profile",
  onSaved,
}: {
  initialProfile: ProfileEditData
  email?: string
  showEmail?: boolean
  idPrefix?: string
  submitLabel?: string
  onSaved?: (profile: ProfileEditData) => void
}) {
  const router = useRouter()
  const [name, setName] = useState(initialProfile.name)
  const [handle, setHandle] = useState(initialProfile.handle)
  const [bio, setBio] = useState(initialProfile.bio)
  const [location, setLocation] = useState(initialProfile.location)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({})
  const [isSaving, startSaveTransition] = useTransition()

  function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setFieldErrors({})

    startSaveTransition(async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, handle, bio, location }),
        })
        const result = await response.json()

        if (!response.ok || !result.success) {
          setFieldErrors(result.fieldErrors ?? {})
          setMessage({
            type: "error",
            text: result.error ?? "Could not save profile.",
          })
          return
        }

        const saved: ProfileEditData = {
          name: result.profile.name,
          handle: result.profile.handle,
          bio: result.profile.bio,
          location: result.profile.location,
        }

        setName(saved.name)
        setHandle(saved.handle)
        setBio(saved.bio)
        setLocation(saved.location)
        setMessage({ type: "success", text: "Profile saved." })
        router.refresh()
        onSaved?.(saved)
      } catch {
        setMessage({
          type: "error",
          text: "Could not reach the server.",
        })
      }
    })
  }

  return (
    <form className="space-y-4" onSubmit={saveProfile}>
      {message ? (
        <ProfileStatusMessage type={message.type} message={message.text} />
      ) : null}

      {showEmail && email ? (
        <div className="space-y-2">
          <Label
            htmlFor={`${idPrefix}-email`}
            className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
          >
            Email
          </Label>
          <Input
            id={`${idPrefix}-email`}
            type="email"
            value={email}
            readOnly
            className={`${profileFieldClassName} text-[var(--ink-muted)]`}
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label
          htmlFor={`${idPrefix}-name`}
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Display name
        </Label>
        <Input
          id={`${idPrefix}-name`}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={profileFieldClassName}
        />
        <ProfileFieldError message={fieldErrors.name?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={`${idPrefix}-handle`}
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Handle
        </Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-sans text-sm text-[var(--ink-subtle)]">
            @
          </span>
          <Input
            id={`${idPrefix}-handle`}
            name="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value.toLowerCase())}
            required
            className={`${profileFieldClassName} pl-7`}
          />
        </div>
        <ProfileFieldError message={fieldErrors.handle?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={`${idPrefix}-location`}
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Location
        </Label>
        <Input
          id={`${idPrefix}-location`}
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, country"
          className={profileFieldClassName}
        />
        <ProfileFieldError message={fieldErrors.location?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor={`${idPrefix}-bio`}
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Bio
        </Label>
        <textarea
          id={`${idPrefix}-bio`}
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="A short introduction for readers"
          className="w-full resize-none rounded-lg border border-[var(--ink-border)] bg-transparent p-3 font-serif text-[13px] leading-relaxed text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 focus:border-[var(--ink-fg)]/40"
        />
        <ProfileFieldError message={fieldErrors.bio?.[0]} />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex rounded-full bg-[var(--ink-fg)] px-4 py-2 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] disabled:opacity-60"
      >
        {isSaving ? "Saving…" : submitLabel}
      </button>
    </form>
  )
}
