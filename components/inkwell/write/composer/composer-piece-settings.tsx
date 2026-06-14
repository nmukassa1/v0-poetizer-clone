import { X } from "lucide-react";
import type { ContentTag } from "@/lib/feed";
import { CONTENT_TYPES, VISIBILITIES } from "./constants";
import { ComposerSection } from "./composer-section";
import type { Visibility } from "./types";

export function ComposerPieceSettings({
  type,
  onTypeChange,
  excerpt,
  onExcerptChange,
  excerptOverridden,
  onResetExcerpt,
  tags,
  tagDraft,
  onTagDraftChange,
  onCommitTag,
  onRemoveTag,
  visibility,
  onVisibilityChange,
  savedAgoText,
  visibilityRadioName = "visibility",
}: {
  type: ContentTag;
  onTypeChange: (type: ContentTag) => void;
  excerpt: string;
  onExcerptChange: (value: string, overridden: boolean) => void;
  excerptOverridden: boolean;
  onResetExcerpt: () => void;
  tags: string[];
  tagDraft: string;
  onTagDraftChange: (value: string) => void;
  onCommitTag: () => void;
  onRemoveTag: (tag: string) => void;
  visibility: Visibility;
  onVisibilityChange: (visibility: Visibility) => void;
  savedAgoText?: string;
  visibilityRadioName?: string;
}) {
  return (
    <div className="space-y-7">
      <ComposerSection label="Piece type">
        <div className="flex flex-wrap gap-1.5">
          {CONTENT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTypeChange(t.id)}
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
      </ComposerSection>

      <ComposerSection
        label="Excerpt"
        hint={
          excerptOverridden ? "Custom" : "Auto-generated from your first lines"
        }
      >
        <textarea
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value, true)}
          placeholder="Shown on the feed card"
          rows={3}
          className="w-full resize-none rounded-lg border border-[var(--ink-border)] bg-transparent p-3 font-serif text-[13px] leading-relaxed text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)]/70 focus:border-[var(--ink-fg)]/40"
        />
        {excerptOverridden && (
          <button
            type="button"
            onClick={onResetExcerpt}
            className="mt-1.5 cursor-pointer text-[10px] uppercase tracking-wide text-[var(--ink-accent)] underline-offset-4 hover:underline"
          >
            Reset to auto
          </button>
        )}
      </ComposerSection>

      {/* <ComposerSection label="Tags" hint={`${tags.length} of 5`}>
        <TagInput
          tags={tags}
          tagDraft={tagDraft}
          onTagDraftChange={onTagDraftChange}
          onCommitTag={onCommitTag}
          onRemoveTag={onRemoveTag}
        />
      </ComposerSection> */}

      <ComposerSection label="Visibility">
        <VisibilityOptions
          visibility={visibility}
          onVisibilityChange={onVisibilityChange}
          radioName={visibilityRadioName}
        />
      </ComposerSection>

      {savedAgoText !== undefined && (
        <p className="text-[10px] text-[var(--ink-subtle)]">
          {savedAgoText || "Not saved yet"}
        </p>
      )}
    </div>
  );
}

function TagInput({
  tags,
  tagDraft,
  onTagDraftChange,
  onCommitTag,
  onRemoveTag,
}: {
  tags: string[];
  tagDraft: string;
  onTagDraftChange: (value: string) => void;
  onCommitTag: () => void;
  onRemoveTag: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-full bg-[var(--ink-tag-bg)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-tag-text)]"
        >
          #{t}
          <button
            type="button"
            onClick={() => onRemoveTag(t)}
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
          onChange={(e) => onTagDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              onCommitTag();
            }
            if (e.key === "Backspace" && tagDraft === "" && tags.length > 0) {
              onRemoveTag(tags[tags.length - 1]);
            }
          }}
          onBlur={onCommitTag}
          placeholder="+ add tag"
          className="min-w-[80px] flex-1 rounded-full border border-dashed border-[var(--ink-border)] bg-transparent px-2.5 py-1 font-sans text-[11px] text-[var(--ink-fg)] outline-none placeholder:text-[var(--ink-subtle)] focus:border-[var(--ink-fg)]/50"
        />
      )}
    </div>
  );
}

function VisibilityOptions({
  visibility,
  onVisibilityChange,
  radioName,
}: {
  visibility: Visibility;
  onVisibilityChange: (visibility: Visibility) => void;
  radioName: string;
}) {
  return (
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
            name={radioName}
            value={v.id}
            checked={visibility === v.id}
            onChange={() => onVisibilityChange(v.id)}
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
  );
}
