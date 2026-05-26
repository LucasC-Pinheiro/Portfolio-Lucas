import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/portfolio';
import { ProjectCarousel } from './projects/ProjectCarousel';

interface ProjectsProps {
  darkMode: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const Projects = ({ darkMode }: ProjectsProps) => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative overflow-hidden py-24 md:py-28 px-4 transition-colors ${
        darkMode ? 'bg-darkLight' : 'bg-[#f3f2ff]'
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: darkMode
            ? 'radial-gradient(80% 50% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 60%)'
            : 'radial-gradient(80% 50% at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-block h-px w-8 ${
                darkMode ? 'bg-violet-400/40' : 'bg-violet-500/50'
              }`}
              aria-hidden
            />
            <span
              className={`text-[11px] uppercase tracking-[0.22em] font-semibold ${
                darkMode ? 'text-violet-300' : 'text-violet-600'
              }`}
            >
              {t('projectsEyebrow')} · {String(projects.length).padStart(2, '0')}
            </span>
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('projectsTitle')}
          </h2>
          <p
            className={`mt-4 max-w-2xl text-base md:text-lg leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('projectsLead')}
          </p>
        </motion.div>

        <ProjectCarousel projects={projects} darkMode={darkMode} />
      </div>
    </section>
  );
};
