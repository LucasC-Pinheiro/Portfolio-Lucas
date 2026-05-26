interface TechBadgeProps {
  label: string;
  darkMode: boolean;
  accentColor?: string;
}

export const TechBadge = ({ label, darkMode, accentColor }: TechBadgeProps) => {
  return (
    <span
      className={`group/badge relative inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full border transition-colors duration-200 ${
        darkMode
          ? 'border-white/10 bg-white/[0.03] text-gray-300 hover:border-violet-400/60 hover:text-white'
          : 'border-violet-200/70 bg-white text-violet-700/90 hover:border-violet-400 hover:text-violet-800'
      }`}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full transition-transform group-hover/badge:scale-125"
        style={{
          background: accentColor
            ? `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`
            : darkMode
            ? 'linear-gradient(135deg, #a78bfa, #d946ef)'
            : 'linear-gradient(135deg, #7c3aed, #d946ef)',
        }}
      />
      {label}
    </span>
  );
};
