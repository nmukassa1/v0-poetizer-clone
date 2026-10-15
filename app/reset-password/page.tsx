import {
  ResetLinkInvalid,
  ResetPasswordForm,
} from "@/components/inkwell/auth/reset-password-form"
import { AuthPageLayout } from "@/components/inkwell/auth/auth-page-layout"

export const metadata = {
  title: "Choose a new password | inkwell",
  description: "Set a new password for your inkwell account.",
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>
}) {
  const { token, error } = await searchParams

  return (
    <AuthPageLayout
      imageSrc="/images/auth-typewriter.png"
      imageAlt="Illustration of a person typing at a vintage typewriter"
    >
      {token && !error ? <ResetPasswordForm token={token} /> : <ResetLinkInvalid />}
    </AuthPageLayout>
  )
}
