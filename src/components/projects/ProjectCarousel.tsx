import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types';
import {
  AppleIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GithubIcon,
  SmartphoneIcon,
} from './icons';
import { PhoneFrame } from './PhoneFrame';
import { TechBadge } from './TechBadge';

interface ProjectCarouselProps {
  projects: Project[];
  darkMode: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export const ProjectCarousel = ({ projects, darkMode }: ProjectCarouselProps) => {
  const { t, language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [direction, setDirection] = useState(1);

  const current = projects[activeIdx];
  const accent = current.accentColor;
  const total = projects.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActiveImg(0);
      setActiveIdx((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (idx: number) => {
      if (idx === activeIdx) return;
      setDirection(idx > activeIdx ? 1 : -1);
      setActiveImg(0);
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const categoryKey =
    current.category === 'ios-native'
      ? 'projectCategoryIosNative'
      : current.category === 'react-native'
      ? 'projectCategoryReactNative'
      : 'projectCategoryWeb';

  const CategoryIcon = current.category === 'ios-native' ? AppleIcon : SmartphoneIcon;
  const isLandscape = current.gallery[0].orientation === 'landscape';
  const activeImage = current.gallery[activeImg];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`relative overflow-hidden rounded-[2rem] backdrop-blur-sm ${
        darkMode
          ? 'bg-[#08060f]/95 border border-white/[0.06]'
          : 'bg-white/95 border border-violet-100/80'
      }`}
    >
      {/* Top progress bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] z-20 ${
          darkMode ? 'bg-white/[0.04]' : 'bg-violet-100/60'
        }`}
        aria-hidden
      >
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
          initial={false}
          animate={{ width: `${((activeIdx + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      {/* Ambient accent glow keyed to active project */}
      <motion.div
        key={`glow-${current.id}`}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          background: darkMode
            ? `radial-gradient(60% 50% at 75% 50%, ${accent}22 0%, transparent 70%), radial-gradient(40% 35% at 20% 100%, ${accent}11 0%, transparent 70%)`
            : `radial-gradient(60% 50% at 75% 50%, ${accent}18 0%, transparent 70%)`,
        }}
      />

      {/* TOP BAR — meta + arrows */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 lg:px-12 pt-7 md:pt-8">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className={`text-[11px] uppercase tracking-[0.2em] font-semibold tabular-nums ${
              darkMode ? 'text-violet-300' : 'text-violet-600'
            }`}
          >
            {String(activeIdx + 1).padStart(2, '0')}
            <span className={darkMode ? 'text-gray-600' : 'text-gray-400'}>
              {' / '}
            </span>
            {String(total).padStart(2, '0')}
          </span>
          <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>·</span>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <CategoryIcon size={11} />
            {t(categoryKey as 'projectCategoryReactNative')}
          </span>
          <span className={darkMode ? 'text-gray-700' : 'text-gray-300'}>·</span>
          <span
            className={`text-[10px] uppercase tracking-[0.2em] font-medium tabular-nums ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            {current.year}
          </span>
          {current.featured && (
            <span
              className={`hidden md:inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 rounded-full ml-1 ${
                darkMode
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-400/20'
                  : 'bg-violet-100 text-violet-700 border border-violet-200'
              }`}
            >
              {t('projectsFeaturedLabel')}
            </span>
          )}
        </div>

        {/* Arrow controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className={`group relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
              darkMode
                ? 'text-gray-300 bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/20'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-violet-50 hover:border-violet-300'
            }`}
          >
            <ChevronLeftIcon size={16} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className={`group relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
              darkMode
                ? 'text-gray-300 bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/20'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-violet-50 hover:border-violet-300'
            }`}
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>

      {/* SLIDE CONTENT */}
      <div className="relative z-10 min-h-[460px] md:min-h-[520px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 px-6 md:px-10 lg:px-12 py-8 md:py-10 lg:py-12 cursor-grab active:cursor-grabbing"
          >
            {/* LEFT — narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h3
                className={`text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {current.title}
              </h3>
              <motion.p
                key={`tag-${current.id}-${language}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className={`mt-3 text-lg md:text-xl font-light leading-snug ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {t(current.taglineKey)}
              </motion.p>
              <motion.p
                key={`desc-${current.id}-${language}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.18 }}
                className={`mt-4 text-sm md:text-[15px] leading-relaxed ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t(current.descriptionKey)}
              </motion.p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {current.technologies.map((tech) => (
                  <TechBadge
                    key={tech}
                    label={tech}
                    darkMode={darkMode}
                    accentColor={accent}
                  />
                ))}
              </div>

              {(current.githubUrl || current.liveUrl) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {current.githubUrl && (
                    <motion.a
                      href={current.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                        boxShadow: `0 8px 24px -8px ${accent}88`,
                      }}
                    >
                      <GithubIcon size={14} />
                      <span>{t('projectsViewSource')}</span>
                      <ArrowUpRightIcon
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </motion.a>
                  )}
                  {current.liveUrl && (
                    <motion.a
                      href={current.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        darkMode
                          ? 'border-white/15 text-white hover:bg-white/5 hover:border-white/25'
                          : 'border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      <span>{t('projectsViewCase')}</span>
                      <ArrowUpRightIcon
                        size={13}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </motion.a>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT — visual */}
            <div className="lg:col-span-7 flex flex-col">
              {isLandscape ? (
                /* Landscape (FitLog): show raw scene plate */
                <div
                  className="relative w-full overflow-hidden rounded-2xl"
                  style={{ aspectRatio: '806 / 764' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage.src}
                      src={activeImage.src}
                      alt={current.title}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                    />
                  </AnimatePresence>
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-2xl ring-1 ${
                      darkMode ? 'ring-white/10' : 'ring-black/5'
                    }`}
                  />
                </div>
              ) : (
                /* Portrait: phone frame */
                <div className="flex justify-center items-center flex-1 py-2 md:py-4">
                  <PhoneFrame
                    darkMode={darkMode}
                    accentColor={accent}
                    className="w-[210px] md:w-[230px] lg:w-[250px]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={current.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover select-none"
                      />
                    </AnimatePresence>
                  </PhoneFrame>
                </div>
              )}

              {/* Thumbnail strip */}
              {current.gallery.length > 1 && (
                <div
                  className={`mt-4 grid gap-2 ${isLandscape ? '' : 'max-w-[280px] mx-auto'}`}
                  style={{
                    gridTemplateColumns: `repeat(${current.gallery.length}, minmax(0, 1fr))`,
                  }}
                >
                  {current.gallery.map((img, idx) => {
                    const isActive = idx === activeImg;
                    return (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setActiveImg(idx)}
                        aria-label={`Screen ${idx + 1}`}
                        className={`group relative overflow-hidden rounded-md transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                        }`}
                        style={{
                          aspectRatio: isLandscape ? '806 / 764' : '9 / 19.5',
                        }}
                      >
                        <img
                          src={img.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover select-none"
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-md transition-all duration-300"
                          style={
                            isActive
                              ? { boxShadow: `inset 0 0 0 2px ${accent}` }
                              : {
                                  boxShadow: darkMode
                                    ? 'inset 0 0 0 1px rgba(255,255,255,0.08)'
                                    : 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                                }
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM — project tabs */}
      <div
        className={`relative z-10 border-t px-4 md:px-6 lg:px-8 py-3 md:py-4 ${
          darkMode ? 'border-white/[0.06]' : 'border-gray-200/70'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {projects.map((p, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(idx)}
                className={`relative shrink-0 inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  isActive
                    ? darkMode
                      ? 'text-white'
                      : 'text-gray-900'
                    : darkMode
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tab-bg"
                    aria-hidden
                    className={`absolute inset-0 rounded-full ${
                      darkMode ? 'bg-white/[0.06]' : 'bg-violet-50'
                    }`}
                    style={{
                      boxShadow: darkMode
                        ? `inset 0 0 0 1px ${accent}55`
                        : `inset 0 0 0 1px ${accent}66`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span
                  className="relative tabular-nums text-[10px] opacity-60"
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="relative whitespace-nowrap">{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
