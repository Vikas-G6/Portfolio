/**
 * FinalCTA — serif invite, email with copy-to-clipboard, social links, resume.
 * All inside a Panel.
 */
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE } from './fx';
import Panel from './Panel';

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      if (copyRef.current) clearTimeout(copyRef.current);
      copyRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const links = [
    { label: 'GitHub', href: profile.links.github },
    { label: 'LinkedIn', href: profile.links.linkedin },
    { label: 'Resume', href: profile.resumePdf, download: true },
  ];

  return (
    <section id="contact" className="gutter py-16 sm:py-24">
      <Panel as="section" className="p-8 sm:p-12">
        {/* Serif invite */}
        <motion.p
          className="mb-8 font-serif text-[clamp(1.8rem,4vw,3.2rem)] leading-tight"
          style={{ color: 'var(--text)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Got a project worth building? Let's make it happen.
        </motion.p>

        {/* Email row */}
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-base transition sm:text-lg"
            style={{ color: 'var(--accent)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.75')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          >
            {profile.email}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="btn-primary"
            style={{ clipPath: 'var(--chamfer)', fontSize: '0.8125rem', padding: '0.4375rem 1rem' }}
            aria-label="Copy email address"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>

          {/* Screen-reader live region */}
          <span
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </motion.div>

        {/* Links row */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.download ? undefined : '_blank'}
              rel={l.download ? undefined : 'noreferrer'}
              download={l.download ? true : undefined}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition"
              style={{
                border: '1px solid var(--line-strong)',
                color: 'var(--muted)',
                clipPath: 'var(--chamfer)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--text)';
                el.style.borderColor = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--muted)';
                el.style.borderColor = 'var(--line-strong)';
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="my-8" style={{ borderTop: '1px solid var(--line)' }} />

        {/* Footer nav */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} {profile.displayName}
          </p>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => scrollTo(0, { offset: 0 })}
              className="font-mono text-[11px] uppercase tracking-[0.2em] transition"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
            >
              ↑ Back to top
            </button>
            <button
              type="button"
              onClick={onReplay}
              className="font-mono text-[11px] uppercase tracking-[0.2em] transition"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)')}
            >
              ↺ Replay intro
            </button>
          </div>
        </div>
      </Panel>
    </section>
  );
}
