/**
 * Stat Sheet — skill rows with segmented bars and tier labels.
 * Tiers: Daily use | Working knowledge | Learning
 * Hover/focus reveals where the skill appears in projects.
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillCategories, skillEvidence, type Skill } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

// Tier is derived from skillEvidence presence + explicit note
function tier(skill: Skill): 'Daily use' | 'Working knowledge' | 'Learning' {
  if (skill.note === 'Primary' || skill.note === 'Core') return 'Daily use';
  if (skillEvidence[skill.name]?.length) return 'Working knowledge';
  return 'Learning';
}

const TIER_SEGMENTS: Record<string, number> = {
  'Daily use': 3,
  'Working knowledge': 2,
  'Learning': 1,
};

// ─── Segmented bar ───────────────────────────────────────────────────────────

function SegBar({ filled, total = 3 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-[7px] w-4"
          style={{
            background: i < filled ? 'var(--accent)' : 'var(--line)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Skill row ───────────────────────────────────────────────────────────────

function SkillRow({
  skill,
  highlighted,
  onHighlight,
  onBlur,
}: {
  skill: Skill;
  highlighted: boolean;
  onHighlight: () => void;
  onBlur: () => void;
}) {
  const t = tier(skill);
  const segments = TIER_SEGMENTS[t];
  const evidence = skillEvidence[skill.name];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={highlighted}
      onMouseEnter={onHighlight}
      onMouseLeave={onBlur}
      onFocus={onHighlight}
      onBlur={onBlur}
      onClick={() => (highlighted ? onBlur() : onHighlight())}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); highlighted ? onBlur() : onHighlight(); } }}
      className="group flex cursor-pointer items-center gap-3 py-2.5 transition focus:outline-none"
      style={{
        borderBottom: '1px solid var(--line)',
        background: highlighted ? 'var(--surface)' : 'transparent',
      }}
    >
      {/* Mono code */}
      <span
        className="w-6 shrink-0 text-center font-mono text-[11px] font-bold"
        style={{ color: highlighted ? 'var(--accent)' : 'var(--muted)' }}
      >
        {skill.mono}
      </span>

      {/* Name */}
      <span
        className="flex-1 text-sm font-medium"
        style={{ color: highlighted ? 'var(--text)' : 'var(--muted)' }}
      >
        {skill.name}
        {skill.note && (
          <span
            className="ml-2 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider"
            style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            {skill.note}
          </span>
        )}
      </span>

      {/* Bar */}
      <SegBar filled={segments} />

      {/* Tier label */}
      <span
        className="hidden w-36 shrink-0 text-right font-mono text-[11px] sm:block"
        style={{ color: highlighted ? 'var(--accent)' : 'var(--line-strong)' }}
      >
        {t}
      </span>

      {/* Evidence — slides in on highlight */}
      <AnimatePresence initial={false}>
        {highlighted && evidence && (
          <motion.span
            className="absolute right-0 top-full z-10 w-full max-w-xs font-mono text-[11px] leading-snug"
            style={{ color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--line)', padding: '0.375rem 0.625rem' }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {evidence.join(' · ')}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Skills() {
  const [cat, setCat] = useState(0);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const category = skillCategories[cat];

  return (
    <>
      <SectionHeading
        kicker="Stat Sheet"
        title="Skill Build"
        aside={
          <p className="max-w-xs text-sm" style={{ color: 'var(--muted)' }}>
            Hover or focus a skill to see where it appears across projects.
          </p>
        }
      />

      <div className="gutter grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        {/* Category tabs */}
        <div
          className="rail -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillCategories.map((c, i) => {
            const active = i === cat;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`skills-panel-${c.id}`}
                id={`skills-tab-${c.id}`}
                onClick={() => { setCat(i); setHighlightedSkill(null); }}
                className="relative shrink-0 px-4 py-3 text-left transition focus:outline-none"
                style={{
                  background: active ? 'var(--surface)' : 'transparent',
                  color: active ? 'var(--text)' : 'var(--muted)',
                  borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                  clipPath: active ? 'var(--chamfer)' : undefined,
                }}
              >
                <span className="block font-serif text-lg">{c.title}</span>
                <span className="hidden font-mono text-[10px] lg:block" style={{ color: 'var(--line-strong)' }}>
                  {c.skills.length} skills · {c.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skill rows */}
        <div id={`skills-panel-${category.id}`} role="tabpanel" aria-labelledby={`skills-tab-${category.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {/* Column headers */}
              <div
                className="mb-1 flex items-center gap-3 py-1.5"
                style={{ borderBottom: '1px solid var(--line-strong)' }}
              >
                <span className="w-6 shrink-0" />
                <span className="flex-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
                  Skill
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }} aria-hidden>
                  Level
                </span>
                <span className="hidden w-36 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.18em] sm:block" style={{ color: 'var(--muted)' }}>
                  Tier
                </span>
              </div>

              <div className="relative">
                {category.skills.map((s) => (
                  <SkillRow
                    key={s.name}
                    skill={s}
                    highlighted={highlightedSkill === s.name}
                    onHighlight={() => setHighlightedSkill(s.name)}
                    onBlur={() => setHighlightedSkill(null)}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="mt-5 flex flex-wrap gap-5">
                {(['Daily use', 'Working knowledge', 'Learning'] as const).map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <SegBar filled={TIER_SEGMENTS[t]} />
                    <span className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>{t}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
