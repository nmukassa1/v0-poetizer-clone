export function ComposerWordCount({ wordCount }: { wordCount: number }) {
  return (
    <div className="hidden lg:block pointer-events-none fixed bottom-4 right-4 z-30 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] px-3 py-1.5 font-sans text-[10px] tabular-nums text-[var(--ink-muted)] shadow-sm backdrop-blur-md min-[480px]:bottom-6 min-[480px]:right-6 min-[480px]:px-3.5 min-[480px]:text-[11px]">
      {wordCount} {wordCount === 1 ? "word" : "words"}
      <span className="mx-2 text-[var(--ink-subtle)]">·</span>
      {Math.max(1, Math.round(wordCount / 220))} min read
    </div>
  );
}
