/**
 * About — Panel with a short paragraph + facts table in mono type.
 * No portrait (used once in Hero). Different angle: how I work and what I'm building toward.
 */
import { motion } from 'framer-motion';
import { education, experience, profile } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import Panel from './Panel';

const aboutParagraph =
  'I work best at the intersection of backend architecture and frontend craft — designing APIs one day, wiring up a React UI the next. ' +
  'Right now I\'m deepening my knowledge of system design and AWS beyond Cloud Practitioner level, and exploring how to integrate LLMs reliably into production services. ' +
  'I like problems that have real trade-offs: the kind where picking the right architecture matters more than picking the right framework.';

export default function About() {
  const facts: { label: string; value: string; sub?: string }[] = [
    {
      label: 'Current role',
      value: `${experience[0].role}`,
      sub: `${experience[0].company} · ${experience[0].period}`,
    },
    {
      label: 'Education',
      value: 'B.Tech — EXTC',
      sub: `${education[0].school} · ${education[0].score}`,
    },
    {
      label: 'Primary lang',
      value: 'Java',
      sub: 'Spring Boot · Spring Cloud · Microservices',
    },
    {
      label: 'Location',
      value: profile.location,
    },
    {
      label: 'Currently',
      value: 'System Design · AWS · LLM at scale',
    },
  ];

  return (
    <>
      <SectionHeading kicker="About" title="About" />

      <div className="gutter">
        <Panel>
          {/* Paragraph */}
          <div className="p-5 sm:p-6" style={{ borderBottom: '1px solid var(--line)' }}>
            <motion.p
              className="max-w-3xl font-sans text-[15px] leading-relaxed"
              style={{ color: 'var(--text)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {aboutParagraph}
            </motion.p>
          </div>

          {/* Facts table */}
          <dl>
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                className="flex items-start gap-4 px-5 py-3.5"
                style={{ borderBottom: i < facts.length - 1 ? '1px solid var(--line)' : undefined }}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
              >
                <dt
                  className="w-28 shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: 'var(--muted)' }}
                >
                  {f.label}
                </dt>
                <dd>
                  <span className="block text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {f.value}
                  </span>
                  {f.sub && (
                    <span className="mt-0.5 block font-mono text-[12px] leading-snug" style={{ color: 'var(--muted)' }}>
                      {f.sub}
                    </span>
                  )}
                </dd>
              </motion.div>
            ))}
          </dl>
        </Panel>

        {profile.interests.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.interests.map((item) => (
              <span
                key={item}
                className="px-3 py-1 font-mono text-[12px]"
                style={{ border: '1px solid var(--line-strong)', color: 'var(--muted)' }}
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
