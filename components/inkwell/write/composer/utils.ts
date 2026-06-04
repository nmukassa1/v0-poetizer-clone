import type { ContentTag } from "@/lib/feed-data"

export function paragraphsFromBody(html: string, type: ContentTag): string[] {
  const tmp = document.createElement("div")
  tmp.innerHTML = html
  const blocks = Array.from(tmp.children).length
    ? Array.from(tmp.children)
    : [tmp]

  if (type === "poem") {
    return blocks
      .map((b) =>
        b instanceof HTMLElement ? b.innerHTML : (b as Element).innerHTML,
      )
      .filter((s) => s.replace(/<br\s*\/?>/g, "").trim().length > 0)
  }

  return blocks
    .map((b) =>
      b instanceof HTMLElement ? b.innerHTML : (b as Element).innerHTML,
    )
    .filter((s) => s.replace(/<br\s*\/?>/g, "").trim().length > 0)
}

export function composerLayoutForType(type: ContentTag) {
  const isPoem = type === "poem"
  return {
    isPoem,
    editorColumn: isPoem
      ? "mx-auto max-w-[520px] px-5 text-center min-[480px]:px-6"
      : "mx-auto max-w-[680px] px-5 min-[480px]:px-6",
    titleSize: isPoem
      ? "text-[28px] min-[480px]:text-[34px] lg:text-[40px]"
      : "text-[28px] min-[480px]:text-[36px] lg:text-[44px]",
    bodyClass: isPoem
      ? "font-serif text-base leading-[2] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[2.1]"
      : "font-serif text-[16px] leading-[1.8] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.85]",
    articleColumn: isPoem
      ? "mx-auto max-w-[480px] px-5 text-center min-[480px]:px-6 min-[480px]:max-w-[520px]"
      : "mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]",
    previewTitleSize: isPoem
      ? "text-[28px] min-[480px]:text-[36px] lg:text-[44px]"
      : "text-[28px] min-[480px]:text-[40px] lg:text-[52px]",
  }
}
