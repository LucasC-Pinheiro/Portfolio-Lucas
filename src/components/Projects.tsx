import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolio';

interface ProjectsProps {
  darkMode: boolean;
}

export const Projects = ({ darkMode }: ProjectsProps) => {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Map project IDs to translation keys
  const getProjectDescriptionKey = (projectId: string): any => {
    const keyMap: Record<string, string> = {
      todolist: 'projectTodoDescription',
      igniteshoes: 'projectIgniteshoesDescription',
      motorly: 'projectMotorlyDescription',
      flowpay: 'projectFlowpayDescription',
      remind: 'projectRemindDescription',
    };
    return keyMap[projectId] || 'projectTodoDescription';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-24 px-4 transition-colors ${
        darkMode ? 'bg-darkLight' : 'bg-[#f3f2ff]'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('projectsTitle')}
          </motion.h2>
          {!darkMode && (
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-violet-600 to-fuchsia-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              className={`rounded-lg overflow-hidden shadow-lg transition-all ${
                darkMode ? 'bg-dark border border-teal-700' : 'bg-white'
              }`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <motion.div
                className="relative overflow-hidden h-80 bg-gray-300 cursor-pointer"
                onClick={() => {
                  setSelectedProject(project.id);
                  setCurrentGalleryIndex(0);
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white font-bold text-lg">{project.title}</p>
                </motion.div>
              </motion.div>

              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-3 ${
                    darkMode ? 'text-teal-300' : 'text-teal-700'
                  }`}
                >
                  {project.title}
                </h3>
                <motion.p
                  className={`mb-4 line-clamp-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  key={`desc-${project.id}-${language}`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {t(getProjectDescriptionKey(project.id) as any)}
                </motion.p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode
                          ? 'bg-teal-900/50 text-teal-300'
                          : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('projectsViewGithub')}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={`rounded-lg overflow-hidden max-w-2xl w-full ${
                darkMode ? 'bg-darkLight' : 'bg-white'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={
                    portfolioData.projects.find((p) => p.id === selectedProject)
                      ?.gallery[currentGalleryIndex] || ''
                  }
                  alt="Gallery"
                  className="w-full h-96 object-contain"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  ✕
                </button>

                <div className="flex justify-between p-4">
                  <button
                    onClick={() =>
                      setCurrentGalleryIndex((prev) =>
                        prev === 0
                          ? (portfolioData.projects.find((p) => p.id === selectedProject)
                              ?.gallery.length || 1) - 1
                          : prev - 1
                      )
                    }
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() =>
                      setCurrentGalleryIndex((prev) =>
                        prev ===
                        (portfolioData.projects.find((p) => p.id === selectedProject)
                          ?.gallery.length || 1) - 1
                          ? 0
                          : prev + 1
                      )
                    }
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Próxima →
                  </button>
                </div>

                <div className="flex gap-2 p-4 overflow-x-auto">
                  {portfolioData.projects
                    .find((p) => p.id === selectedProject)
                    ?.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Thumb ${idx}`}
                        className={`h-20 w-20 object-cover cursor-pointer rounded ${
                          idx === currentGalleryIndex ? 'border-2 border-teal-500' : ''
                        }`}
                        onClick={() => setCurrentGalleryIndex(idx)}
                      />
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
