import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Typewriter } from './Typewriter';

interface HeroProps {
  darkMode: boolean;
}

export const Hero = ({ darkMode }: HeroProps) => {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    exit: { opacity: 0, y: -5, transition: { duration: 0.15 } },
    enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="home"
      className={`min-h-screen pt-24 flex items-center justify-center px-4 transition-colors ${
        darkMode ? 'bg-dark' : 'bg-[#f8f7ff]'
      }`}
      style={
        !darkMode ? {
          backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        } : undefined
      }
    >
      <motion.div
        className="max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <motion.h1
              className={`text-3xl md:text-5xl font-bold mb-6 font-['Plus_Jakarta_Sans'] ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              key={`heading-${language}`}
              initial="exit"
              animate="enter"
              exit="exit"
              variants={contentVariants}
            >
              <Typewriter 
                phrase1={t('heroFullGreeting')} 
                phrase2={t('heroTitle')}
                darkMode={darkMode} 
                typeSpeed={80}
                deleteSpeed={40}
                pauseAfterType={2000}
                pauseAfterDelete={800}
              />
            </motion.h1>
            <motion.a
              href="#projects"
              className="inline-block px-8 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:shadow-2xl transition-all hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('heroButton')}
            </motion.a>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                padding: '4px',
              }}
            >
              <motion.img
                src="./img/Retrato profissional de jovem com gravata.png"
                alt={t('heroName')}
                className="w-full h-full rounded-full object-cover shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
