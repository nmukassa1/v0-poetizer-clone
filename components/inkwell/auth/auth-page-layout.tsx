import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type AuthPageLayoutProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
};

export function AuthPageLayout({
  imageSrc,
  imageAlt,
  children,
}: AuthPageLayoutProps) {
  return (
    <div className="grid w-full lg:min-h-[calc(100dvh-10rem)] lg:grid-cols-2">
      <aside className="relative aspect-[5/4] w-full overflow-hidden border-b border-[var(--ink-border)] bg-[#ebe8e0] sm:aspect-[3/2] lg:aspect-auto lg:min-h-[520px] lg:border-b-0 lg:border-r hidden lg:block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center grayscale contrast-[1.05] "
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,#000_6%,transparent),transparent_55%)]"
          aria-hidden
        />
      </aside>

      <div className="flex flex-col px-4 py-8 min-[480px]:px-8 min-[480px]:py-10 lg:justify-center lg:px-12 lg:py-12 xl:px-16">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 font-sans text-[11px] font-medium tracking-wide text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to feed
        </Link>

        <div className="mx-auto mt-6 w-full max-w-[440px] lg:mx-0 lg:mt-8 lg:max-w-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}
