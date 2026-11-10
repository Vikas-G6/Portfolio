/**
 * PlayIntro — optional highlight reel triggered by "Play intro" in Hero.
 * Slides are auto-advanced. Arrow keys navigate, Escape closes.
 * Streaming/serialised wording removed.
 */
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { introSlides, profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE } from './fx';

const SLIDE_MS = 3600;

export default function PlayIntro({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const reduced = useReducedMotionPref();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= introSlides.length - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
    progress.set(0);
  }, [progress, onClose]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
    progress.set(0);
  }, [progress]);

  // Auto-advance via RAF (exact pause support)
  useEffect(() => {
    if (reduced || paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const v = progress.get() + (now - last) / SLIDE_MS;
      last = now;
      if (v >= 1) { next(); return; }
      progress.set(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, paused, index, next, progress]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  const slide = introSlides[index];

  return (
    <motion.div
      className="fixed inset-0 z-[130] overflow-hidden"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio highlights"
    >
      {/* Blurred portrait background */}
      <div className="absolute inset-0 flex items-end justify-center opacity-10" aria-hidden>
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="100vw"
          alt=""
          className="h-[88vh] w-auto max-w-none object-contain"
          style={{ filter: 'blur(8px)' }}
        />
      </div>

      {/* Progress bars */}
      <div className="absolute inset-x-0 top-0 z-20 flex gap-1 px-4 pt-4 sm:px-10 sm:pt-6">
        {introSlides.map((s, i) => (
          <div key={s.kicker} className="h-[2px] flex-1 overflow-hidden" style={{ background: 'var(--line)' }}>
            <motion.div
              className="h-full origin-left"
              style={{
                background: 'var(--accent)',
                scaleX: i === index ? progress : i < index ? 1 : 0,
              }}
            />
          </div>
        ))}
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-3xl"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.5em]"
              style={{ color: 'var(--accent)' }}
            >
              {slide.kicker}
            </p>
            <h2
              className="font-serif leading-[0.9]"
              style={{ fontSize: 'clamp(2.8rem,9vw,7rem)', color: 'var(--text)' }}
            >
              {slide.title}
            </h2>
            <div className="mt-5 space-y-1.5">
              {slide.lines.map((l, li) => (
                <motion.p
                  key={l}
                  className="text-base sm:text-lg"
                  style={{ color: 'var(--muted)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + li * 0.12, duration: 0.5, ease: EASE }}
                >
                  {l}
                </motion.p>
              ))}
            </div>
            {slide.chips && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {slide.chips.map((c, ci) => (
                  <motion.span
                    key={c}
                    className="px-3 py-1 font-mono text-[11px] tracking-[0.1em]"
                    style={{ border: '1px solid var(--line-strong)', color: 'var(--muted)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + ci * 0.06 }}
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tap zones */}
      <button type="button" aria-label="Previous" className="absolute inset-y-0 left-0 z-[5] w-1/4" onClick={prev} />
      <button type="button" aria-label="Next" className="absolute inset-y-0 right-0 z-[5] w-1/4" onClick={next} />

      {/* Controls bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Resume' : 'Pause'}
            className="flex h-9 w-9 items-center justify-center transition"
            style={{ border: '1px solid var(--line-strong)', color: 'var(--muted)' }}
          >
            {paused ? '▶' : '▐▐'}
          </button>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] sm:block" style={{ color: 'var(--muted)' }}>
            Space · ← → · Esc
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn-primary"
          style={{ clipPath: 'var(--chamfer)', fontSize: '0.75rem', padding: '0.4375rem 1rem' }}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
