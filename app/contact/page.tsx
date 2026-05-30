import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ContactForm } from "@/components/inkwell/contact-form"

export const metadata = {
  title: "Contact | inkwell",
  description: "Get in touch with the inkwell team.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[560px] px-4 pb-20 pt-6 min-[480px]:px-6 lg:px-8 lg:pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to feed
      </Link>

      <header className="mt-6">
        <h1 className="font-serif text-2xl font-semibold text-[var(--ink-fg)] min-[480px]:text-3xl">
          Contact
        </h1>
        <p className="mt-2 font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
          Questions, feedback, or partnership ideas — we&apos;d love to hear from
          you.
        </p>
      </header>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  )
}
