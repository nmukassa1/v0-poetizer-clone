"use client"

import { useActionState } from "react"
import Link from "next/link"
import { resetPasswordAction } from "@/app/actions/reset-password"
import {
  AuthFormFooter,
  AuthFormShell,
  FieldError,
  fieldClassName,
} from "@/components/inkwell/auth/auth-form-shell"
import { initialAuthState } from "@/lib/auth/form-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetLinkInvalid() {
  return (
    <div className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-6">
      <h2 className="font-serif text-xl font-semibold text-[var(--ink-fg)] min-[480px]:text-2xl">
        Link expired
      </h2>
      <p className="mt-2 font-serif text-[14px] leading-relaxed text-[var(--ink-muted)]">
        This reset link is invalid or has expired. Reset links are valid for
        15 minutes and can only be used once.
      </p>
      <Link
        href="/forgot-password"
        className="mt-6 inline-flex w-full justify-center rounded-full bg-[var(--ink-fg)] px-5 py-2.5 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 min-[480px]:w-auto"
      >
        Request a new link
      </Link>
      <p className="mt-6 text-center font-sans text-[13px] text-[var(--ink-muted)]">
        <AuthFormFooter
          prompt="Remembered it?"
          href="/sign-in"
          linkLabel="Sign in"
        />
      </p>
    </div>
  )
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState(
    resetPasswordAction,
    initialAuthState,
  )

  if (state.fieldErrors?.token) {
    return <ResetLinkInvalid />
  }

  return (
    <AuthFormShell
      title="Choose a new password"
      description="Pick something you haven't used here before."
      submitLabel="Update password"
      action={formAction}
      state={state}
      hiddenFields={<input type="hidden" name="token" value={token} />}
      footer={
        <AuthFormFooter
          prompt="Remembered it?"
          href="/sign-in"
          linkLabel="Sign in"
        />
      }
    >
      <div className="space-y-2">
        <Label
          htmlFor="reset-password"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          New password
        </Label>
        <Input
          id="reset-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.password?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="reset-confirm-password"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Confirm new password
        </Label>
        <Input
          id="reset-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.confirmPassword?.[0]} />
      </div>
    </AuthFormShell>
  )
}
