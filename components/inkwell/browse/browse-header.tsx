export function BrowseHeader() {
  return (
    <header className="border-b border-[var(--ink-border)] py-8 min-[480px]:py-10 lg:py-12">
      <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-subtle)]">
        Library
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--ink-fg)] min-[480px]:text-4xl lg:text-5xl">
        Browse pieces
      </h1>
      <p className="mt-3 max-w-2xl font-serif text-[15px] leading-relaxed text-[var(--ink-muted)] min-[480px]:text-base">
        Poems, short stories, and essays from writers across inkwell — start
        with our featured pick, then explore the full collection.
      </p>
    </header>
  )
}
