export function ComposerGlobalStyles() {
  return (
    <style jsx global>{`
      .composer-editor:empty::before {
        content: attr(data-placeholder);
        color: var(--ink-subtle);
        opacity: 0.7;
        pointer-events: none;
      }
    `}</style>
  )
}
