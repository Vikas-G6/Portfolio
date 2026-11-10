import { useReducedMotion } from 'framer-motion';
import { certifications, education, experience, profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import Button from './Button';
import Panel from './Panel';

// Staggered fade+rise animation via CSS custom-properties so we can honour
// prefers-reduced-motion without importing framer-motion animations here.
const STAGGER_BASE_MS = 250;
const STAGGER_STEP_MS = 90;

function fadeStyle(index: number, reduced: boolean): React.CSSProperties {
  return reduced
    ? {}
    : {
        animationName: 'hero-fade-rise',
        animationDuration: '0.65s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        animationFillMode: 'both',
        animationDelay: `${STAGGER_BASE_MS + index * STAGGER_STEP_MS}ms`,
      };
}

// Compact stat table rows sourced entirely from portfolio.ts
function buildStats() {
  const exp = experience[0];
  const edu = education[0];
  const cert = certifications[0];
  const stack = exp
    ? ['Java', 'Spring Boot', 'React.js', 'AWS'].join(' · ')
    : '';

  return [
    { label: 'Role',        value: exp?.role ?? profile.role },
    { label: 'Experience',  value: exp ? `${exp.company} · ${exp.period}` : '—' },
    { label: 'Stack',       value: stack },
    { label: 'Cert',        value: cert ? `${cert.issuer} · ${cert.name}` : '—' },
    { label: 'Education',   value: edu ? `${edu.degree.split('—')[0].trim()} · ${edu.score}` : '—' },
  ] as const;
}

// Corner bracket ticks for the portrait frame
function BracketTick({
  pos,
}: {
  pos: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const size = 12;
  const thickness = 1.5;
  const color = 'var(--accent)';

  const styles: Record<typeof pos, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  };

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        ...styles[pos],
        width: size,
        height: size,
        borderTop: pos === 'tl' || pos === 'tr' ? `${thickness}px solid ${color}` : 'none',
        borderBottom: pos === 'bl' || pos === 'br' ? `${thickness}px solid ${color}` : 'none',
        borderLeft: pos === 'tl' || pos === 'bl' ? `${thickness}px solid ${color}` : 'none',
        borderRight: pos === 'tr' || pos === 'br' ? `${thickness}px solid ${color}` : 'none',
      }}
    />
  );
}

export default function Hero({ onResume }: { onPlay?: () => void; onResume: () => void }) {
  const { scrollTo } = useSmoothScroll();
  const reduced = useReducedMotion() ?? false;
  const stats = buildStats();

  // Two-sentence summary: first two sentences of intro
  const sentences = profile.intro
    .split(/(?<=[.?!])\s+/)
    .slice(0, 2)
    .join(' ');

  return (
    <section
      id="top"
      className="gutter relative grid min-h-[100svh] items-center"
      style={{ paddingTop: '72px', paddingBottom: '40px' }}
    >
      {/* Keyframe injected once */}
      <style>{`
        @keyframes hero-fade-rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:gap-12 xl:gap-16 lg:items-center">
        {/* ── Left: character sheet ─────────────────────────────── */}
        <div className="flex flex-col justify-center">
          {/* Kicker */}
          <p
            className="mb-3 font-mono text-[11px] tracking-[0.22em]"
            style={{ color: 'var(--accent)', ...fadeStyle(0, reduced) }}
          >
            {profile.role.toUpperCase()}
          </p>

          {/* Name */}
          <h1
            className="font-serif leading-[0.92] tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 9vw, 6.5rem)',
              color: 'var(--text)',
              ...fadeStyle(1, reduced),
            }}
          >
            {profile.displayName}
          </h1>

          {/* One-line title */}
          <p
            className="mt-3 font-sans text-base"
            style={{ color: 'var(--muted)', ...fadeStyle(2, reduced) }}
          >
            {profile.tagline.join(' · ')}
          </p>

          {/* Summary */}
          <p
            className="mt-4 max-w-[52ch] font-sans text-[15px] leading-relaxed"
            style={{ color: 'var(--text)', opacity: 0.85, ...fadeStyle(3, reduced) }}
          >
            {sentences}
          </p>

          {/* Stat table inside Panel */}
          <div style={fadeStyle(4, reduced)} className="mt-6 max-w-lg">
            <Panel className="overflow-hidden">
              <table className="w-full border-collapse font-mono text-[12px]">
                <tbody>
                  {stats.map(({ label, value }, i) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom: i < stats.length - 1 ? '1px solid var(--line)' : 'none',
                      }}
                    >
                      <td
                        className="w-[90px] whitespace-nowrap py-[7px] pl-3 pr-4 tracking-[0.1em]"
                        style={{ color: 'var(--muted)' }}
                      >
                        {label.toUpperCase()}
                      </td>
                      <td
                        className="py-[7px] pr-3 leading-snug"
                        style={{ color: 'var(--text)' }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          </div>

          {/* Action buttons */}
          <div
            className="mt-7 flex flex-wrap items-center gap-3"
            style={fadeStyle(5, reduced)}
          >
            <Button
              variant="primary"
              onClick={() => scrollTo('#originals', { offset: -64 })}
              style={{ clipPath: 'var(--chamfer)' }}
            >
              View quests
            </Button>
            <Button variant="text" onClick={onResume}>
              ⤓ Resume
            </Button>
          </div>
        </div>

        {/* ── Right: chamfered portrait ─────────────────────────── */}
        <div
          className="flex items-center justify-center lg:justify-end"
          style={fadeStyle(2, reduced)}
        >
          <div
            className="relative"
            style={{
              width: 'clamp(220px, 28vw, 360px)',
              aspectRatio: '3 / 4',
              clipPath: 'var(--chamfer)',
              border: '1px solid var(--line)',
            }}
          >
            <img
              src={profile.portrait.src}
              srcSet={profile.portrait.srcSet}
              sizes="(max-width: 1024px) 40vw, 360px"
              alt={profile.portrait.alt}
              className="h-full w-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Bracket ticks sit outside the clip so they're fully visible */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: 'clamp(220px, 28vw, 360px)',
              aspectRatio: '3 / 4',
            }}
          >
            <BracketTick pos="tl" />
            <BracketTick pos="tr" />
            <BracketTick pos="bl" />
            <BracketTick pos="br" />
          </div>
        </div>
      </div>
    </section>
  );
}
