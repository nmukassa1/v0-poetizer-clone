"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { slugifyPromptTitle } from "@/lib/prompts/slug"
import type { PromptStatus as UiPromptStatus } from "@/lib/feed"

type AdminPrompt = {
  id: string
  slug: string
  title: string
  description: string
  status: "ACTIVE" | "VOTING" | "CLOSED"
  startsAt: string
  endsAt: string
  submissionCount: number
}

type FormState = {
  title: string
  slug: string
  description: string
  status: AdminPrompt["status"]
  startsAt: string
  endsAt: string
}

const STATUS_OPTIONS: AdminPrompt["status"][] = ["ACTIVE", "VOTING", "CLOSED"]

function toLocalInputValue(iso: string) {
  const date = new Date(iso)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60_000)
  return local.toISOString().slice(0, 16)
}

function fromLocalInputValue(value: string) {
  return new Date(value).toISOString()
}

function defaultFormState(): FormState {
  const startsAt = new Date()
  startsAt.setMinutes(0, 0, 0)
  const endsAt = new Date(startsAt)
  endsAt.setDate(endsAt.getDate() + 7)

  return {
    title: "",
    slug: "",
    description: "",
    status: "CLOSED",
    startsAt: toLocalInputValue(startsAt.toISOString()),
    endsAt: toLocalInputValue(endsAt.toISOString()),
  }
}

function promptToFormState(prompt: AdminPrompt): FormState {
  return {
    title: prompt.title,
    slug: prompt.slug,
    description: prompt.description,
    status: prompt.status,
    startsAt: toLocalInputValue(prompt.startsAt),
    endsAt: toLocalInputValue(prompt.endsAt),
  }
}

function statusLabel(status: AdminPrompt["status"] | UiPromptStatus) {
  switch (status) {
    case "ACTIVE":
    case "active":
      return "Live"
    case "VOTING":
    case "voting":
      return "Voting"
    case "CLOSED":
    case "closed":
      return "Closed"
  }
}

function AdminPromptForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: FormState
  submitLabel: string
  onSubmit: (payload: {
    title: string
    slug: string
    description: string
    status: AdminPrompt["status"]
    startsAt: string
    endsAt: string
  }) => Promise<void>
  onCancel?: () => void
}) {
  const [form, setForm] = useState(initial)
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug))
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <form
      className="space-y-4 rounded-xl border border-[var(--ink-border)] bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)
        void onSubmit({
          ...form,
          startsAt: fromLocalInputValue(form.startsAt),
          endsAt: fromLocalInputValue(form.endsAt),
        })
          .catch(() => setError("Could not save prompt."))
          .finally(() => setIsSubmitting(false))
      }}
    >
      <div className="grid gap-4 min-[480px]:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            Title
          </span>
          <input
            required
            value={form.title}
            onChange={(event) => {
              const title = event.target.value
              setForm((current) => ({
                ...current,
                title,
                slug: slugTouched ? current.slug : slugifyPromptTitle(title),
              }))
            }}
            className="w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-serif text-sm"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            Slug
          </span>
          <input
            required
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true)
              setForm((current) => ({ ...current, slug: event.target.value }))
            }}
            className="w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
          Description
        </span>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({ ...current, description: event.target.value }))
          }
          className="w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-serif text-sm leading-relaxed"
        />
      </label>

      <div className="grid gap-4 min-[480px]:grid-cols-3">
        <label className="block space-y-1.5">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            Status
          </span>
          <select
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                status: event.target.value as AdminPrompt["status"],
              }))
            }
            className="w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-sans text-sm"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            Starts
          </span>
          <input
            required
            type="datetime-local"
            value={form.startsAt}
            onChange={(event) =>
              setForm((current) => ({ ...current, startsAt: event.target.value }))
            }
            className="w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-sans text-sm"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            Ends
          </span>
          <input
            required
            type="datetime-local"
            value={form.endsAt}
            onChange={(event) =>
              setForm((current) => ({ ...current, endsAt: event.target.value }))
            }
            className="w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-sans text-sm"
          />
        </label>
      </div>

      {error ? (
        <p className="font-sans text-sm text-[#a33f3f]">{error}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[var(--ink-fg)] px-4 py-2 font-sans text-sm font-semibold text-[var(--ink-bg)] disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--ink-border)] px-4 py-2 font-sans text-sm font-semibold"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export function AdminPromptsPage({ prompts }: { prompts: AdminPrompt[] }) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(prompts.length === 0)

  const editingPrompt = useMemo(
    () => prompts.find((prompt) => prompt.id === editingId) ?? null,
    [prompts, editingId],
  )

  async function refresh() {
    router.refresh()
  }

  async function createPrompt(payload: {
    title: string
    slug: string
    description: string
    status: AdminPrompt["status"]
    startsAt: string
    endsAt: string
  }) {
    const response = await fetch("/api/admin/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = (await response.json()) as {
      success: boolean
      error?: string
    }

    if (!response.ok || !result.success) {
      throw new Error(result.error ?? "Could not create prompt.")
    }

    setShowCreate(false)
    await refresh()
  }

  async function updatePrompt(
    id: string,
    payload: {
      title: string
      slug: string
      description: string
      status: AdminPrompt["status"]
      startsAt: string
      endsAt: string
    },
  ) {
    const response = await fetch(`/api/admin/prompts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = (await response.json()) as {
      success: boolean
      error?: string
    }

    if (!response.ok || !result.success) {
      throw new Error(result.error ?? "Could not update prompt.")
    }

    setEditingId(null)
    await refresh()
  }

  async function deletePrompt(id: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return

    const response = await fetch(`/api/admin/prompts/${id}`, {
      method: "DELETE",
    })

    const result = (await response.json()) as {
      success: boolean
      error?: string
    }

    if (!response.ok || !result.success) {
      window.alert(result.error ?? "Could not delete prompt.")
      return
    }

    if (editingId === id) setEditingId(null)
    await refresh()
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 min-[480px]:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
            Admin
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[var(--ink-fg)]">
            Manage prompts
          </h1>
          <p className="mt-2 max-w-2xl font-sans text-sm text-[var(--ink-muted)]">
            Create weekly prompts, set one live at a time, and review submission
            counts. This page is public for now and will be restricted to admins
            later.
          </p>
        </div>
        {!showCreate ? (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setShowCreate(true)
            }}
            className="rounded-lg bg-[var(--ink-prompt-btn)] px-4 py-2 font-sans text-sm font-semibold text-white"
          >
            New prompt
          </button>
        ) : null}
      </div>

      {showCreate ? (
        <div className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium">Create prompt</h2>
          <AdminPromptForm
            initial={defaultFormState()}
            submitLabel="Create prompt"
            onSubmit={createPrompt}
            onCancel={() => setShowCreate(false)}
          />
        </div>
      ) : null}

      {editingPrompt ? (
        <div className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium">
            Edit “{editingPrompt.title}”
          </h2>
          <AdminPromptForm
            key={editingPrompt.id}
            initial={promptToFormState(editingPrompt)}
            submitLabel="Save changes"
            onSubmit={(payload) => updatePrompt(editingPrompt.id, payload)}
            onCancel={() => setEditingId(null)}
          />
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-[var(--ink-border)]">
        <table className="min-w-full divide-y divide-[var(--ink-border)]">
          <thead className="bg-[color-mix(in_srgb,var(--ink-bg)_92%,var(--ink-border))]">
            <tr>
              {["Prompt", "Status", "Window", "Submissions", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--ink-border-soft)] bg-white">
            {prompts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center font-serif text-[var(--ink-muted)]"
                >
                  No prompts yet. Create the first one above.
                </td>
              </tr>
            ) : (
              prompts.map((prompt) => (
                <tr key={prompt.id}>
                  <td className="px-4 py-4">
                    <p className="font-serif text-base font-semibold text-[var(--ink-fg)]">
                      {prompt.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[var(--ink-subtle)]">
                      /prompt/{prompt.slug}
                    </p>
                  </td>
                  <td className="px-4 py-4 font-sans text-sm">
                    {statusLabel(prompt.status)}
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-[var(--ink-muted)]">
                    {new Date(prompt.startsAt).toLocaleDateString()} –{" "}
                    {new Date(prompt.endsAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 font-sans text-sm tabular-nums">
                    {prompt.submissionCount}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreate(false)
                          setEditingId(prompt.id)
                        }}
                        className="rounded-md border border-[var(--ink-border)] px-3 py-1.5 font-sans text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void deletePrompt(prompt.id, prompt.title)}
                        className="rounded-md border border-[#e7c3c3] px-3 py-1.5 font-sans text-xs font-semibold text-[#a33f3f]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
