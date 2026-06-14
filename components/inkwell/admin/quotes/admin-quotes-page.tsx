"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/inkwell/admin/admin-page-header"
import type { QuoteView } from "@/lib/quotes/queries"

type FormState = {
  text: string
  author: string
}

function defaultFormState(): FormState {
  return { text: "", author: "" }
}

function quoteToFormState(quote: QuoteView): FormState {
  return { text: quote.text, author: quote.author }
}

function AdminQuoteForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: FormState
  submitLabel: string
  onSubmit: (payload: FormState) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState(initial)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit(form)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="space-y-4 rounded-xl border border-[var(--ink-border)] bg-white p-5"
    >
      <label className="block">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-subtle)]">
          Quote
        </span>
        <textarea
          value={form.text}
          onChange={(event) =>
            setForm((current) => ({ ...current, text: event.target.value }))
          }
          rows={4}
          required
          className="mt-1.5 w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-serif text-sm"
          placeholder="The first draft is just you telling yourself the story."
        />
      </label>

      <label className="block">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-subtle)]">
          Author
        </span>
        <input
          type="text"
          value={form.author}
          onChange={(event) =>
            setForm((current) => ({ ...current, author: event.target.value }))
          }
          required
          className="mt-1.5 w-full rounded-lg border border-[var(--ink-border)] px-3 py-2 font-sans text-sm"
          placeholder="Terry Pratchett"
        />
      </label>

      {error ? (
        <p className="font-sans text-[12px] text-[#a33f3f]" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[var(--ink-prompt-btn)] px-4 py-2 font-sans text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[var(--ink-border)] px-4 py-2 font-sans text-sm font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function AdminQuotesPage({ quotes: initialQuotes }: { quotes: QuoteView[] }) {
  const router = useRouter()
  const [quotes, setQuotes] = useState(initialQuotes)
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingQuote = useMemo(
    () => quotes.find((quote) => quote.id === editingId) ?? null,
    [quotes, editingId],
  )

  async function refresh() {
    const response = await fetch("/api/admin/quotes")
    if (!response.ok) {
      throw new Error("Could not refresh quotes.")
    }
    const data = (await response.json()) as { quotes: QuoteView[] }
    setQuotes(data.quotes)
    router.refresh()
  }

  async function createQuote(payload: FormState) {
    const response = await fetch("/api/admin/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = (await response.json()) as {
      success?: boolean
      error?: string
    }

    if (!response.ok || !result.success) {
      throw new Error(result.error ?? "Could not create quote.")
    }

    setShowCreate(false)
    await refresh()
  }

  async function updateQuote(id: string, payload: FormState) {
    const response = await fetch(`/api/admin/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = (await response.json()) as {
      success?: boolean
      error?: string
    }

    if (!response.ok || !result.success) {
      throw new Error(result.error ?? "Could not update quote.")
    }

    setEditingId(null)
    await refresh()
  }

  async function deleteQuote(id: string, preview: string) {
    const label = preview.length > 60 ? `${preview.slice(0, 60)}…` : preview
    if (!window.confirm(`Delete “${label}”?`)) return

    const response = await fetch(`/api/admin/quotes/${id}`, {
      method: "DELETE",
    })

    const result = (await response.json()) as {
      success?: boolean
      error?: string
    }

    if (!response.ok || !result.success) {
      window.alert(result.error ?? "Could not delete quote.")
      return
    }

    if (editingId === id) setEditingId(null)
    await refresh()
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 min-[480px]:px-6 lg:px-8">
      <AdminPageHeader
        title="Manage quotes"
        description="Add quotes for readers. The app rotates through them daily."
        action={
          !showCreate ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setShowCreate(true)
              }}
              className="rounded-lg bg-[var(--ink-prompt-btn)] px-4 py-2 font-sans text-sm font-semibold text-white"
            >
              New quote
            </button>
          ) : undefined
        }
      />

      {showCreate ? (
        <div className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium">Add quote</h2>
          <AdminQuoteForm
            initial={defaultFormState()}
            submitLabel="Add quote"
            onSubmit={createQuote}
            onCancel={() => setShowCreate(false)}
          />
        </div>
      ) : null}

      {editingQuote ? (
        <div className="mb-8">
          <h2 className="mb-3 font-serif text-xl font-medium">Edit quote</h2>
          <AdminQuoteForm
            key={editingQuote.id}
            initial={quoteToFormState(editingQuote)}
            submitLabel="Save changes"
            onSubmit={(payload) => updateQuote(editingQuote.id, payload)}
            onCancel={() => setEditingId(null)}
          />
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-[var(--ink-border)]">
        <table className="min-w-full divide-y divide-[var(--ink-border)]">
          <thead className="bg-[color-mix(in_srgb,var(--ink-bg)_92%,var(--ink-border))]">
            <tr>
              {["Quote", "Author", "Added", "Actions"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--ink-border-soft)] bg-white">
            {quotes.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center font-serif text-[var(--ink-muted)]"
                >
                  No quotes yet. Add the first one above.
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="max-w-md px-4 py-4">
                    <p className="line-clamp-3 font-serif text-sm leading-relaxed text-[var(--ink-fg)]">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-[var(--ink-muted)]">
                    {quote.author}
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-[var(--ink-muted)]">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreate(false)
                          setEditingId(quote.id)
                        }}
                        className="rounded-md border border-[var(--ink-border)] px-3 py-1.5 font-sans text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteQuote(quote.id, quote.text)}
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
