// src/components/Typewriter.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterProps {
  phrase1: string;
  phrase2: string;
  darkMode: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

type AnimationPhase = 'typing-1' | 'waiting-1' | 'deleting-1' | 'pausing-1' | 'typing-2' | 'waiting-2' | 'deleting-2' | 'pausing-2';

// Helper function to split phrases into prefix and name
const splitPhrase = (phrase: string): { prefix: string; name: string } => {
  // EN: "Hi, I'm Lucas Pinheiro"
  if (phrase.includes("Hi, I'm") && phrase.includes("Lucas Pinheiro")) {
    return {
      prefix: "Hi, I'm ",
      name: "Lucas Pinheiro"
    };
  }
  
  // PT: "Olá, eu sou Lucas Pinheiro"
  if (phrase.includes("Olá, eu sou") && phrase.includes("Lucas Pinheiro")) {
    return {
      prefix: "Olá, eu sou ",
      name: "Lucas Pinheiro"
    };
  }

  // Default: no name to highlight
  return {
    prefix: phrase,
    name: ""
  };
};

// Render text with gradient applied progressively to the name portion
const renderTextWithGradient = (displayedText: string, phrase1: string, phrase2: string, phase: AnimationPhase, darkMode: boolean): JSX.Element => {
  const isPhrase1 = phase.includes('1');
  const fullPhrase = isPhrase1 ? phrase1 : phrase2;
  const { prefix } = splitPhrase(fullPhrase);
  
  // Calculate how many characters of the prefix and name have been typed
  const prefixLength = prefix.length;
  const displayedPrefix = displayedText.slice(0, prefixLength);
  const displayedNameChars = displayedText.slice(prefixLength);
  
  return (
    <>
      <span className={darkMode ? 'text-white' : 'text-gray-900'}>
        {displayedPrefix}
      </span>
      {displayedNameChars.length > 0 && (
        <span className={`bg-clip-text text-transparent ${
          darkMode 
            ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500'
            : 'bg-gradient-to-r from-violet-600 to-fuchsia-500'
        }`}>
          {displayedNameChars}
        </span>
      )}
    </>
  );
};

export const Typewriter = ({ 
  phrase1, 
  phrase2,
  darkMode, 
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseAfterType = 2000,
  pauseAfterDelete = 800,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<AnimationPhase>('typing-1');

  // Main animation loop
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    const currentPhrase = phase.includes('2') ? phrase2 : phrase1;

    switch (phase) {
      case 'typing-1':
      case 'typing-2': {
        // Typing phase
        const typeChar = () => {
          if (charIndex < currentPhrase.length) {
            setDisplayedText(currentPhrase.slice(0, charIndex + 1));
            charIndex++;
            timeout = setTimeout(typeChar, typeSpeed);
          } else {
            // Move to waiting phase
            setPhase(phase === 'typing-1' ? 'waiting-1' : 'waiting-2');
          }
        };
        timeout = setTimeout(typeChar, typeSpeed);
        break;
      }

      case 'waiting-1':
      case 'waiting-2': {
        // Pause after typing
        timeout = setTimeout(() => {
          setPhase(phase === 'waiting-1' ? 'deleting-1' : 'deleting-2');
        }, pauseAfterType);
        break;
      }

      case 'deleting-1':
      case 'deleting-2': {
        // Deleting phase
        charIndex = currentPhrase.length;
        const deleteChar = () => {
          if (charIndex > 0) {
            charIndex--;
            setDisplayedText(currentPhrase.slice(0, charIndex));
            timeout = setTimeout(deleteChar, deleteSpeed);
          } else {
            // Move to pausing phase
            setPhase(phase === 'deleting-1' ? 'pausing-1' : 'pausing-2');
          }
        };
        timeout = setTimeout(deleteChar, deleteSpeed);
        break;
      }

      case 'pausing-1':
      case 'pausing-2': {
        // Pause after deleting
        timeout = setTimeout(() => {
          if (phase === 'pausing-1') {
            // Switch to second phrase
            setPhase('typing-2');
          } else {
            // Loop back to first phrase
            setPhase('typing-1');
          }
        }, pauseAfterDelete);
        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, phrase1, phrase2, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  // Blinking cursor animation - always blinks
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="inline font-['Plus_Jakarta_Sans']">
      {renderTextWithGradient(displayedText, phrase1, phrase2, phase, darkMode)}
      <motion.span
        className={`inline-block w-1 h-10 md:h-12 ml-1 ${
          darkMode ? 'bg-teal-400' : 'bg-violet-500'
        }`}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0 }}
      />
    </div>
  );
};
