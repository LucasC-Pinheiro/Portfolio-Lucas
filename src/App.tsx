import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Save theme preference and update DOM
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrollY={scrollY} />
      <Hero darkMode={darkMode} />
      <div className="py-12 px-4 bg-gradient-to-b from-[#f8f7ff] to-[#f3f2ff] dark:from-dark dark:to-darkLight">
        <Metrics darkMode={darkMode} />
      </div>
      <About darkMode={darkMode} />
      <Experience darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Contact darkMode={darkMode} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
