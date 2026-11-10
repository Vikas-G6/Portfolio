/**
 * Story Arc — vertical timeline of career arcs (seasons).
 * Each arc row shows: arc number, title, period, short description.
 * Clicking expands its objectives (200ms height transition).
 * Completed arcs: solid gold number.
 * "Next chapter" arc (last season, period === 'In progress'): objectives show Locked Tag.
 */

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { seasons } from '../data/portfolio';
import { SectionHeading } from './fx';
import Tag from './Tag';

// ─── Lock icon (inline SVG, 14×14) ────────────────────────────────────────────

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }}
    >
      <rect x="2" y="5.5" width="8" height="5.5" rx="0" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// ─── Objective item ────────────────────────────────────────────────────────────

function Objective({
  title,
  description,
  tags,
  isLocked,
}: {
  title: string;
  description: string;
  tags: string[];
  isLocked: boolean;
}) {
  return (
    <div
      className="flex gap-4 py-4"
      style={{ borderBottom: '1px solid var(--line)' }}
    >
      {/* Left gutter: status dot */}
      <div className="mt-1 shrink-0">
        {isLocked ? (
          <span
            className="flex h-4 w-4 items-center justify-center"
            style={{ color: 'var(--line-strong)' }}
          >
            <LockIcon />
          </span>
        ) : (
          <span
            className="block h-2 w-2 mt-1"
            style={{ background: 'var(--accent)' }}
            aria-hidden
          />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span
            className="text-sm font-semibold"
            style={{ color: isLocked ? 'var(--muted)' : 'var(--text)' }}
          >
            {title}
          </span>
          {isLocked ? (
            <Tag status="Locked" label="Planned" />
          ) : (
            <Tag status="Complete" />
          )}
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 font-mono text-[10px] tracking-[0.06em]"
                style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Arc row ──────────────────────────────────────────────────────────────────

function ArcRow({ arc, panelId }: { arc: (typeof seasons)[number]; index: number; panelId: string }) {
  const [open, setOpen] = useState(false);
  const isPlanned = arc.period === 'In progress';

  return (
    <div
      className="relative"
      style={{ borderBottom: '1px solid var(--line)' }}
    >
      {/* Vertical timeline rail */}
      <span
        className="absolute left-[calc(var(--gutter)+1.5rem)] top-0 w-px"
        style={{
          bottom: open ? 0 : undefined,
          height: open ? '100%' : '100%',
          background: isPlanned ? 'var(--line)' : 'var(--line-strong)',
        }}
        aria-hidden
      />

      {/* Arc header button */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="gutter relative flex w-full items-center gap-5 py-6 text-left transition focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
      >
        {/* Arc number circle */}
        <span
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center font-mono text-sm font-bold"
          style={{
            border: `1px solid ${isPlanned ? 'var(--line)' : 'var(--accent)'}`,
            color: isPlanned ? 'var(--muted)' : 'var(--accent)',
            background: 'var(--bg)',
          }}
        >
          {String(arc.number).padStart(2, '0')}
        </span>

        {/* Text block */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span
              className="font-serif text-lg font-normal leading-tight"
              style={{ color: isPlanned ? 'var(--muted)' : 'var(--text)' }}
            >
              {arc.title}
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: 'var(--muted)' }}>
              {arc.period}
            </span>
            {isPlanned && (
              <Tag status="Planned" />
            )}
          </div>
          <p
            className="mt-1 text-[13px] leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {arc.synopsis}
          </p>
        </div>

        {/* Expand indicator */}
        <span
          className="shrink-0 font-mono text-[11px] transition-transform duration-200"
          style={{
            color: 'var(--muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {/* Collapsible objectives */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${arc.title} objectives`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="gutter pb-2"
              style={{ paddingLeft: 'calc(var(--gutter) + 3.75rem)' }}
            >
              {arc.episodes.map((ep) => (
                <Objective
                  key={ep.code}
                  title={ep.title}
                  description={ep.description}
                  tags={ep.tags}
                  isLocked={isPlanned}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Seasons() {
  const uid = useId();

  return (
    <>
      <SectionHeading
        kicker={`${seasons.length} Story Arcs`}
        title="Story Arc"
        aside={
          <p className="max-w-xs text-sm" style={{ color: 'var(--muted)' }}>
            Every stage of the build — select an arc to expand its objectives.
          </p>
        }
      />

      <div
        className="gutter-x"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {seasons.map((arc, i) => (
          <ArcRow
            key={arc.number}
            arc={arc}
            index={i}
            panelId={`${uid}-arc-${arc.number}`}
          />
        ))}
      </div>
    </>
  );
}
