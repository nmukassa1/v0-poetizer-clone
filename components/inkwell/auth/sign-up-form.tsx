"use client"

import { useActionState } from "react"
import { signUpAction } from "@/app/actions/sign-up"
import {
  AuthFormFooter,
  AuthFormShell,
  FieldError,
  fieldClassName,
} from "@/components/inkwell/auth/auth-form-shell"
import { initialAuthState } from "@/lib/auth/form-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, initialAuthState)

  return (
    <AuthFormShell
      title="Sign up"
      description="Join inkwell and start sharing your writing."
      action={formAction}
      state={state}
      footer={
        <AuthFormFooter
          prompt="Already have an account?"
          href="/sign-in"
          linkLabel="Sign in"
        />
      }
    >
      <div className="space-y-2">
        <Label
          htmlFor="sign-up-name"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Display name
        </Label>
        <Input
          id="sign-up-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.name?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="sign-up-handle"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Handle
        </Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-sans text-sm text-[var(--ink-subtle)]">
            @
          </span>
          <Input
            id="sign-up-handle"
            name="handle"
            type="text"
            autoComplete="username"
            required
            placeholder="yourname"
            className={`${fieldClassName} pl-7`}
          />
        </div>
        <FieldError message={state.fieldErrors?.handle?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="sign-up-email"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Email
        </Label>
        <Input
          id="sign-up-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.email?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="sign-up-password"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Password
        </Label>
        <Input
          id="sign-up-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.password?.[0]} />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="sign-up-confirm-password"
          className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
        >
          Confirm password
        </Label>
        <Input
          id="sign-up-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className={fieldClassName}
        />
        <FieldError message={state.fieldErrors?.confirmPassword?.[0]} />
      </div>
    </AuthFormShell>
  )
}
