import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueWatching from './components/ContinueWatching';
import Scene from './components/Scene';
import About from './components/About';
import Seasons from './components/Seasons';
import Originals from './components/Originals';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import HintBar from './components/HintBar';
import { EASE } from './components/fx';

const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

type Stage = 'opening' | 'home';

const ORDER: SectionId[] = ['about', 'journey', 'originals', 'skills', 'moments', 'story'];

export default function App() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

function Series() {
  const [stage, setStage] = useState<Stage>('opening');
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { lock, unlock } = useSmoothScroll();

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    picks: null,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <div className="grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {stage === 'opening' && (
          <OpeningSequence key="opening" onDone={() => setStage('home')} />
        )}
      </AnimatePresence>

      {stage === 'home' && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Navbar order={ORDER} />
          <main>
            <Hero onPlay={() => setPlaying(true)} onResume={() => setResumeOpen(true)} />
            <ContinueWatching order={ORDER} />
            {ORDER.map((id) => (
              <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => setStage('opening')} />
          </main>
          <HintBar order={ORDER} />
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>
          {playing && <PlayIntro key="intro" onClose={closeIntro} />}
        </AnimatePresence>
        <AnimatePresence>
          {project && (
            <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}
        </AnimatePresence>
      </Suspense>
    </LayoutGroup>
  );
}
