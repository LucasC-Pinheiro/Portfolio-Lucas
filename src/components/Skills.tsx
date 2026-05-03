import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolio';

interface SkillsProps {
  darkMode: boolean;
}

const skillCategories = ['Frontend', 'Mobile', 'Backend', 'Data & State', 'Tools'] as const;

export const Skills = ({ darkMode }: SkillsProps) => {
  const { t } = useLanguage();

  // Group skills by category
  const groupedSkills = skillCategories.reduce((acc, category) => {
    acc[category] = portfolioData.skills.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<typeof skillCategories[number], typeof portfolioData.skills>);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.section
      id="skills"
      className={`py-24 px-4 transition-colors ${
        darkMode ? 'bg-dark' : 'bg-[#f8f7ff]'
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={sectionVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title with Gradient Underline */}
        <div className="text-center mb-20">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            {t('navSkills')}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full mx-auto"></div>
        </div>

        {/* Skills Categories */}
        <div className="space-y-10">
          {skillCategories.map((category) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.5 },
                },
              }}
            >
              {/* Category Title */}
              <motion.div
                className={`mb-6 pb-3 border-b ${
                  darkMode ? 'border-white/10' : 'border-violet-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
              >
                <h3
                  className={`text-xs uppercase tracking-widest font-semibold ${
                    darkMode ? 'text-gray-400' : 'text-violet-600'
                  }`}
                >
                  {category}
                </h3>
              </motion.div>

              {/* Skills Badges */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={badgeContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {groupedSkills[category].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-gray-300 hover:border-violet-400 hover:text-violet-400'
                        : 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-400 hover:text-violet-500'
                    }`}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
