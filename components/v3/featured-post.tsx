"use client"

import Link from "next/link"
import { MessageCircle, Heart, UserPlus } from "lucide-react"
import type { ContentItem } from "@/lib/content"

export function FeaturedPost({ item }: { item: ContentItem }) {
  const excerpt = item.content.split("\n").filter(Boolean)

  return (
    <article className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-12 bg-border" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Featured {item.type}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="mb-8 font-serif text-4xl font-medium leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
              {item.title}
            </h2>

            <div className="mb-8 space-y-3 font-serif text-xl leading-relaxed text-foreground/90 md:text-[1.35rem] md:leading-[1.65]">
              {excerpt.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Heart
                  className="h-[18px] w-[18px] group-hover:fill-accent/20"
                  strokeWidth={1.25}
                />
                <span className="text-sm tabular-nums">{item.likes}</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.25} />
                <span className="text-sm tabular-nums">{item.comments}</span>
              </button>
              <span className="text-[11px] tracking-wide text-muted-foreground">
                {item.date}
              </span>
            </div>

            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              Continue reading
              <span className="text-accent">&#8594;</span>
            </Link>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 lg:border-l lg:border-border lg:pl-12">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="mb-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary">
                  {item.author.avatar ? (
                    <img
                      src={item.author.avatar}
                      alt={item.author.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-serif text-4xl text-muted-foreground">
                      {item.author.name.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="mb-2 font-serif text-2xl font-medium text-foreground">
                  {item.author.name}
                </h3>

                <p className="mb-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {item.author.bio ??
                    "Writer sharing work on inkwell."}
                </p>

                <button
                  type="button"
                  className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg border border-foreground bg-foreground px-6 py-3 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
                >
                  <UserPlus className="h-4 w-4" strokeWidth={1.25} />
                  Follow
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
