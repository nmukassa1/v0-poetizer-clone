"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bold,
  Italic,
  Link2,
  Quote,
  Settings,
  X,
} from "lucide-react";
import type { ContentTag } from "@/lib/feed-data";
import { Avatar, Tag } from "@/components/inkwell/primitives";

type Visibility = "public" | "followers" | "draft";
type Phase = "edit" | "preview" | "published";

const TYPES: { id: ContentTag; label: string; placeholder: string }[] = [
  { id: "poem", label: "Poem", placeholder: "Begin your verse…" },
  { id: "story", label: "Story", placeholder: "It begins…" },
  { id: "essay", label: "Essay", placeholder: "Begin here…" },
];

const VISIBILITIES: { id: Visibility; label: string; hint: string }[] = [
  { id: "public", label: "Public", hint: "Anyone can read" },
  { id: "followers", label: "Followers", hint: "Only people who follow you" },
  { id: "draft", label: "Draft", hint: "Only visible to you" },
];

const AUTHOR = {
  name: "You",
  handle: "you",
};

function paragraphsFromBody(html: string, type: ContentTag): string[] {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const blocks = Array.from(tmp.children).length
    ? Array.from(tmp.children)
    : [tmp];

  if (type === "poem") {
    return blocks
      .map((b) =>
        b instanceof HTMLElement ? b.innerHTML : (b as Element).innerHTML,
      )
      .filter((s) => s.replace(/<br\s*\/?>/g, "").trim().length > 0);
  }

  return blocks
    .map((b) =>
      b instanceof HTMLElement ? b.innerHTML : (b as Element).innerHTML,
    )
    .filter((s) => s.replace(/<br\s*\/?>/g, "").trim().length > 0);
}

export function Composer() {
  const [type, setType] = useState<ContentTag>("essay");
  const [title, setTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [excerptOverridden, setExcerptOverridden] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [wordCount, setWordCount] = useState(0);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [savedAgoText, setSavedAgoText] = useState<string>("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("edit");
  const [popover, setPopover] = useState<{ x: number; y: number } | null>(null);

  const bodyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const initialBodySet = useRef(false);

  useEffect(() => {
    if (!bodyRef.current || initialBodySet.current) return;
    bodyRef.current.innerHTML = "";
    initialBodySet.current = true;
  }, []);

  function recalcFromEditor() {
    if (!bodyRef.current) return;
    const html = bodyRef.current.innerHTML;
    const text = bodyRef.current.textContent || "";
    const words = text.trim().split(/\s+/).filter(Boolean);
    setBodyHtml(html);
    setWordCount(words.length);
    if (!excerptOverridden) {
      const first = words.slice(0, 30).join(" ");
      setExcerpt(first + (words.length > 30 ? "…" : ""));
    }
  }

  useEffect(() => {
    if (phase !== "edit") return;
    const handler = setTimeout(() => {
      if (title.trim() === "" && bodyHtml.trim() === "") return;
      setSavedAt(new Date());
    }, 800);
    return () => clearTimeout(handler);
  }, [type, title, bodyHtml, excerpt, tags, visibility, phase]);

  useEffect(() => {
    const update = () => {
      if (!savedAt) {
        setSavedAgoText("");
        return;
      }
      const seconds = Math.round((Date.now() - savedAt.getTime()) / 1000);
      if (seconds < 4) setSavedAgoText("saved just now");
      else if (seconds < 60) setSavedAgoText(`saved ${seconds}s ago`);
      else setSavedAgoText(`saved ${Math.round(seconds / 60)}m ago`);
    };
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [savedAt]);

  useEffect(() => {
    if (phase !== "edit") {
      setPopover(null);
      return;
    }
    const onSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPopover(null);
        return;
      }
      const range = sel.getRangeAt(0);
      if (
        !bodyRef.current ||
        !bodyRef.current.contains(range.commonAncestorContainer)
      ) {
        setPopover(null);
        return;
      }
      if (sel.toString().trim().length === 0) {
        setPopover(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setPopover({
        x: rect.left + rect.width / 2,
        y: rect.top - 6,
      });
    };
    const finalize = () => setTimeout(onSelectionChange, 10);
    document.addEventListener("mouseup", finalize);
    document.addEventListener("touchend", finalize);
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("mouseup", finalize);
      document.removeEventListener("touchend", finalize);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [phase]);

  function applyFormat(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
    bodyRef.current?.focus();
    setTimeout(recalcFromEditor, 0);
  }

  function applyLink() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const url = window.prompt("URL", "https://");
    if (!url) return;
    applyFormat("createLink", url);
  }

  function applyBlockquote() {
    applyFormat("formatBlock", "blockquote");
  }

  function commitTag() {
    const v = tagDraft.trim().toLowerCase().replace(/^#/, "");
    if (!v || tags.includes(v) || tags.length >= 5) return;
    setTags([...tags, v]);
    setTagDraft("");
  }

  function removeTag(t: string) {
    setTags(tags.filter((x) => x !== t));
  }

  function startPreview() {
    setPhase("preview");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  function backToEdit() {
    setPhase("edit");
    setTimeout(() => {
      if (bodyRef.current && bodyHtml) {
        bodyRef.current.innerHTML = bodyHtml;
      }
    }, 10);
  }

  function confirmPublish() {
    setPhase("published");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  const isPoem = type === "poem";
  const editorColumn = isPoem
    ? "mx-auto max-w-[520px] px-5 text-center min-[480px]:px-6"
    : "mx-auto max-w-[680px] px-5 min-[480px]:px-6";
  const titleSize = isPoem
    ? "text-[28px] min-[480px]:text-[34px] lg:text-[40px]"
    : "text-[28px] min-[480px]:text-[36px] lg:text-[44px]";
  const bodyClass = isPoem
    ? "font-serif text-base leading-[2] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[2.1]"
    : "font-serif text-[16px] leading-[1.8] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.85]";

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (phase === "published") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-accent)]">
            Published
          </span>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-[var(--ink-fg)] min-[480px]:text-[36px]">
            Your piece is live.
          </h2>
          <p className="mt-3 font-serif text-[15px] leading-relaxed text-[var(--ink-muted)]">
            &ldquo;{title || "Untitled"}&rdquo; is now in the world. May it find
            the readers it&rsquo;s meant for.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-[var(--ink-fg)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-bg)] transition-opacity hover:opacity-90"
            >
              Back to feed
            </Link>
            <Link
              href={`/read`}
              className="rounded-full border border-[var(--ink-border)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ink-fg)] transition-colors hover:border-[var(--ink-fg)]"
            >
              View piece
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {phase === "edit" ? (
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <main className="min-w-0 pt-10 min-[480px]:pt-14 lg:pt-16">
            <div className={editorColumn}>
              <textarea
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                rows={1}
                className={`w-full resize-none border-0 bg-transparent p-0 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 ${titleSize} ${
                  isPoem ? "text-center" : ""
                }`}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }}
              />

              <div
                className={`mt-6 mb-8 flex items-center gap-2.5 ${
                  isPoem ? "justify-center" : ""
                }`}
              >
                {!isPoem && (
                  <span className="h-px w-8 bg-[var(--ink-border)]" />
                )}
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
                  {TYPES.find((t) => t.id === type)?.label}
                </span>
                {!isPoem && (
                  <span className="h-px w-8 bg-[var(--ink-border)]" />
                )}
              </div>

              <div
                ref={bodyRef}
                contentEditable
                suppressContentEditableWarning
                onInput={recalcFromEditor}
                onBlur={recalcFromEditor}
                data-placeholder={
                  TYPES.find((t) => t.id === type)?.placeholder ?? ""
                }
                className={`composer-editor min-h-[40vh] outline-none ${bodyClass} ${
                  isPoem ? "[&_p]:my-3" : "[&_p]:my-5"
                } [&_blockquote]:my-5 [&_blockquote]:border-l-[3px] [&_blockquote]:border-[var(--ink-fg)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_a]:text-[var(--ink-accent)] [&_a]:underline [&_a]:underline-offset-4`}
                style={{
                  whiteSpace: "pre-wrap",
                }}
              />

              <div className="my-12 flex items-center justify-center">
                <span className="font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)] select-none">
                  ◆
                </span>
              </div>
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-[68px] space-y-7 pt-16 pr-8">
              <Section label="Piece type">
                <div className="flex flex-wrap gap-1.5">
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`cursor-pointer rounded-full border px-3 py-1.5 font-sans text-[11px] font-semibold tracking-wide transition-colors ${
                        type === t.id
                          ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                          : "border-[var(--ink-border)] text-[var(--ink-muted)] hover:border-[var(--ink-fg)]/50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </Section>

              <Section
                label="Excerpt"
                hint={
                  excerptOverridden
                    ? "Custom"
                    : "Auto-generated from your first lines"
                }
              >
                <textarea
                  value={excerpt}
                  onChange={(e) => {
                    setExcerpt(e.target.value);
                    setExcerptOverridden(true);
                  }}
                  placeholder="Shown on the feed card"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-[var(--ink-border)] bg-transparent p-3 font-serif text-[13px] leading-relaxed text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 focus:border-[var(--ink-fg)]/40"
                />
                {excerptOverridden && (
                  <button
                    type="button"
                    onClick={() => setExcerptOverridden(false)}
                    className="mt-1.5 cursor-pointer text-[10px] uppercase tracking-wide text-[var(--ink-accent)] underline-offset-4 hover:underline"
                  >
                    Reset to auto
                  </button>
                )}
              </Section>

              <Section label="Tags" hint={`${tags.length} of 5`}>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--ink-tag-bg)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-tag-text)]"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="cursor-pointer text-[var(--ink-tag-text)]/70 hover:text-[var(--ink-tag-text)]"
                        aria-label={`Remove ${t}`}
                      >
                        <X className="h-3 w-3" strokeWidth={2} />
                      </button>
                    </span>
                  ))}
                  {tags.length < 5 && (
                    <input
                      type="text"
                      value={tagDraft}
                      onChange={(e) => setTagDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          commitTag();
                        }
                        if (
                          e.key === "Backspace" &&
                          tagDraft === "" &&
                          tags.length > 0
                        ) {
                          setTags(tags.slice(0, -1));
                        }
                      }}
                      onBlur={commitTag}
                      placeholder="+ add tag"
                      className="min-w-[80px] flex-1 rounded-full border border-dashed border-[var(--ink-border)] bg-transparent px-2.5 py-1 font-sans text-[11px] text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)] focus:border-[var(--ink-fg)]/50"
                    />
                  )}
                </div>
              </Section>

              <Section label="Visibility">
                <div className="space-y-2">
                  {VISIBILITIES.map((v) => (
                    <label
                      key={v.id}
                      className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition-colors ${
                        visibility === v.id
                          ? "border-[var(--ink-fg)] bg-[var(--ink-bg)]"
                          : "border-[var(--ink-border)] hover:border-[var(--ink-fg)]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility"
                        value={v.id}
                        checked={visibility === v.id}
                        onChange={() => setVisibility(v.id)}
                        className="mt-0.5 h-3 w-3 accent-[var(--ink-fg)]"
                      />
                      <span className="flex-1">
                        <span className="block text-xs font-semibold text-[var(--ink-fg)]">
                          {v.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-[var(--ink-subtle)]">
                          {v.hint}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </Section>

              <p className="text-[10px] text-[var(--ink-subtle)]">
                {savedAgoText || "Not saved yet"}
              </p>
            </div>
          </aside>
        </div>
      ) : (
        <PreviewPane
          type={type}
          title={title}
          bodyHtml={bodyHtml}
          excerpt={excerpt}
          tags={tags}
          date={today}
        />
      )}

      {phase === "edit" && (
        <div className="pointer-events-none fixed bottom-4 right-4 z-30 rounded-full border border-[var(--ink-border)] bg-[color-mix(in_srgb,var(--ink-bg)_94%,transparent)] px-3 py-1.5 font-sans text-[10px] tabular-nums text-[var(--ink-muted)] shadow-sm backdrop-blur-md min-[480px]:bottom-6 min-[480px]:right-6 min-[480px]:px-3.5 min-[480px]:text-[11px]">
          {wordCount} {wordCount === 1 ? "word" : "words"}
          <span className="mx-2 text-[var(--ink-subtle)]">·</span>
          {Math.max(1, Math.round(wordCount / 220))} min read
        </div>
      )}

      {phase === "edit" && popover && (
        <div
          className="pointer-events-none fixed z-40"
          style={{
            top: popover.y,
            left: popover.x,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-[var(--ink-border)] bg-[var(--ink-fg)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <ToolbarButton
              onClick={() => applyFormat("bold")}
              label="Bold"
              icon={<Bold className="h-3.5 w-3.5" strokeWidth={2.25} />}
            />
            <ToolbarButton
              onClick={() => applyFormat("italic")}
              label="Italic"
              icon={<Italic className="h-3.5 w-3.5" strokeWidth={2.25} />}
            />
            <ToolbarButton
              onClick={applyBlockquote}
              label="Blockquote"
              icon={<Quote className="h-3.5 w-3.5" strokeWidth={2.25} />}
            />
            <ToolbarButton
              onClick={applyLink}
              label="Link"
              icon={<Link2 className="h-3.5 w-3.5" strokeWidth={2.25} />}
            />
          </div>
        </div>
      )}

      {settingsOpen && phase === "edit" && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSettingsOpen(false)}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--ink-border)] bg-[var(--ink-bg)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[var(--ink-fg)]">
                Piece settings
              </h3>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="cursor-pointer text-[var(--ink-muted)]"
                aria-label="Close settings"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-6">
              <Section label="Piece type">
                <div className="flex flex-wrap gap-1.5">
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`cursor-pointer rounded-full border px-3 py-1.5 font-sans text-[11px] font-semibold tracking-wide transition-colors ${
                        type === t.id
                          ? "border-[var(--ink-fg)] bg-[var(--ink-fg)] text-[var(--ink-bg)]"
                          : "border-[var(--ink-border)] text-[var(--ink-muted)]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </Section>

              <Section label="Excerpt">
                <textarea
                  value={excerpt}
                  onChange={(e) => {
                    setExcerpt(e.target.value);
                    setExcerptOverridden(true);
                  }}
                  placeholder="Shown on the feed card"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-[var(--ink-border)] bg-transparent p-3 font-serif text-[13px] leading-relaxed text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 focus:border-[var(--ink-fg)]/40"
                />
              </Section>

              <Section label="Tags" hint={`${tags.length} of 5`}>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--ink-tag-bg)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-tag-text)]"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="cursor-pointer"
                        aria-label={`Remove ${t}`}
                      >
                        <X className="h-3 w-3" strokeWidth={2} />
                      </button>
                    </span>
                  ))}
                  {tags.length < 5 && (
                    <input
                      type="text"
                      value={tagDraft}
                      onChange={(e) => setTagDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          commitTag();
                        }
                      }}
                      onBlur={commitTag}
                      placeholder="+ add tag"
                      className="min-w-[80px] flex-1 rounded-full border border-dashed border-[var(--ink-border)] bg-transparent px-2.5 py-1 font-sans text-[11px] text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]"
                    />
                  )}
                </div>
              </Section>

              <Section label="Visibility">
                <div className="space-y-2">
                  {VISIBILITIES.map((v) => (
                    <label
                      key={v.id}
                      className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition-colors ${
                        visibility === v.id
                          ? "border-[var(--ink-fg)]"
                          : "border-[var(--ink-border)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility-mobile"
                        value={v.id}
                        checked={visibility === v.id}
                        onChange={() => setVisibility(v.id)}
                        className="mt-0.5 h-3 w-3 accent-[var(--ink-fg)]"
                      />
                      <span className="flex-1">
                        <span className="block text-xs font-semibold text-[var(--ink-fg)]">
                          {v.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-[var(--ink-subtle)]">
                          {v.hint}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </Section>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .composer-editor:empty::before {
          content: attr(data-placeholder);
          color: var(--ink-subtle);
          opacity: 0.7;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[var(--ink-bg)] transition-colors hover:bg-white/10"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}

function Section({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
          {label}
        </span>
        {hint && (
          <span className="font-sans text-[10px] text-[var(--ink-subtle)]/70">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function PreviewPane({
  type,
  title,
  bodyHtml,
  excerpt,
  tags,
  date,
}: {
  type: ContentTag;
  title: string;
  bodyHtml: string;
  excerpt: string;
  tags: string[];
  date: string;
}) {
  const isPoem = type === "poem";
  const articleColumn = isPoem
    ? "mx-auto max-w-[480px] px-5 text-center min-[480px]:px-6 min-[480px]:max-w-[520px]"
    : "mx-auto max-w-[640px] px-5 min-[480px]:px-6 lg:max-w-[680px]";
  const titleSize = isPoem
    ? "text-[28px] min-[480px]:text-[36px] lg:text-[44px]"
    : "text-[28px] min-[480px]:text-[40px] lg:text-[52px]";
  const bodyClass = isPoem
    ? "font-serif text-base leading-[2] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[2.1]"
    : "font-serif text-[16px] leading-[1.8] text-[var(--ink-fg)] min-[480px]:text-[17px] min-[480px]:leading-[1.85]";

  const paragraphs =
    typeof window !== "undefined" ? paragraphsFromBody(bodyHtml, type) : [];

  return (
    <article className={`pt-12 min-[480px]:pt-16 lg:pt-20 ${articleColumn}`}>
      <div
        className={`mb-8 flex items-center gap-3 ${
          isPoem ? "justify-center" : ""
        }`}
      >
        {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
        <Tag label={type} />
        {!isPoem && <span className="h-px flex-1 bg-[var(--ink-border)]" />}
      </div>

      <h1
        className={`mb-6 font-serif font-medium leading-[1.12] tracking-tight text-[var(--ink-fg)] ${titleSize}`}
      >
        {title || (
          <span className="text-[var(--ink-subtle)] italic">Untitled</span>
        )}
      </h1>

      <div
        className={`mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--ink-muted)] ${
          isPoem ? "justify-center" : ""
        }`}
      >
        <Avatar seed={AUTHOR.name} size={28} />
        <span className="font-medium text-[var(--ink-fg)]">{AUTHOR.name}</span>
        <span className="text-[var(--ink-subtle)]">·</span>
        <span>{date}</span>
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

      {paragraphs.length === 0 ? (
        <p className="font-serif text-[15px] italic text-[var(--ink-subtle)]">
          No body yet — go back and start writing.
        </p>
      ) : (
        <div
          className={`space-y-7 ${bodyClass} ${isPoem ? "whitespace-pre-line" : ""}`}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                !isPoem && i === 0
                  ? "first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.5rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--ink-fg)]"
                  : ""
              }
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      )}

      {(excerpt || tags.length > 0) && (
        <div className="mx-auto mt-16 max-w-[640px] rounded-xl border border-[var(--ink-border)] bg-[var(--ink-inset)] p-5">
          <div className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
            Feed preview
          </div>
          {excerpt && (
            <p className="font-serif text-sm italic leading-relaxed text-[var(--ink-muted)]">
              &ldquo;{excerpt}&rdquo;
            </p>
          )}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--ink-tag-bg)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-tag-text)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-12 flex items-center justify-center gap-3" aria-hidden>
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
        <span className="select-none font-serif text-xs tracking-[0.6em] text-[var(--ink-subtle)]">
          ◆
        </span>
        {!isPoem && <span className="h-px w-12 bg-[var(--ink-border)]" />}
      </div>
    </article>
  );
}
