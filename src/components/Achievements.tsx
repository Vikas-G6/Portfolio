/**
 * Trophies — simple list of achievements.
 * Earned items: solid gold marker.
 * In-progress items: muted with "In progress" Tag.
 */
import { motion } from 'framer-motion';
import { achievements } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import Tag from './Tag';
import Panel from './Panel';

// Show only genuine trophies: AWS cert, CGPA, microservices shipped.
// "capgemini" = experience entry (not a trophy), "streamagent" = repeats quest.
const TROPHY_IDS = new Set(['aws-ccp', 'btec', 'microservices']);

export default function Achievements() {
  const trophies = achievements.filter((a) => TROPHY_IDS.has(a.id));
  return (
    <>
      <SectionHeading
        kicker="Trophy Room"
        title="Trophies"
        aside={
          <p className="max-w-xs text-sm" style={{ color: 'var(--muted)' }}>
            Earned credentials, shipped work, and academic milestones.
          </p>
        }
      />

      <div className="gutter">
        <Panel>
          <ul role="list" aria-label="Achievements">
            {trophies.map((a, i) => {
              const inProgress = false;
              return (
                <motion.li
                  key={a.id}
                  className="flex items-start gap-4 p-5"
                  style={{ borderBottom: i < trophies.length - 1 ? '1px solid var(--line)' : undefined }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-4% 0px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                >
                  {/* Gold marker / muted dash */}
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0"
                    style={{ background: inProgress ? 'var(--line-strong)' : 'var(--accent)' }}
                    aria-hidden
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="font-serif text-base leading-tight"
                        style={{ color: inProgress ? 'var(--muted)' : 'var(--text)' }}
                      >
                        {a.title}
                      </span>
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: 'var(--muted)' }}
                      >
                        {a.org}
                      </span>
                      {inProgress && <Tag status="Active" label="In progress" />}
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {a.detail}
                    </p>
                    {a.link && (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] transition"
                        style={{ color: 'var(--accent)' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.75')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                      >
                        View certificate ↗
                      </a>
                    )}
                  </div>

                  {/* Laurel label */}
                  <span
                    className="shrink-0 hidden font-mono text-[10px] uppercase tracking-[0.14em] sm:block"
                    style={{ color: inProgress ? 'var(--line-strong)' : 'var(--accent)' }}
                  >
                    {a.laurel}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </>
  );
}
