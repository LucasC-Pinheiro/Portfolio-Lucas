import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolio';

interface ContactProps {
  darkMode: boolean;
}

export const Contact = ({ darkMode }: ContactProps) => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {/* Tagline Section */}
      <section
        className={`py-12 text-center transition-colors ${
          darkMode ? 'bg-dark' : 'bg-white'
        }`}
      >
        <motion.p
          className={`text-2xl md:text-3xl font-montserrat font-bold italic ${
            darkMode ? 'text-white' : 'text-teal-700'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          {t('contactTagline')}
        </motion.p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={ref}
        className={`py-24 px-4 transition-colors ${
          darkMode ? 'bg-darkLight' : 'bg-white'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {t('contactTitle')}
          </motion.h2>

          <motion.div
            className="text-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Email */}
            <motion.div
              className="flex items-center justify-center gap-4"
              variants={itemVariants}
            >
              <i
                className={`fas fa-envelope text-2xl ${
                  darkMode ? 'text-teal-400' : 'text-teal-500'
                }`}
              ></i>
              <a
                href={`mailto:${portfolioData.email}`}
                className={`text-lg ${
                  darkMode
                    ? 'text-gray-300 hover:text-teal-400'
                    : 'text-gray-700 hover:text-teal-600'
                } transition-colors`}
              >
                {portfolioData.email}
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              className="flex items-center justify-center gap-4"
              variants={itemVariants}
            >
              <i
                className={`fas fa-phone text-2xl ${
                  darkMode ? 'text-teal-400' : 'text-teal-500'
                }`}
              ></i>
              <a
                href={`tel:${portfolioData.phone.replace(/[^\d+]/g, '')}`}
                className={`text-lg ${
                  darkMode
                    ? 'text-gray-300 hover:text-teal-400'
                    : 'text-gray-700 hover:text-teal-600'
                } transition-colors`}
              >
                {portfolioData.phone}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center gap-8 mt-8"
              variants={itemVariants}
            >
              {portfolioData.socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-4xl transition-colors ${
                    darkMode
                      ? 'text-teal-400 hover:text-teal-300'
                      : 'text-teal-500 hover:text-teal-700'
                  }`}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className={`py-6 text-center transition-colors ${
          darkMode ? 'bg-dark text-white' : 'bg-gray-900 text-white'
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <p>&copy; 2025 Lucas Pinheiro. {t('footerText')}</p>
      </motion.footer>
    </>
  );
};
