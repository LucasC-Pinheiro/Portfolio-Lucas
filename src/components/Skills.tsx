import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data/portfolio';

interface SkillsProps {
  darkMode: boolean;
}

const skillCategories = ['Frontend', 'Mobile', 'Backend', 'Tools'] as const;

export const Skills = ({ darkMode }: SkillsProps) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Group skills by category
  const groupedSkills = skillCategories.reduce((acc, category) => {
    acc[category] = portfolioData.skills.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<typeof skillCategories[number], typeof portfolioData.skills>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const getCategoryColor = (category: typeof skillCategories[number]) => {
    const colors: Record<typeof skillCategories[number], { bg: string; border: string; text: string; darkBg: string; darkBorder: string; darkText: string }> = {
      Frontend: {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-700',
        border: 'border-blue-300',
        darkBg: 'dark:bg-blue-900/20 dark:border-blue-700',
        darkBorder: 'dark:border-blue-600',
        darkText: 'dark:text-blue-300',
      },
      Mobile: {
        bg: 'bg-purple-50 border-purple-200',
        text: 'text-purple-700',
        border: 'border-purple-300',
        darkBg: 'dark:bg-purple-900/20 dark:border-purple-700',
        darkBorder: 'dark:border-purple-600',
        darkText: 'dark:text-purple-300',
      },
      Backend: {
        bg: 'bg-emerald-50 border-emerald-200',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        darkBg: 'dark:bg-emerald-900/20 dark:border-emerald-700',
        darkBorder: 'dark:border-emerald-600',
        darkText: 'dark:text-emerald-300',
      },
      Tools: {
        bg: 'bg-orange-50 border-orange-200',
        text: 'text-orange-700',
        border: 'border-orange-300',
        darkBg: 'dark:bg-orange-900/20 dark:border-orange-700',
        darkBorder: 'dark:border-orange-600',
        darkText: 'dark:text-orange-300',
      },
    };
    return colors[category];
  };

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-24 px-4 transition-colors ${
        darkMode ? 'bg-dark' : 'bg-[#f8f7ff]'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-4xl md:text-5xl font-bold text-center mb-20 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Tecnologias
        </motion.h2>

        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category) => (
            <motion.div key={category} variants={categoryVariants}>
              {/* Category Header */}
              <motion.div
                className={`mb-6 pb-4 border-b-2 ${
                  darkMode
                    ? 'border-gray-700'
                    : 'border-violet-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3
                  className={`text-xl md:text-2xl font-bold ${
                    darkMode
                      ? getCategoryColor(category).darkText
                      : 'text-violet-600'
                  }`}
                >
                  {category}
                </h3>
              </motion.div>

              {/* Skills Grid for Category */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {groupedSkills[category].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`p-4 md:p-6 rounded-lg border-2 transition-all ${
                      darkMode
                        ? `${getCategoryColor(category).darkBg} ${getCategoryColor(category).darkBorder} hover:shadow-lg hover:shadow-violet-500/30`
                        : 'bg-white border-violet-100 shadow-sm hover:border-violet-300 hover:shadow-md hover:shadow-violet-100'
                    }`}
                    variants={skillVariants}
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                    <h4
                      className={`text-sm md:text-base font-semibold text-center ${
                        darkMode
                          ? getCategoryColor(category).darkText
                          : 'text-gray-700'
                      }`}
                    >
                      {skill.name}
                    </h4>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
