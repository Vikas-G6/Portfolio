import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import Button from './Button';

const NAV_ITEMS = [
  { label: 'Work',   href: 'originals' },
  { label: 'Story',  href: 'journey'   },
  { label: 'Skills', href: 'skills'    },
  { label: 'Resume', href: 'story'     },
] as const;

export default function Navbar({ order }: { order: string[] }) {
  const { scrollTo } = useSmoothScroll();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  // Underline slider refs
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev && !mobileOpen);
  });

  // Track which section is active
  useEffect(() => {
    const ids = ['top', ...order];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [order]);

  // Move underline indicator to the active nav item
  useEffect(() => {
    if (!navRef.current) return;
    const activeItem = NAV_ITEMS.find((n) => n.href === active);
    if (!activeItem) {
      setIndicatorStyle(null);
      return;
    }
    const btn = navRef.current.querySelector<HTMLElement>(`[data-nav="${activeItem.href}"]`);
    if (!btn) {
      setIndicatorStyle(null);
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
  }, [active]);

  const go = (href: string) => {
    setMobileOpen(false);
    scrollTo(`#${href}`, { offset: href === 'top' ? 0 : -64 });
  };

  const monogram = profile.firstName.slice(0, 2);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60]"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main bar */}
      <div
        className="gutter flex h-14 items-center justify-between transition-colors duration-300"
        style={{
          background: solid || mobileOpen ? 'var(--surface)' : 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        {/* Left: name / monogram */}
        <button
          type="button"
          onClick={() => go('top')}
          aria-label="Back to top"
          className="flex items-center gap-2 transition-colors"
          style={{ color: 'var(--text)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
        >
          {/* Monogram block */}
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center font-mono text-[11px] font-bold tracking-wider"
            style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
          >
            {monogram}
          </span>
          <span className="hidden font-serif text-base tracking-wide sm:block" style={{ color: 'inherit' }}>
            {profile.displayName}
          </span>
        </button>

        {/* Centre: desktop nav */}
        <nav ref={navRef} aria-label="Primary" className="relative hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <button
                key={href}
                data-nav={href}
                type="button"
                onClick={() => go(href)}
                className="relative pb-1 font-sans text-sm transition-colors"
                style={{ color: isActive ? 'var(--text)' : 'var(--muted)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isActive ? 'var(--text)' : 'var(--muted)')}
              >
                {label}
              </button>
            );
          })}
          {/* Sliding gold underline */}
          {indicatorStyle && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-0 h-[2px]"
              style={{ background: 'var(--accent)' }}
              animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            />
          )}
        </nav>

        {/* Right: Hire me + hamburger */}
        <div className="flex items-center gap-3">
          <a href={`mailto:${profile.email}`} className="hidden lg:block">
            <Button variant="primary" style={{ clipPath: 'var(--chamfer)', fontSize: '0.8125rem', padding: '0.5rem 1.25rem' }}>
              Hire me
            </Button>
          </a>
          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <motion.span
              className="block h-px w-5"
              style={{ background: 'var(--text)' }}
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-5"
              style={{ background: 'var(--text)' }}
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-px w-5"
              style={{ background: 'var(--text)' }}
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            key="mobile-nav"
            className="gutter fixed inset-0 top-14 z-[-1] flex flex-col justify-center gap-6 lg:hidden"
            style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                onClick={() => go(href)}
                className="text-left font-serif text-4xl transition-colors"
                style={{ color: active === href ? 'var(--accent)' : 'var(--text)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = active === href ? 'var(--accent)' : 'var(--text)')
                }
              >
                {label}
              </button>
            ))}
            <a href={`mailto:${profile.email}`} className="mt-4 inline-block">
              <Button variant="primary" style={{ clipPath: 'var(--chamfer)' }}>
                Hire me
              </Button>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
