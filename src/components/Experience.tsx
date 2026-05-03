import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceProps {
  darkMode: boolean;
}

interface ExperienceItem {
  roleKey: string;
  companyKey: string;
  periodKey: string;
  descriptionKey: string;
}

export const Experience = ({ darkMode }: ExperienceProps) => {
  const { t } = useLanguage();

  const experiences: ExperienceItem[] = [
    {
      roleKey: 'experienceMobileRole',
      companyKey: 'experienceMobileCompany',
      periodKey: 'experienceMobilePeriod',
      descriptionKey: 'experienceMobileDescription',
    },
    {
      roleKey: 'experienceFreelanceRole',
      companyKey: 'experienceFreelanceCompany',
      periodKey: 'experienceFreelancePeriod',
      descriptionKey: 'experienceFreelanceDescription',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experience"
      className={`py-24 px-4 transition-colors ${
        darkMode ? 'bg-darkLight' : 'bg-white'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t('experienceTitle' as any)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500"
            style={{ height: '100%' }}
          />

          {experiences.map((exp, index) => (
            <motion.div key={index} className="relative pl-20 md:pl-32" variants={itemVariants}>
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-3 top-2 w-8 h-8 bg-violet-500 rounded-full border-4 border-white dark:border-darkLight flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              {/* Card */}
              <motion.div
                className={`p-6 rounded-xl border transition-all ${
                  darkMode
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-violet-100'
                }`}
                whileHover={{ y: -4 }}
              >
                {/* Role */}
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {t(exp.roleKey as any)}
                </h3>

                {/* Company and Period */}
                <div className="text-violet-400 text-sm mb-4">
                  <p>{t(exp.companyKey as any)}</p>
                  <p>{t(exp.periodKey as any)}</p>
                </div>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`}
                >
                  {t(exp.descriptionKey as any)}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
