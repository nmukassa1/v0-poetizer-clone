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
import type { PiecePost } from "@/lib/feed-data";
import { bodyHtmlToParagraphs, readingTimeFromHtml } from "@/lib/piece/body";
import type { ReadingRoomPiece } from "@/lib/piece/map";
import { getProfileHrefByHandle } from "@/lib/profiles";
import { Avatar, Tag } from "@/components/inkwell/primitives";
import { PieceCard } from "@/components/inkwell/piece-card";

export function ReadingRoom({
  piece,
  moreByAuthor,
}: {
  piece: ReadingRoomPiece;
  moreByAuthor: PiecePost[];
}) {
  const paragraphs = useMemo(
    () => bodyHtmlToParagraphs(piece.bodyHtml, piece.type),
    [piece.bodyHtml, piece.type],
  );
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

  const minutes = readingTimeFromHtml(piece.bodyHtml);
  const authorProfileHref = getProfileHrefByHandle(piece.authorHandle);

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
          {paragraphs.map((paragraph, i) => {
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
                @{piece.authorHandle} · {piece.authorPieces}{" "}
                {piece.authorPieces === 1 ? "piece" : "pieces"}
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
            <Link
              href={authorProfileHref}
              className="inline-flex rounded-full border border-[var(--ink-border)] bg-transparent px-4 py-2 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
            >
              View profile
            </Link>
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
        {moreByAuthor.map((p) => (
          <PieceCard
            key={p.id}
            post={p}
            readHref={`/read/${p.id}`}
            authorHref={getProfileHrefByHandle(p.authorHandle)}
          />
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
