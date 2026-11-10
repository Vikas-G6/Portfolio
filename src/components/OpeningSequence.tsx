/**
 * Opening sequence — ~2 seconds: "Developed by Vikas" → "THE BUILD" → "Press start".
 * • Skippable with any key or click.
 * • Shown only on first visit (localStorage key: "vg-intro-seen").
 * • Skipped entirely under prefers-reduced-motion.
 */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE } from './fx';

const SEEN_KEY = 'vg-intro-seen';

function hasBeenSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}
function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch { /* ignore */ }
}

/** beat: 0=dark, 1=studio card, 2=title, 3=press start */
export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();
  const alreadySeen = useRef(hasBeenSeen());

  // Skip entirely on reduced motion or repeat visits
  useEffect(() => {
    if (reduced || alreadySeen.current) {
      markSeen();
      onDone();
    }
  }, [reduced, onDone]);

  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduced || alreadySeen.current) return;
    // Studio card at 200ms, title at 800ms, press-start at 1600ms
    const t1 = window.setTimeout(() => setBeat(1), 200);
    const t2 = window.setTimeout(() => setBeat(2), 800);
    const t3 = window.setTimeout(() => setBeat(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [reduced]);

  const skip = () => {
    markSeen();
    onDone();
  };

  useEffect(() => {
    const onKey = () => skip();
    window.addEventListener('keydown', onKey, { once: true });
    return () => window.removeEventListener('keydown', onKey);
  });

  if (reduced || alreadySeen.current) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      role="dialog"
      aria-label="Opening titles"
      onClick={skip}
    >
      {/* Studio card */}
      <AnimatePresence>
        {beat === 1 && (
          <motion.p
            key="studio"
            className="absolute font-mono text-xs uppercase tracking-[0.5em]"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {profile.originalLabel}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Title block */}
      <AnimatePresence>
        {beat >= 2 && (
          <motion.div
            key="title"
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h1
              className="font-serif leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 16vw, 10rem)',
                color: 'var(--text)',
                letterSpacing: '0.06em',
              }}
            >
              {profile.seriesTag}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Press start */}
      <AnimatePresence>
        {beat >= 3 && (
          <motion.p
            key="start"
            className="absolute bottom-16 font-mono text-[11px] uppercase tracking-[0.4em]"
            style={{ color: 'var(--accent)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Press start
          </motion.p>
        )}
      </AnimatePresence>

      {/* Skip hint — shown immediately */}
      <p
        className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: 'var(--line-strong)' }}
      >
        Any key to skip
      </p>
    </motion.div>
  );
}
