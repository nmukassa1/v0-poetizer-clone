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
    <article className="border-b border-border py-10 last:border-b-0">
      <div className="mx-auto max-w-2xl px-6">
        <span className="mb-4 inline-block text-xs uppercase tracking-widest text-muted-foreground">
          {type}
        </span>

        <h2 className="mb-6 font-serif text-3xl font-bold italic text-foreground">
          {title}
        </h2>

        <div className="mb-6 space-y-1 font-serif text-lg leading-relaxed text-foreground">
          {content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <Link
          href="#"
          className="mb-8 inline-block text-sm font-medium text-accent hover:underline"
        >
          Read more
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="font-serif text-sm font-medium text-muted-foreground">
                  {author.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{author.name}</p>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-xs">{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-xs">{comments}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
