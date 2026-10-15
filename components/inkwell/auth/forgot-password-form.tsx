"use client"

import { useActionState } from "react"
import { requestPasswordResetAction } from "@/app/actions/request-password-reset"
import {
  AuthFormFooter,
  AuthFormShell,
  FieldError,
  fieldClassName,
} from "@/components/inkwell/auth/auth-form-shell"
import { initialAuthState } from "@/lib/auth/form-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(
    requestPasswordResetAction,
    initialAuthState,
  )

  return (
    <AuthFormShell
      title="Reset password"
      description="Enter the email you signed up with and we'll send you a link to choose a new password."
      submitLabel="Send reset link"
      action={formAction}
      state={state}
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
          htmlFor="forgot-password-email"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Email
        </Label>
        <Input
          id="forgot-password-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.email?.[0]} />
      </div>
    </AuthFormShell>
  )
}
