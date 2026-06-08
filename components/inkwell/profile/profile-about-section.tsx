"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"
import type { ContentTag, PiecePost } from "@/lib/feed"
import type { PublicProfile } from "@/lib/profile"
import { Tag } from "@/components/inkwell/primitives"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import type { ProfileMode } from "./types"

type ProfileAboutSectionProps = {
  mode: ProfileMode
  profile: PublicProfile
  pieces: PiecePost[]
  canEdit?: boolean
}

export function ProfileAboutSection({
  mode,
  profile,
  pieces,
  canEdit = false,
}: ProfileAboutSectionProps) {
  const router = useRouter()
  const [about, setAbout] = useState(profile.about)
  const [draftAbout, setDraftAbout] = useState(profile.about)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, startSaveTransition] = useTransition()

  useEffect(() => {
    setAbout(profile.about)
  }, [profile.about])

  const contentTypes = [...new Set(pieces.map((piece) => piece.type))]
  const locationLabel =
    profile.location?.trim() && profile.location !== "—"
      ? profile.location
      : null

  function openEditor() {
    setDraftAbout(about)
    setError(null)
    setOpen(true)
  }

  function saveAbout() {
    setError(null)
    startSaveTransition(async () => {
      try {
        const response = await fetch("/api/profile/about", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ about: draftAbout }),
        })
        const result = (await response.json()) as {
          success: boolean
          about?: string
          error?: string
          fieldErrors?: { about?: string[] }
        }

        if (!response.ok || !result.success) {
          setError(
            result.fieldErrors?.about?.[0] ??
              result.error ??
              "Could not save your about section.",
          )
          return
        }

        const savedAbout = result.about ?? draftAbout
        setAbout(savedAbout)
        setOpen(false)
        router.refresh()
      } catch {
        setError("Could not reach the server.")
      }
    })
  }

  return (
    <>
      <article className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)]">
            About {profile.name.split(" ")[0]}
          </h2>
          {canEdit ? (
            <button
              type="button"
              onClick={openEditor}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--ink-border)] px-3 py-1.5 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
            >
              <Pencil className="h-3 w-3" strokeWidth={2} />
              Edit
            </button>
          ) : null}
        </div>

        {about.trim() ? (
          <p className="mt-3 whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
            {about}
          </p>
        ) : (
          <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-[var(--ink-subtle)]">
            {canEdit
              ? "Tell readers about your writing — background, themes, and what draws you to the page."
              : `${profile.name.split(" ")[0]} hasn't added an about section yet.`}
          </p>
        )}

        {locationLabel ? (
          <p className="mt-4 font-sans text-[12px] text-[var(--ink-subtle)]">
            Based in {locationLabel}
          </p>
        ) : null}

        {contentTypes.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {contentTypes.map((kind) => (
              <Tag key={kind} label={kind as ContentTag} />
            ))}
          </div>
        ) : mode === "me" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {(["poem", "story", "essay"] as ContentTag[]).map((kind) => (
              <Tag key={kind} label={kind} />
            ))}
          </div>
        ) : null}
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit about</DialogTitle>
            <DialogDescription className="font-serif">
              Your long-form about section — separate from the short bio in your
              profile header.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={draftAbout}
            onChange={(event) => setDraftAbout(event.target.value)}
            rows={10}
            maxLength={2000}
            placeholder="What you write about, where you draw inspiration, publications, and anything else you'd like readers to know…"
            disabled={isSaving}
            className="min-h-48 resize-y border-neutral-200 bg-white font-serif text-sm leading-relaxed text-neutral-950 placeholder:text-neutral-400 focus-visible:border-neutral-950 focus-visible:ring-neutral-950/10"
          />

          {error ? (
            <p className="font-sans text-[12px] text-[#a33f3f]" role="alert">
              {error}
            </p>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSaving}
              className="rounded-full border-neutral-200 font-sans text-[11px] font-semibold tracking-wide"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={saveAbout}
              disabled={isSaving}
              className="rounded-full bg-neutral-950 font-sans text-[11px] font-semibold tracking-wide text-white hover:bg-neutral-800"
            >
              {isSaving ? "Saving…" : "Save about"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
