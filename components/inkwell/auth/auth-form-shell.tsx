"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import type { AuthFormState } from "@/lib/auth/form-state"

export const fieldClassName =
  "border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex w-full justify-center rounded-full bg-[var(--ink-fg)] px-5 py-2.5 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 min-[480px]:w-auto"
    >
      {pending ? "Please wait…" : label}
    </button>
  )
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="font-sans text-[12px] text-[#a33f3f]">{message}</p>
}

export function AuthFormShell({
  title,
  description,
  action,
  children,
  footer,
  hiddenFields,
  state,
}: {
  title: string
  description: string
  action: (prev: AuthFormState, formData: FormData) => Promise<AuthFormState>
  children: ReactNode
  footer: ReactNode
  hiddenFields?: ReactNode
  state: AuthFormState
}) {
  return (
    <form
      action={action}
      className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6"
    >
      <header>
        <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)] min-[480px]:text-2xl">
          {title}
        </h2>
        <p className="mt-2 font-serif text-[14px] leading-relaxed text-[var(--ink-muted)]">
          {description}
        </p>
      </header>

      {state.error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-[#e8d4d4] bg-[color-mix(in_srgb,#fff5f5_40%,var(--ink-bg))] px-3 py-2 font-sans text-[13px] text-[#a33f3f]"
        >
          {state.error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {hiddenFields}
        {children}
      </div>

      <SubmitButton label={title} />

      <p className="mt-6 text-center font-sans text-[13px] text-[var(--ink-muted)]">
        {footer}
      </p>
    </form>
  )
}

export function AuthFormFooter({
  prompt,
  href,
  linkLabel,
}: {
  prompt: string
  href: string
  linkLabel: string
}) {
  return (
    <>
      {prompt}{" "}
      <Link
        href={href}
        className="font-semibold text-[var(--ink-fg)] underline-offset-2 hover:underline"
      >
        {linkLabel}
      </Link>
    </>
  )
}
