import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  darkMode: boolean;
}

export const About = ({ darkMode }: AboutProps) => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className={`py-24 px-4 transition-colors ${
        darkMode ? 'bg-darkLight' : 'bg-[#f3f2ff]'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('aboutTitle')}
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
          className={`${
            darkMode 
              ? 'space-y-6 text-lg leading-relaxed text-gray-300' 
              : 'bg-white rounded-2xl shadow-sm border border-violet-100 p-8 space-y-6 text-lg leading-relaxed text-gray-700'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {[
            t('aboutParagraph1'),
            t('aboutParagraph2'),
            t('aboutParagraph3'),
            t('aboutParagraph4'),
          ].map((paragraph, index) => (
            <motion.p key={index} variants={itemVariants}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
