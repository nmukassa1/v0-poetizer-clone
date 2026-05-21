import Link from "next/link"
import { MessageCircle, Heart } from "lucide-react"

export type ContentType = "poem" | "story"

export interface ContentCardProps {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  date: string
  type: ContentType
  likes: number
  comments: number
}

export function ContentCard({
  title,
  content,
  author,
  date,
  type,
  likes,
  comments,
}: ContentCardProps) {
  return (
    <article className="py-12 first:pt-8">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {type}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <h2 className="mb-8 text-center font-serif text-4xl font-medium tracking-tight text-foreground">
          {title}
        </h2>

        <div className="mb-8 space-y-2 font-serif text-xl leading-relaxed text-foreground/90">
          {content.split("\n").map((line, index) => (
            <p key={index} className="text-center">{line}</p>
          ))}
        </div>

        <div className="mb-10 text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Continue reading
            <span className="text-accent">&#8594;</span>
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary border border-border">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span className="font-serif text-lg text-muted-foreground">
                  {author.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{author.name}</p>
              <p className="text-[11px] text-muted-foreground tracking-wide">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
              <Heart className="h-[18px] w-[18px] group-hover:fill-accent/20" strokeWidth={1.25} />
              <span className="text-xs">{likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.25} />
              <span className="text-xs">{comments}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
