"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const fieldClassName =
  "border-[var(--ink-border)] bg-transparent font-sans text-sm text-[var(--ink-fg)]"

function AuthFormShell({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
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

      <div className="mt-6 space-y-4">{children}</div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full justify-center rounded-full bg-[var(--ink-fg)] px-5 py-2.5 font-sans text-[11px] font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90 min-[480px]:w-auto"
      >
        {title}
      </button>

      <p className="mt-6 text-center font-sans text-[13px] text-[var(--ink-muted)]">
        {footer}
      </p>
    </form>
  )
}

export function SignInForm() {
  return (
    <AuthFormShell
      title="Sign in"
      description="Welcome back. Pick up where you left off."
      footer={
        <>
          New to inkwell?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[var(--ink-fg)] underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </>
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
          className={fieldClassName}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label
            htmlFor="sign-in-password"
            className="font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)]"
          >
            Password
          </Label>
          <Link
            href="#"
            className="font-sans text-[11px] font-medium text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--ink-fg)] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="sign-in-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClassName}
        />
      </div>
    </AuthFormShell>
  )
}

export function SignUpForm() {
  return (
    <AuthFormShell
      title="Sign up"
      description="Join inkwell and start sharing your writing."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[var(--ink-fg)] underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </>
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
        <p className="font-sans text-[11px] text-[var(--ink-subtle)]">
          Your public profile URL will be inkwell.com/profile/yourname
        </p>
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
      </div>

      <p className="font-sans text-[11px] leading-relaxed text-[var(--ink-subtle)]">
        By creating an account, you agree to our{" "}
        <Link
          href="#"
          className="text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--ink-fg)] hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--ink-fg)] hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          Privacy Policy
        </Link>
        .
      </p>
    </AuthFormShell>
  )
}
