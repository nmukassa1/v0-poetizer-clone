"use client"

import { useActionState } from "react"
import { signInAction } from "@/app/actions/sign-in"
import {
  AuthFormFooter,
  AuthFormShell,
  FieldError,
  fieldClassName,
} from "@/components/inkwell/auth/auth-form-shell"
import { initialAuthState } from "@/lib/auth/form-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const [state, formAction] = useActionState(signInAction, initialAuthState)

  return (
    <AuthFormShell
      title="Sign in"
      description="Welcome back. Pick up where you left off."
      action={formAction}
      state={state}
      hiddenFields={
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      }
      footer={
        <AuthFormFooter
          prompt="New to inkwell?"
          href="/sign-up"
          linkLabel="Create an account"
        />
      }
    >
      <div className="space-y-2">
        <Label
          htmlFor="sign-in-email"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Email
        </Label>
        <Input
          id="sign-in-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.email?.[0]} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label
            htmlFor="sign-in-password"
            className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
          >
            Password
          </Label>
          <span className="font-sans text-[11px] font-medium text-[var(--ink-subtle)]">
            Forgot password? (soon)
          </span>
        </div>
        <Input
          id="sign-in-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.password?.[0]} />
      </div>
    </AuthFormShell>
  )
}
