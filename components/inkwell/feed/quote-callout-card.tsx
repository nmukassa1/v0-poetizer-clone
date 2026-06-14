export function QuoteCalloutCard({
  text,
  author,
}: {
  text: string
  author: string
}) {
  return (
    <blockquote className="my-1 border-l-[3px] border-[var(--ink-fg)] py-0 pl-[18px]">
      <p className="mb-2.5 font-serif text-[15px] font-semibold italic leading-snug text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.55]">
        &ldquo;{text}&rdquo;
      </p>
      <cite className="text-[11px] not-italic tracking-wide text-[#a09c94]">
        — {author}
      </cite>
    </blockquote>
  )
}
