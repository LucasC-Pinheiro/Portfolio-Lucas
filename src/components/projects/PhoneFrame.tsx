import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  darkMode: boolean;
  accentColor?: string;
  className?: string;
}

export const PhoneFrame = ({ children, darkMode, accentColor = '#8B5CF6', className = '' }: PhoneFrameProps) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: `drop-shadow(0 30px 60px ${accentColor}33) drop-shadow(0 12px 24px rgba(0,0,0,0.25))`,
      }}
    >
      <div
        className={`relative p-[3px] rounded-[2.4rem] ${
          darkMode
            ? 'bg-gradient-to-b from-white/20 via-white/5 to-white/10'
            : 'bg-gradient-to-b from-gray-300/90 via-gray-200/80 to-gray-300/90'
        }`}
      >
        <div
          className={`relative rounded-[2.15rem] overflow-hidden ${
            darkMode ? 'bg-black' : 'bg-gray-100'
          }`}
          style={{ aspectRatio: '9 / 19.5' }}
        >
          {children}
          <span
            className={`pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full ${
              darkMode ? 'bg-black' : 'bg-gray-900'
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
