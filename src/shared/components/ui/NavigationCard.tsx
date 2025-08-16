import { memo, useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { ANIMATION_DURATION, cardVariants } from '../../constants/animations';
import type { NavigationCardProps } from '../../types';

const NavigationCard = memo<NavigationCardProps>(
  ({ emoji, title, subtitle, color, hintText, onClick, delay = 0 }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const checkDarkMode = () => {
        setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
      };
      checkDarkMode();
      const observer = new MutationObserver(checkDarkMode);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
      return () => observer.disconnect();
    }, []);

    const badgeColorClass =
      {
        blue: 'bg-[var(--icon-blue)] border-[var(--icon-blue)]',
        purple: 'bg-[var(--icon-purple)] border-[var(--icon-purple)]',
        green: 'bg-[var(--icon-green)] border-[var(--icon-green)]',
        red: 'bg-[var(--icon-red)] border-[var(--icon-red)]',
      }[color] || 'bg-[var(--muted)] border-[var(--muted)]';

    return (
      <motion.button
        variants={cardVariants}
        whileHover={{
          scale: 1.05,
          y: -8,
          boxShadow: isDark
            ? 'inset 5px 5px 10px rgba(0, 0, 0, 0.7), inset -5px -5px 10px rgba(192, 192, 192, 0.12), 0 10px 30px rgba(192, 192, 192, 0.15)'
            : 'inset 5px 5px 10px rgba(139, 90, 43, 0.15), inset -5px -5px 10px rgba(244, 232, 225, 0.9), 0 10px 30px rgba(184, 115, 51, 0.2)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="p-4 md:p-6 lg:p-8 group cursor-pointer relative overflow-visible flex flex-col items-center justify-center text-center aspect-square md:aspect-[4/3] rounded-2xl transition-all duration-500"
        style={{
          background: 'var(--surface)',
          boxShadow: isDark
            ? 'inset 6px 6px 12px rgba(0, 0, 0, 0.65), inset -6px -6px 12px rgba(192, 192, 192, 0.08), 0 0 0 1px rgba(192, 192, 192, 0.08)'
            : 'inset 6px 6px 12px rgba(139, 90, 43, 0.12), inset -6px -6px 12px rgba(244, 232, 225, 0.75), 0 0 0 1px rgba(184, 115, 51, 0.1)',
        }}
      >
        <UnifiedClickHint
          badgeColorClass={badgeColorClass}
          delay={delay}
          hintText={hintText}
          isDark={isDark}
        />

        <motion.div
          className="p-3 lg:p-4 rounded-xl mb-2 lg:mb-3"
          style={{
            background: 'var(--surface)',
            boxShadow: isDark
              ? '3px 3px 6px rgba(0, 0, 0, 0.5), -3px -3px 6px rgba(192, 192, 192, 0.06)'
              : '3px 3px 6px rgba(139, 90, 43, 0.1), -3px -3px 6px rgba(244, 232, 225, 0.6)',
          }}
          whileHover={{
            rotate: 10,
            boxShadow: isDark
              ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
              : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
          }}
          transition={{ duration: ANIMATION_DURATION.NORMAL }}
        >
          <span className="text-4xl md:text-5xl lg:text-6xl transition-all group-hover:scale-110">
            {emoji}
          </span>
        </motion.div>

        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-muted mt-1">{subtitle}</p>
      </motion.button>
    );
  }
);

const UnifiedClickHint = memo<{
  badgeColorClass: string;
  delay: number;
  hintText?: string;
  isDark: boolean;
}>(({ badgeColorClass, delay, hintText, isDark }) => {
  return (
    <>
      <motion.div
        className="absolute -top-2 -right-2 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.3 }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay,
          }}
        >
          <div
            className={`${badgeColorClass} w-6 h-6 rounded-full flex items-center justify-center opacity-95`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #c0c0c0, #e5e5e5)'
                : 'linear-gradient(135deg, #b87333, #cd7f32)',
              boxShadow: isDark
                ? '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.1)'
                : '2px 2px 4px rgba(139, 90, 43, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.8)',
              border: 'none',
            }}
          >
            <span className="text-sm text-white">👉</span>
          </div>
          <motion.div
            className={`absolute inset-0 ${badgeColorClass.split(' ')[0]} rounded-full`}
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay,
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -bottom-3 left-0 right-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.7, duration: 0.3 }}
      >
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border-2 ${
            isDark
              ? 'bg-gradient-to-r from-slate-500 to-zinc-400 border-slate-400/50'
              : 'bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500/50'
          }`}
        >
          <span className={`text-sm ${isDark ? 'text-black' : 'text-white'}`}>👆</span>
          <span
            className={`text-xs font-semibold whitespace-nowrap ${isDark ? 'text-black' : 'text-white'}`}
          >
            {hintText}
          </span>
        </div>
      </motion.div>
    </>
  );
});

NavigationCard.displayName = 'NavigationCard';
UnifiedClickHint.displayName = 'UnifiedClickHint';

export default NavigationCard;
