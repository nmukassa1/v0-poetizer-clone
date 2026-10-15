import { ForgotPasswordForm } from "@/components/inkwell/auth/forgot-password-form"
import { AuthPageLayout } from "@/components/inkwell/auth/auth-page-layout"

export const metadata = {
  title: "Reset password | inkwell",
  description: "Request a link to reset your inkwell password.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      imageSrc="/images/auth-reading.png"
      imageAlt="Illustration of a person reading a book in an armchair"
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  )
}
