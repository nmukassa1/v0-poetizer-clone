"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import type { ContentTag, PiecePost } from "@/lib/feed-data";
import { Avatar, Tag } from "@/components/inkwell/primitives";
import { PieceCard } from "@/components/inkwell/piece-card";

const piece: {
  type: ContentTag;
  date: string;
  title: string;
  author: string;
  authorBio: string;
  authorHandle: string;
  authorFollowers: string;
  authorPieces: number;
  body: string[];
  likes: number;
  comments: number;
} = {
  type: "essay",
  date: "May 20, 2026",
  title: "On Writing in a Second Language",
  author: "Lena Müller",
  authorBio:
    "Berlin-born essayist. Writes about translation, memory, and the spaces between languages.",
  authorHandle: "lenaschreibt",
  authorFollowers: "1.2k",
  authorPieces: 14,
  body: [
    "There is a particular grief in reaching for a word and finding only its outline — the shape of the feeling, not the feeling itself. Writing in English, for me, is always an act of translation. Not from German, exactly, but from something pre-verbal, a language of impression and weather that exists only inside me.",
    "I came to English the way you come to a city you've only ever seen in postcards. The buildings are smaller than you imagined, but the light is exactly right. There were words I had collected for years before I knew how to use them — words like dusk, and longing, and the particular softness of perhaps.",
    "My grandmother used to say that every language has its own weight. German, she said, presses down. It clarifies. English drifts. It suggests. I think she meant this as a warning about precision, but I have come to love the way English allows me to mean two things at once. To be uncertain on the page in a way I am not allowed to be in life.",
    "The first essay I ever wrote in English took six weeks. Six weeks for what would have been an afternoon's work in my mother tongue. I sat at my desk in Berlin and watched the light move across the wall and tried to remember how it felt to think in a single language. I could not. The two languages had already begun to braid themselves together inside me, and there was no separating them again.",
    "What I had not understood, then, was that this is not a deficit. The seam between languages is itself a place — a small kitchen, brightly lit, where the words from different lives sit at the same table. They do not always agree. Sometimes they pretend not to know each other. But they share the bread.",
    "I think now that writing in a second language is, in the end, an exercise in tenderness. Toward the words you cannot quite reach. Toward the ones that arrive instead. Toward the version of yourself who is forever standing slightly outside her own sentences, watching them make their slow, imperfect way toward meaning.",
    "When I read what I have written, sometimes I do not recognize the woman who wrote it. She is more careful than I am. More patient. She lingers at the edges of feelings I would, in German, have already named. There is, I think, a kind of mercy in that lingering — a refusal to close the door too quickly on what hasn't yet revealed itself.",
    "The grief is real. But it is the grief of a translator, which is also the joy of one. I do not write to capture what I mean. I write to discover what English can hold of me — and what, in turn, it teaches me to hold.",
  ],
  likes: 203,
  comments: 47,
};

const moreByAuthor: PiecePost[] = [
  {
    kind: "piece",
    type: "essay",
    date: "Apr 28",
    title: "Notes on the Untranslatable",
    author: "Lena Müller",
    excerpt:
      "Some words refuse to leave their countries. Saudade waits at the Lisbon docks. Hiraeth keeps watch on a Welsh hill. They send postcards but they will not move…",
    likes: 152,
    comments: 28,
    shares: 19,
  },
  {
    kind: "piece",
    type: "essay",
    date: "Apr 12",
    title: "The Grammar of Forgetting",
    author: "Lena Müller",
    excerpt:
      "There is a tense, in some languages, that English does not have — a way of speaking about events that happened to you but that you do not remember. I have been searching for it…",
    likes: 187,
    comments: 35,
    shares: 24,
  },
];

function readingTime(body: string[]) {
  const words = body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function ReadingRoom() {
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [popover, setPopover] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPopover(null);
        return;
      }
      const range = sel.getRangeAt(0);
      if (
        !articleRef.current ||
        !articleRef.current.contains(range.commonAncestorContainer)
      ) {
        setPopover(null);
        return;
      }
      const text = sel.toString().trim();
      if (text.length === 0) {
        setPopover(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setPopover({
        x: rect.left + rect.width / 2,
        y: rect.top - 6,
        text,
      });
    };

    const finalize = () => {
      setTimeout(onSelectionChange, 10);
    };

    document.addEventListener("mouseup", finalize);
    document.addEventListener("touchend", finalize);
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("mouseup", finalize);
      document.removeEventListener("touchend", finalize);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  function addHighlight() {
    if (!popover) return;
    setHighlights((prev) =>
      prev.includes(popover.text) ? prev : [...prev, popover.text],
    );
    setPopover(null);
    window.getSelection()?.removeAllRanges();
  }

  const renderParagraph = useMemo(() => {
    return (text: string) => {
      if (highlights.length === 0) return text;
      let parts: (string | { key: string; text: string })[] = [text];
      highlights.forEach((h, hi) => {
        const next: (string | { key: string; text: string })[] = [];
        parts.forEach((part) => {
          if (typeof part !== "string") {
            next.push(part);
            return;
          }
          let cursor = 0;
          let idx = part.indexOf(h, cursor);
          let counter = 0;
          while (idx !== -1) {
            const before = part.slice(cursor, idx);
            if (before) next.push(before);
            next.push({
              key: `h${hi}-${counter}`,
              text: part.slice(idx, idx + h.length),
            });
            cursor = idx + h.length;
            counter += 1;
            idx = part.indexOf(h, cursor);
          }
          const tail = part.slice(cursor);
          if (tail) next.push(tail);
        });
        parts = next;
      });
      return parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        return (
          <mark
            key={i}
            className="rounded-sm bg-[var(--ink-accent-soft)] px-0.5 text-[var(--ink-fg)]"
          >
            {part.text}
          </mark>
        );
      });
    };
  }, [highlights]);

  const isPoem = piece.type === "poem";
  const articleColumn = isPoem
    ? "mx-auto max-w-[480px] px-5 text-center min-[480px]:px-6 min-[480px]:max-w-[520px]"
    : "mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]";
  const titleSize = isPoem
    ? "text-[28px] min-[480px]:text-[36px] lg:text-[44px]"
    : "text-[28px] min-[480px]:text-[40px] lg:text-[52px]";
  const bodyClass = isPoem
    ? "font-serif text-base leading-[2] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[2.1]"
    : "font-serif text-[16px] leading-[1.8] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.85]";

  const minutes = readingTime(piece.body);

  return (
    <div className="min-h-screen pb-32">
      <div
        className="fixed left-0 right-0 top-0 z-40 h-[2px] bg-transparent"
        aria-hidden
      >
        <div
          className="h-full bg-[var(--ink-accent)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article
        ref={articleRef}
        className={`pt-12 min-[480px]:pt-16 lg:pt-20 ${articleColumn}`}
      >
        <div
          className={`mb-8 flex items-center gap-3 ${
            isPoem ? "justify-center" : ""
          }`}
        >
          {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
          <Tag label={piece.type} />
          {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
        </div>

        <h1
          className={`mb-6 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] ${titleSize} ${
            isPoem ? "" : ""
          }`}
        >
          {piece.title}
        </h1>

        <div
          className={`mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--ink-muted)] ${
            isPoem ? "justify-center" : ""
          }`}
        >
          <Avatar seed={piece.author} size={28} />
          <span className="font-medium text-[var(--ink-fg)]">
            {piece.author}
          </span>
          <span className="text-[var(--ink-subtle)]">·</span>
          <span>{piece.date}</span>
          <span className="text-[var(--ink-subtle)]">·</span>
          <span>{minutes} min read</span>
        </div>

        <div
          className={`mb-12 flex items-center gap-3 ${
            isPoem ? "justify-center" : ""
          }`}
          aria-hidden
        >
          {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
          <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
            ◆ ◆ ◆
          </span>
          {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
        </div>

        <div className={`space-y-7 ${bodyClass}`}>
          {piece.body.map((paragraph, i) => {
            const isFirst = i === 0;
            const showDropCap = !isPoem && isFirst;
            return (
              <p
                key={i}
                className={
                  showDropCap
                    ? "first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.5rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--ink-fg)]"
                    : isPoem
                      ? "whitespace-pre-line"
                      : ""
                }
              >
                {renderParagraph(paragraph)}
              </p>
            );
          })}
        </div>

        <div
          className={`mt-12 flex items-center gap-3 ${
            isPoem ? "justify-center" : ""
          }`}
          aria-hidden
        >
          {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
          <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
            ◆
          </span>
          {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
        </div>
      </article>

      <section className="mx-auto mb-12 mt-16 max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]">
        <div className="rounded-2xl border border-[var(--ink-border)] bg-[var(--ink-bg)] p-5 min-[480px]:p-7">
          <div className="flex items-start gap-4">
            <Avatar seed={piece.author} size={64} />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg font-semibold leading-tight text-[var(--ink-fg)]">
                {piece.author}
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--ink-subtle)]">
                @{piece.authorHandle} · {piece.authorPieces} pieces ·{" "}
                {piece.authorFollowers} followers
              </p>
              <p className="mt-3 font-serif text-[14px] leading-relaxed text-[var(--ink-muted)] min-[480px]:text-[15px]">
                {piece.authorBio}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-[var(--ink-fg)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90"
            >
              Follow
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-[var(--ink-border)] bg-transparent px-4 py-2 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
            >
              View profile
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]">
        <div className="my-7 flex items-center gap-2.5">
          <div className="h-px flex-1 bg-[var(--ink-border)]" />
          <span className="font-serif text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-subtle)]">
            More from {piece.author.split(" ")[0]}
          </span>
          <div className="h-px flex-1 bg-[var(--ink-border)]" />
        </div>
        {moreByAuthor.map((p, i) => (
          <PieceCard key={i} post={p} readHref={`/read`} />
        ))}
      </section>

      <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-30 flex justify-center px-4 min-[480px]:bottom-6">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium tabular-nums transition-colors ${
              liked
                ? "bg-[var(--ink-accent-soft)] text-[var(--ink-accent)]"
                : "text-[var(--ink-fg)] hover:bg-[var(--ink-accent-soft)]"
            }`}
            aria-label="Like"
            aria-pressed={liked}
          >
            <Heart
              className="h-4 w-4"
              strokeWidth={1.5}
              fill={liked ? "currentColor" : "none"}
            />
            {piece.likes + (liked ? 1 : 0)}
          </button>

          <span className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium tabular-nums text-[var(--ink-muted)]">
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            {piece.comments}
          </span>

          <span className="mx-1 h-5 w-px bg-[var(--ink-border)]" aria-hidden />

          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            className={`flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors ${
              saved
                ? "text-[var(--ink-accent)]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink-fg)]"
            }`}
            aria-label={saved ? "Unsave" : "Save"}
            aria-pressed={saved}
          >
            <Bookmark
              className="h-4 w-4"
              strokeWidth={1.5}
              fill={saved ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full p-2 text-[var(--ink-muted)] transition-colors hover:text-[var(--ink-fg)]"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {highlights.length > 0 && (
            <>
              <span
                className="mx-1 h-5 w-px bg-[var(--ink-border)]"
                aria-hidden
              />
              <span className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-accent)]">
                {highlights.length} highlight
                {highlights.length === 1 ? "" : "s"}
              </span>
            </>
          )}
        </div>
      </div>

      {popover && (
        <div
          className="pointer-events-none fixed z-40"
          style={{
            top: popover.y,
            left: popover.x,
            transform: "translate(-50%, -100%)",
          }}
        >
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              addHighlight();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              addHighlight();
            }}
            className="pointer-events-auto cursor-pointer rounded-full bg-[var(--ink-fg)] px-3 py-1.5 text-[11px] font-semibold text-[var(--ink-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:opacity-90"
          >
            Highlight
          </button>
        </div>
      )}
    </div>
  );
}
