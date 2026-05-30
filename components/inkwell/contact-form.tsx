"use client"

import { useActionState } from "react"
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialState: ContactFormState = {
  success: false,
  error: null,
}

const fieldClassName =
  "border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  )

  if (state.success) {
    return (
      <div className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-6 min-[480px]:p-8">
        <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-accent,#534AB7)]">
          Message sent
        </p>
        <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink-fg)]">
          Thank you for reaching out.
        </h2>
        <p className="mt-2 font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
          We&apos;ve received your message and will get back to you as soon as we
          can.
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6"
    >
      {state.error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-[#e8d4d4] bg-[color-mix(in_srgb,#fff5f5_40%,var(--ink-bg))] px-3 py-2 font-sans text-[13px] text-[#a33f3f]"
        >
          {state.error}
        </p>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="contact-name"
            className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
          >
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className={fieldClassName}
          />
          {state.fieldErrors?.name?.[0] && (
            <p className="font-sans text-[12px] text-[#a33f3f]">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="contact-email"
            className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
          >
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            className={fieldClassName}
          />
          {state.fieldErrors?.email?.[0] && (
            <p className="font-sans text-[12px] text-[#a33f3f]">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="contact-message"
            className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
          >
            Message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            aria-invalid={Boolean(state.fieldErrors?.message)}
            placeholder="How can we help?"
            className={`${fieldClassName} min-h-[140px] resize-y font-serif leading-relaxed`}
          />
          {state.fieldErrors?.message?.[0] && (
            <p className="font-sans text-[12px] text-[#a33f3f]">
              {state.fieldErrors.message[0]}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex rounded-full bg-[var(--ink-fg)] px-5 py-2.5 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
