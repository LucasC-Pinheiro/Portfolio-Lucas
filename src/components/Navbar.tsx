import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/i18n';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  scrollY: number;
}

export const Navbar = ({ darkMode, setDarkMode, scrollY }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t('navHome'), href: '#home', id: 'home' },
    { label: t('navAbout'), href: '#about', id: 'about' },
    { label: t('navSkills'), href: '#skills', id: 'skills' },
    { label: t('navProjects'), href: '#projects', id: 'projects' },
    { label: t('navContact'), href: '#contact', id: 'contact' },
  ];

  const hasScrolled = scrollY > 50;

  // Detect active section based on scroll position
  useEffect(() => {
    const sections = navItems.map(item => item.id);
    const sectionElements = sections.map(id => document.getElementById(id));

    const handleIntersection = () => {
      let current = 'home';
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = sections[index];
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleIntersection);
    return () => window.removeEventListener('scroll', handleIntersection);
  }, []);

  // Update indicator position when active section changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = document.querySelector(`a[href="#${activeSection}"]`);
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const navContainer = document.querySelector('.nav-links-container') as HTMLElement;
        if (navContainer) {
          const containerRect = navContainer.getBoundingClientRect();
          setIndicatorStyle({
            left: rect.left - containerRect.left,
            width: rect.width,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <motion.header
        className={`px-6 py-2 rounded-full border transition-all duration-300 ${
          darkMode
            ? hasScrolled
              ? 'bg-white/5 backdrop-blur-xl border-white/10 shadow-lg shadow-violet-500/20'
              : 'bg-white/5 backdrop-blur-xl border-white/10 shadow-lg shadow-violet-500/10'
            : hasScrolled
            ? 'bg-white/60 backdrop-blur-xl border-violet-100 shadow-lg shadow-violet-200/50'
            : 'bg-white/60 backdrop-blur-xl border-violet-100 shadow-lg shadow-violet-200/30'
        }`}
        style={
          darkMode
            ? {
                boxShadow: hasScrolled
                  ? 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 10px 30px rgba(139,92,246,0.2)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 10px 15px rgba(139,92,246,0.1)',
              }
            : {
                boxShadow: hasScrolled
                  ? 'inset 0 0 0 1px rgba(139,92,246,0.1), 0 10px 30px rgba(139,92,246,0.1)'
                  : 'inset 0 0 0 1px rgba(139,92,246,0.1), 0 10px 15px rgba(139,92,246,0.05)',
              }
        }
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <nav className="flex items-center justify-between gap-8 md:gap-12">
          {/* Logo/Initials */}
          <motion.div
            className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-violet-700'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            LP
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 relative overflow-hidden px-2 nav-links-container">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                className={`relative text-sm font-medium transition-colors py-1 px-2 ${
                  activeSection === item.id 
                    ? darkMode ? 'text-white' : 'text-violet-600'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-violet-600'
                }`}
                onClick={handleNavClick}
              >
                {item.label}
              </motion.a>
            ))}
            {/* Active indicator bar - constrained and positioned absolutely */}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          </div>

          {/* Language Toggle + Theme Toggle - Unified Control Group */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            {!darkMode ? (
              <div className="flex items-center bg-violet-100 rounded-full p-0.5 gap-1">
                {(['pt', 'en'] as Language[]).map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="relative px-2.5 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    {language === lang && (
                      <motion.div
                        layoutId="languageIndicator"
                        className="absolute inset-0 rounded-full bg-violet-200"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${language === lang ? 'text-violet-700 font-semibold' : 'text-gray-400'}`}>
                      {lang.toUpperCase()}
                    </span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className={`relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10`}>
                {(['pt', 'en'] as Language[]).map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`relative text-xs px-2 py-1 transition-colors ${
                      language === lang 
                        ? 'text-white font-semibold'
                        : 'text-gray-400'
                    }`}
                  >
                    {lang.toUpperCase()}
                    {language === lang && (
                      <motion.span
                        className="absolute inset-0 rounded-full -z-10 bg-white/20"
                        layoutId="languageIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
            {/* Divider */}
            <div className="w-px h-5 bg-white/10" />

            {/* Theme Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative p-2 rounded-full transition-colors ${
                darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-violet-100 hover:bg-violet-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-yellow-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle - Only show on mobile */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="h-0.5 w-5 bg-white rounded-full"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 7 : 0,
              }}
            />
            <motion.span
              className="h-0.5 w-5 bg-white rounded-full"
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="h-0.5 w-5 bg-white rounded-full"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -7 : 0,
              }}
            />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu - Expands downward */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-20 left-4 right-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg shadow-black/50 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={handleNavClick}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
