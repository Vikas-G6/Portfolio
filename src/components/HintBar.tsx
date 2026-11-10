/**
 * HintBar — fixed small bar at the bottom of the page.
 * Shows keyboard shortcuts. Hidden on touch devices.
 * Implements 1–4 key shortcuts to jump to sections.
 */
import { useEffect } from 'react';
import { useFinePointer } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import type { SectionId } from '../data/portfolio';

const HINTS = ['← → select', 'Enter open', '1–4 jump'];

interface HintBarProps {
  /** Ordered sections; positions 1–4 mapped to keys 1–4 */
  order: SectionId[];
}

export default function HintBar({ order }: HintBarProps) {
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  // 1–4 key shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) {
        const id = order[n - 1];
        if (id) scrollTo(`#${id}`, { offset: -64 });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [order, scrollTo]);

  // Hidden on touch-only devices
  if (!fine) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] hidden items-center justify-center gap-6 px-4 py-2 md:flex"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}
      aria-hidden="true"
    >
      {HINTS.map((h) => (
        <span key={h} className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--line-strong)' }}>
          {h}
        </span>
      ))}
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--line)' }}>·</span>
      {order.slice(0, 4).map((id, i) => (
        <span key={id} className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--line-strong)' }}>
          {i + 1} {id}
        </span>
      ))}
    </div>
  );
}
