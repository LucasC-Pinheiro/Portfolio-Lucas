import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface MetricsProps {
  darkMode: boolean;
}

interface MetricItem {
  value: number;
  suffix: string;
  labelKey: string;
}

export const Metrics = ({ darkMode }: MetricsProps) => {
  const { t } = useLanguage();
  const [isInView, setIsInView] = useState(false);

  const metrics: MetricItem[] = [
    { value: 3, suffix: '+', labelKey: 'metricsYearsStudy' },
    { value: 5, suffix: 'm', labelKey: 'metricsProfessionalExp' },
    { value: 3, suffix: '+', labelKey: 'metricsProjectsDelivered' },
    { value: 45, suffix: '%', labelKey: 'metricsConversionIncrease' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const CountUp = ({ value, suffix, labelKey }: MetricItem) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let currentCount = 0;
      const increment = Math.ceil(value / 20);
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 50);

      return () => clearInterval(timer);
    }, [isInView, value]);

    return (
      <motion.div
        className={`p-6 rounded-xl border transition-all ${
          darkMode
            ? 'bg-white/5 border-white/10'
            : 'bg-violet-50 border-violet-200'
        }`}
        variants={cardVariants}
        onViewportEnter={() => setIsInView(true)}
      >
        <motion.div
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          {count}{suffix}
        </motion.div>
        <div
          className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`}
        >
          {t(labelKey as any)}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <CountUp key={index} {...metric} />
        ))}
      </div>
    </motion.div>
  );
};
