import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sectionMeta, type SectionId } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { useFinePointer } from '../hooks/useMedia';
import { EASE } from './fx';
import { PosterBackdrop } from './Poster';
import { RailButtons } from './Rail';

const GLYPHS: Record<SectionId, string> = { about: '01', journey: '02', originals: '03', picks: '04', skills: '05', moments: '06', story: '07' };

export default function ContinueWatching({ order }: { order: SectionId[] }) {
  const { scrollTo } = useSmoothScroll();
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  return (
    <section aria-label="Section navigation" className="relative z-10 -mt-10 pb-10 sm:-mt-16">
      <div className="group/rail relative">
        <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-3 overflow-x-auto py-8 sm:gap-4" data-cursor={fine ? undefined : 'drag'}>
          {order.map((id, i) => {
            const meta = sectionMeta[id];
            const shift = fine && hovered !== null && hovered !== i ? (i < hovered ? -14 : 14) : 0;
            return (
              <motion.button
                key={id}
                type="button"
                data-cursor="play"
                onClick={() => scrollTo(`#${id}`)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group relative aspect-video w-[72vw] shrink-0 snap-start overflow-visible text-left sm:w-[42vw] md:w-[30vw] lg:w-[22vw]"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-5% 0px' }}
                animate={{ x: shift, scale: fine && hovered === i ? 1.06 : 1, zIndex: hovered === i ? 10 : 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#141414] transition duration-500 group-hover:border-[#d4820a]/50">
                  {/* subtle gradient backdrop — low opacity so card stays dark */}
                  <motion.div className="absolute inset-0 opacity-30" animate={{ scale: hovered === i ? 1.12 : 1 }} transition={{ duration: 0.8, ease: EASE }}>
                    <PosterBackdrop palette={meta.palette}>
                      <span className="absolute -right-2 -top-4 font-display text-[6rem] leading-none text-white/[0.06] sm:text-[7rem]">{GLYPHS[id]}</span>
                    </PosterBackdrop>
                  </motion.div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="font-display text-2xl leading-none tracking-wide text-bone transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl">
                      {meta.card}
                    </span>
                    <span className="mt-1 text-xs text-mist opacity-100 transition duration-500 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {meta.meta}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
        <RailButtons rail={rail} />
      </div>
    </section>
  );
}
