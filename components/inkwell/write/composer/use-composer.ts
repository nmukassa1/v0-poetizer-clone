"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { ContentTag } from "@/lib/feed"
import type { PublishPieceResult } from "@/lib/piece/publish"
import type {
  ComposerAuthor,
  ComposerInitialDraft,
  ComposerLinkedPrompt,
  Phase,
  Visibility,
} from "./types"

function wordCountFromHtml(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ")
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function useComposer(
  author: ComposerAuthor,
  initialDraft?: ComposerInitialDraft | null,
  linkedPrompt: ComposerLinkedPrompt | null = null,
) {
  const router = useRouter()
  const authorName = author?.name ?? "You"

  const [pieceId, setPieceId] = useState<string | null>(
    initialDraft?.pieceId ?? null,
  )
  const [type, setType] = useState<ContentTag>(initialDraft?.type ?? "essay")
  const [title, setTitle] = useState(initialDraft?.title ?? "")
  const [bodyHtml, setBodyHtml] = useState(initialDraft?.bodyHtml ?? "")
  const [excerpt, setExcerpt] = useState(initialDraft?.excerpt ?? "")
  const [excerptOverridden, setExcerptOverridden] = useState(
    initialDraft?.excerptOverridden ?? false,
  )
  const [tags, setTags] = useState<string[]>(initialDraft?.tags ?? [])
  const [tagDraft, setTagDraft] = useState("")
  const [visibility, setVisibility] = useState<Visibility>(
    initialDraft?.visibility ?? "public",
  )
  const [wordCount, setWordCount] = useState(
    initialDraft ? wordCountFromHtml(initialDraft.bodyHtml) : 0,
  )
  const [savedAt, setSavedAt] = useState<Date | null>(
    initialDraft?.updatedAt ?? null,
  )
  const [savedAgoText, setSavedAgoText] = useState("")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>("edit")
  const [publishedPieceId, setPublishedPieceId] = useState<string | null>(null)
  const [publishError, setPublishError] = useState<string | null>(null)
  const [isPublishing, startPublishTransition] = useTransition()
  const [popover, setPopover] = useState<{ x: number; y: number } | null>(null)

  const bodyRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const initialBodySet = useRef(false)

  useEffect(() => {
    if (!bodyRef.current || initialBodySet.current) return
    bodyRef.current.innerHTML = bodyHtml
    initialBodySet.current = true
  }, [bodyHtml])

  function recalcFromEditor() {
    if (!bodyRef.current) return
    const html = bodyRef.current.innerHTML
    const text = bodyRef.current.textContent || ""
    const words = text.trim().split(/\s+/).filter(Boolean)
    setBodyHtml(html)
    setWordCount(words.length)
    if (!excerptOverridden) {
      const first = words.slice(0, 30).join(" ")
      setExcerpt(first + (words.length > 30 ? "…" : ""))
    }
  }

  useEffect(() => {
    if (phase !== "edit") return
    const handler = setTimeout(() => {
      if (title.trim() === "" && bodyHtml.trim() === "") return
      setSavedAt(new Date())
    }, 800)
    return () => clearTimeout(handler)
  }, [type, title, bodyHtml, excerpt, tags, visibility, phase])

  useEffect(() => {
    const update = () => {
      if (!savedAt) {
        setSavedAgoText("")
        return
      }
      const seconds = Math.round((Date.now() - savedAt.getTime()) / 1000)
      if (seconds < 4) setSavedAgoText("saved just now")
      else if (seconds < 60) setSavedAgoText(`saved ${seconds}s ago`)
      else setSavedAgoText(`saved ${Math.round(seconds / 60)}m ago`)
    }
    update()
    const interval = setInterval(update, 5000)
    return () => clearInterval(interval)
  }, [savedAt])

  useEffect(() => {
    if (phase !== "edit") {
      setPopover(null)
      return
    }
    const onSelectionChange = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPopover(null)
        return
      }
      const range = sel.getRangeAt(0)
      if (
        !bodyRef.current ||
        !bodyRef.current.contains(range.commonAncestorContainer)
      ) {
        setPopover(null)
        return
      }
      if (sel.toString().trim().length === 0) {
        setPopover(null)
        return
      }
      const rect = range.getBoundingClientRect()
      setPopover({
        x: rect.left + rect.width / 2,
        y: rect.top - 6,
      })
    }
    const finalize = () => setTimeout(onSelectionChange, 10)
    document.addEventListener("mouseup", finalize)
    document.addEventListener("touchend", finalize)
    document.addEventListener("selectionchange", onSelectionChange)
    return () => {
      document.removeEventListener("mouseup", finalize)
      document.removeEventListener("touchend", finalize)
      document.removeEventListener("selectionchange", onSelectionChange)
    }
  }, [phase])

  function applyFormat(cmd: string, value?: string) {
    document.execCommand(cmd, false, value)
    bodyRef.current?.focus()
    setTimeout(recalcFromEditor, 0)
  }

  function applyLink() {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) return
    const url = window.prompt("URL", "https://")
    if (!url) return
    applyFormat("createLink", url)
  }

  function commitTag() {
    const v = tagDraft.trim().toLowerCase().replace(/^#/, "")
    if (!v || tags.includes(v) || tags.length >= 5) return
    setTags([...tags, v])
    setTagDraft("")
  }

  function removeTag(t: string) {
    setTags(tags.filter((x) => x !== t))
  }

  function startPreview() {
    setPhase("preview")
    if (typeof window !== "undefined") window.scrollTo({ top: 0 })
  }

  function backToEdit() {
    setPhase("edit")
    setTimeout(() => {
      if (bodyRef.current && bodyHtml) {
        bodyRef.current.innerHTML = bodyHtml
      }
    }, 10)
  }

  function confirmPublish() {
    setPublishError(null)
    const body = bodyRef.current?.innerHTML ?? bodyHtml
    if (!body.replace(/<[^>]+>/g, "").trim()) {
      setPublishError("Add some writing before publishing.")
      return
    }

    const payload = {
      title: title.trim() || "Untitled",
      body,
      type,
      excerpt: excerpt.trim() || undefined,
      visibility,
      tags,
      promptSlug: linkedPrompt?.slug ?? initialDraft?.promptSlug ?? undefined,
    }

    startPublishTransition(async () => {
      try {
        const response = await fetch(
          pieceId ? `/api/pieces/${pieceId}` : "/api/pieces",
          {
            method: pieceId ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        )

        const result = (await response.json()) as PublishPieceResult

        if (!response.ok || !result.success) {
          setPublishError(
            result.success === false
              ? result.error
              : "Could not publish. Please try again.",
          )
          return
        }

        if (!pieceId) {
          setPieceId(result.pieceId)
          router.replace(`/write?pieceId=${result.pieceId}`)
        }

        setPublishedPieceId(result.pieceId)
        setSavedAt(new Date())
        setPhase("published")
        if (typeof window !== "undefined") window.scrollTo({ top: 0 })
      } catch {
        setPublishError("Could not reach the server. Check your connection.")
      }
    })
  }

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const settingsProps = {
    type,
    onTypeChange: setType,
    excerpt,
    onExcerptChange: (value: string, overridden: boolean) => {
      setExcerpt(value)
      if (overridden) setExcerptOverridden(true)
    },
    excerptOverridden,
    onResetExcerpt: () => setExcerptOverridden(false),
    tags,
    tagDraft,
    onTagDraftChange: setTagDraft,
    onCommitTag: commitTag,
    onRemoveTag: removeTag,
    visibility,
    onVisibilityChange: setVisibility,
    savedAgoText,
  }

  return {
    authorName,
    phase,
    pieceId,
    title,
    setTitle,
    type,
    bodyHtml,
    excerpt,
    tags,
    visibility,
    wordCount,
    settingsOpen,
    setSettingsOpen,
    publishedPieceId,
    publishError,
    isPublishing,
    popover,
    bodyRef,
    titleRef,
    today,
    linkedPrompt,
    settingsProps,
    recalcFromEditor,
    applyFormat,
    applyLink,
    startPreview,
    backToEdit,
    confirmPublish,
  }
}
