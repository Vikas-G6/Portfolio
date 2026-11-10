/**
 * Quests — a two-column board (list + detail panel).
 * • Left:  vertical list of all projects from portfolio.ts
 * • Right: detail Panel for the selected quest
 * • Keyboard: arrow keys move selection, Enter opens modal
 * • Deep links: #quest-<id>
 * • Mobile: list becomes a horizontally scrollable tab strip above the detail panel
 */

import { useCallback, useEffect, useId, useRef, useState, type JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import Tag from './Tag';
import Panel from './Panel';

// ─── helpers ────────────────────────────────────────────────────────────────

function slugOf(p: Project) {
  return p.id;
}

function statusOf(p: Project): 'Complete' | 'Active' | 'Planned' {
  return p.status ?? 'Complete';
}

function initialIndex(): number {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash; // e.g. #quest-streamagent
    if (hash.startsWith('#quest-')) {
      const slug = hash.slice('#quest-'.length);
      const idx = projects.findIndex((p) => slugOf(p) === slug);
      if (idx !== -1) return idx;
    }
  }
  return 0;
}

// ─── Gold active-marker on list items ───────────────────────────────────────

/** Animated gold bar that slides vertically to the active item. */
function ActiveMarker({ layoutId }: { layoutId: string }) {
  return (
    <motion.span
      layoutId={layoutId}
      className="absolute left-0 top-0 h-full w-[3px]"
      style={{ background: 'var(--accent)' }}
      transition={{ duration: 0.28, ease: EASE }}
      aria-hidden
    />
  );
}

// ─── Architecture diagram cover ──────────────────────────────────────────────

const DIAGRAMS: Record<string, JSX.Element> = {
  streamagent: (
    // FastAPI backend → LLM → SSE → Angular frontend
    <svg viewBox="0 0 320 120" className="w-full h-full" aria-hidden fill="none" stroke="var(--accent)" strokeWidth="1">
      {/* Backend box */}
      <rect x="16" y="40" width="72" height="36" strokeOpacity="0.8" />
      <text x="52" y="62" fill="var(--accent)" stroke="none" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.9">FastAPI</text>
      {/* Arrow to LLM */}
      <line x1="88" y1="58" x2="120" y2="58" strokeOpacity="0.5" />
      <polygon points="120,54 128,58 120,62" fill="var(--accent)" stroke="none" opacity="0.5" />
      {/* LLM box */}
      <rect x="128" y="40" width="60" height="36" strokeOpacity="0.6" />
      <text x="158" y="62" fill="var(--accent)" stroke="none" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.8">LLM API</text>
      {/* SSE arrow */}
      <line x1="188" y1="58" x2="216" y2="58" strokeOpacity="0.5" />
      <text x="202" y="52" fill="var(--accent)" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.5">SSE</text>
      <polygon points="216,54 224,58 216,62" fill="var(--accent)" stroke="none" opacity="0.5" />
      {/* Frontend box */}
      <rect x="224" y="40" width="76" height="36" strokeOpacity="0.8" />
      <text x="262" y="62" fill="var(--accent)" stroke="none" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.9">Angular 17</text>
      {/* Labels */}
      <text x="52" y="90" fill="var(--accent)" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.4">Backend</text>
      <text x="262" y="90" fill="var(--accent)" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.4">Frontend</text>
    </svg>
  ),
  'online-job-portal': (
    // Gateway → Auth / Admin / User → MySQL
    <svg viewBox="0 0 320 120" className="w-full h-full" aria-hidden fill="none" stroke="var(--accent)" strokeWidth="1">
      <rect x="120" y="12" width="80" height="30" strokeOpacity="0.8" />
      <text x="160" y="31" fill="var(--accent)" stroke="none" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.9">API Gateway</text>
      {/* Three service boxes */}
      {['Auth', 'Admin', 'User'].map((s, i) => (
        <g key={s}>
          <line x1="160" y1="42" x2={60 + i * 100} y2="65" strokeOpacity="0.4" />
          <rect x={18 + i * 100} y="65" width="60" height="28" strokeOpacity="0.7" />
          <text x={48 + i * 100} y="83" fill="var(--accent)" stroke="none" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.85">{s}</text>
        </g>
      ))}
      {/* DB */}
      <ellipse cx="160" cy="110" rx="40" ry="8" strokeOpacity="0.5" />
      <line x1="120" y1="110" x2="120" y2="103" strokeOpacity="0.3" />
      <line x1="200" y1="110" x2="200" y2="103" strokeOpacity="0.3" />
      <text x="160" y="113" fill="var(--accent)" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.5">MySQL</text>
    </svg>
  ),
  'ogs-gaming-store': (
    // Four microservices grid
    <svg viewBox="0 0 320 120" className="w-full h-full" aria-hidden fill="none" stroke="var(--accent)" strokeWidth="1">
      {['User', 'Product', 'Cart', 'Order'].map((s, i) => (
        <g key={s}>
          <rect x={16 + i * 74} y="35" width="60" height="30" strokeOpacity="0.7" />
          <text x={46 + i * 74} y="54" fill="var(--accent)" stroke="none" fontSize="9" textAnchor="middle" fontFamily="monospace" opacity="0.85">{s}</text>
          <line x1={46 + i * 74} y1="65" x2={46 + i * 74} y2="80" strokeOpacity="0.3" />
        </g>
      ))}
      <line x1="16" y1="80" x2="296" y2="80" strokeOpacity="0.25" />
      <text x="160" y="95" fill="var(--accent)" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.4">Stripe · JWT · Eureka</text>
    </svg>
  ),
};

function CoverDiagram({ project }: { project: Project }) {
  return (
    <div
      className="relative flex h-44 w-full items-center justify-center overflow-hidden sm:h-48"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}
      aria-hidden
    >
      <div className="h-full w-full p-4">
        {DIAGRAMS[project.id] ?? (
          // Fallback generic grid
          <svg viewBox="0 0 320 120" className="w-full h-full" fill="none" stroke="var(--accent)" strokeWidth="1">
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect key={`${r}-${c}`} x={16 + c * 74} y={16 + r * 32} width="58" height="22"
                  strokeOpacity={0.2 + ((r + c) % 3) * 0.2} />
              ))
            )}
          </svg>
        )}
      </div>
      {/* Project ID watermark */}
      <span
        className="pointer-events-none absolute right-3 bottom-2 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: 'var(--line-strong)' }}
      >
        {project.id}
      </span>
    </div>
  );
}

// ─── Detail panel (right side) ───────────────────────────────────────────────

function DetailPanel({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.28, ease: EASE }}
        aria-live="polite"
        aria-atomic="true"
      >
        <Panel as="article" className="overflow-hidden">
          {/* Cover diagram */}
          <CoverDiagram project={project} />

          <div className="p-5 sm:p-6">
            {/* HUD header */}
            <div className="mb-3 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--muted)' }}
              >
                {project.year}
              </span>
              <span style={{ color: 'var(--line-strong)' }}>·</span>
              <Tag status={statusOf(project)} />
            </div>

            <h3 className="mb-1 font-serif text-2xl leading-tight" style={{ color: 'var(--text)' }}>
              {project.title}
            </h3>

            {project.role && (
              <p className="mb-4 font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
                {project.role}
              </p>
            )}

            {/* Stack tags — square, mono */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 font-mono text-[11px] tracking-[0.06em]"
                  style={{
                    border: '1px solid var(--line-strong)',
                    color: 'var(--muted)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Outcome */}
            <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {project.outcome ?? project.logline}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                className="btn-primary"
                style={{ clipPath: 'var(--chamfer)' }}
                onClick={() => onOpen(project)}
                aria-label={`View quest: ${project.title}`}
              >
                View quest
              </button>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-[0.625rem] text-sm font-semibold transition"
                  style={{
                    border: '1px solid var(--line-strong)',
                    color: 'var(--muted)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--text)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--line-strong)'; }}
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  GitHub ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-[0.625rem] text-sm font-semibold transition"
                  style={{
                    border: '1px solid var(--line-strong)',
                    color: 'var(--muted)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--text)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--line-strong)'; }}
                  aria-label={`Live demo for ${project.title}`}
                >
                  Demo ↗
                </a>
              )}
            </div>
          </div>
        </Panel>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Quest list row ───────────────────────────────────────────────────────────

function QuestRow({
  project,
  isSelected,
  markerId,
  onClick,
  rowRef,
}: {
  project: Project;
  isSelected: boolean;
  markerId: string;
  onClick: () => void;
  rowRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={rowRef}
      role="option"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      id={`quest-row-${slugOf(project)}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { e.preventDefault(); onClick(); }
      }}
      className="relative flex cursor-pointer items-center justify-between gap-3 px-4 py-3 transition-colors focus:outline-none"
      style={{
        background: isSelected ? 'var(--surface)' : 'transparent',
        borderBottom: '1px solid var(--line)',
        borderLeft: '3px solid transparent',
      }}
    >
      {isSelected && <ActiveMarker layoutId={markerId} />}

      <div className="min-w-0 flex-1">
        <p
          className="truncate text-sm font-semibold leading-tight"
          style={{ color: isSelected ? 'var(--text)' : 'var(--muted)' }}
        >
          {project.title}
        </p>
        <p
          className="mt-0.5 truncate font-mono text-[13px]"
          style={{ color: 'var(--muted)' }}
        >
          {project.summary ?? project.logline}
        </p>
      </div>

      <div className="shrink-0">
        <Tag status={statusOf(project)} />
      </div>
    </div>
  );
}

// ─── Mobile tab strip ─────────────────────────────────────────────────────────

function MobileTabStrip({
  selected,
  markerId,
  onSelect,
}: {
  selected: number;
  markerId: string;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      className="rail mb-4 flex snap-x snap-mandatory overflow-x-auto"
      role="tablist"
      aria-label="Quest selector"
      style={{ borderBottom: '1px solid var(--line)' }}
    >
      {projects.map((p, i) => {
        const active = i === selected;
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={active}
            aria-controls={`quest-detail-${slugOf(p)}`}
            id={`quest-tab-${slugOf(p)}`}
            type="button"
            onClick={() => onSelect(i)}
            className="relative shrink-0 snap-start px-5 py-3 text-left transition"
            style={{ color: active ? 'var(--text)' : 'var(--muted)' }}
          >
            {active && (
              <motion.span
                layoutId={markerId + '-tab'}
                className="absolute inset-x-0 bottom-0 h-[2px]"
                style={{ background: 'var(--accent)' }}
                transition={{ duration: 0.28, ease: EASE }}
                aria-hidden
              />
            )}
            <span className="block text-sm font-semibold">{p.title}</span>
            <span
              className="block font-mono text-[10px] tracking-[0.12em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              {p.year}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number>(initialIndex);
  const listboxId = useId();
  const markerId = useId();
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync URL hash on selection change
  useEffect(() => {
    const slug = slugOf(projects[selectedIdx]);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = `quest-${slug}`;
      window.history.replaceState(null, '', url.toString());
    }
  }, [selectedIdx]);

  // Handle hash navigation from outside
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#quest-')) return;
      const slug = hash.slice('#quest-'.length);
      const idx = projects.findIndex((p) => slugOf(p) === slug);
      if (idx !== -1) setSelectedIdx(idx);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const select = useCallback((i: number) => {
    setSelectedIdx(i);
    rowRefs.current[i]?.focus();
  }, []);

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        select(Math.min(selectedIdx + 1, projects.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        select(Math.max(selectedIdx - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        select(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        select(projects.length - 1);
      }
    },
    [selectedIdx, select],
  );

  const selectedProject = projects[selectedIdx];

  return (
    <>
      <SectionHeading
        kicker={`${projects.length} Quests`}
        title="Quests"
        aside={
          <p className="max-w-xs text-sm" style={{ color: 'var(--muted)' }}>
            Select a quest to see the full briefing — role, stack, and outcome.
          </p>
        }
      />

      {/* ── Mobile layout: tab strip + detail ── */}
      <div className="gutter block lg:hidden">
        <MobileTabStrip
          selected={selectedIdx}
          markerId={markerId}
          onSelect={setSelectedIdx}
        />
        <div
          id={`quest-detail-${slugOf(selectedProject)}`}
          role="tabpanel"
          aria-labelledby={`quest-tab-${slugOf(selectedProject)}`}
        >
          <DetailPanel project={selectedProject} onOpen={onOpen} />
        </div>
      </div>

      {/* ── Desktop layout: two columns ── */}
      <div className="gutter hidden gap-6 lg:grid lg:grid-cols-[320px_1fr]">
        {/* Left: quest list */}
        <div
          id={listboxId}
          role="listbox"
          aria-label="Quests"
          aria-activedescendant={`quest-row-${slugOf(selectedProject)}`}
          onKeyDown={handleListKeyDown}
          className="overflow-hidden"
          style={{
            border: '1px solid var(--line)',
            clipPath: 'var(--chamfer)',
          }}
        >
          {projects.map((p, i) => (
            <QuestRow
              key={p.id}
              project={p}
              isSelected={i === selectedIdx}
              markerId={markerId}
              onClick={() => select(i)}
              rowRef={(el) => { rowRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* Right: detail panel */}
        <DetailPanel project={selectedProject} onOpen={onOpen} />
      </div>
    </>
  );
}
