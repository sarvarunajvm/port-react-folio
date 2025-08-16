import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { personalInfo, statistics, uiContent } from '../../../data';
import AnimatedCounter from '../../../shared/components/ui/AnimatedCounter';
import type { HeroSectionProps } from '../../../shared/types';
import TypewriterText from './TypewriterText';

const HeroSection: React.FC<HeroSectionProps> = ({ onProfileClick }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="neu-pressed-lg p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-center">
        {/* Left Column - Photo */}
        <div className="flex flex-col items-center md:block md:justify-start">
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onProfileClick}
            className="cursor-pointer relative inline-block"
          >
            <div
              className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[240px] xl:h-[240px] rounded-2xl overflow-hidden relative group transition-all duration-500"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? 'inset 8px 8px 16px rgba(0, 0, 0, 0.7), inset -8px -8px 16px rgba(192, 192, 192, 0.1), 0 0 0 1px rgba(192, 192, 192, 0.1)'
                  : 'inset 8px 8px 16px rgba(139, 90, 43, 0.15), inset -8px -8px 16px rgba(244, 232, 225, 0.8), 0 0 0 1px rgba(184, 115, 51, 0.15)',
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />

              {/* Fallback placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300/90 to-gray-400/90 dark:from-gray-600/90 dark:to-gray-700/90 flex items-center justify-center backdrop-blur-sm">
                <span className="text-6xl text-muted">📸</span>
              </div>

              {/* Actual image */}
              <img
                src={`${import.meta.env.BASE_URL}photo.png`}
                alt={personalInfo.firstname}
                className="absolute inset-0 w-full h-full object-cover bg-transparent z-10"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            </div>

            {/* Unified Click Hint - Chevron Badge */}
            <motion.div
              className="absolute -top-1 -right-1 z-30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center opacity-95"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, #c0c0c0, #e5e5e5)'
                      : 'linear-gradient(135deg, #b87333, #cd7f32)',
                    boxShadow: isDark
                      ? '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 2px rgba(255, 255, 255, 0.1)'
                      : '2px 2px 4px rgba(139, 90, 43, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <span
                    className="text-sm ml-0.5"
                    style={{ color: isDark ? '#0a0a0a' : '#ffffff' }}
                  >
                    👉
                  </span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-[var(--accent)] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.7, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Desktop Hint - Inside container */}
            <motion.div
              className="hidden md:flex absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
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
                  {uiContent.navigation.profileHint}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Hint - Below image */}
          <motion.div
            className="md:hidden mt-3"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
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
                View my profile
              </span>
            </div>
          </motion.div>
        </div>

        {/* Middle Column - Name and Title */}
        <div className="text-center md:text-left">
          {/* Animated name with gradient */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-3 md:mb-4 text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="block md:hidden">
              {personalInfo.firstname}
              <br />
              {personalInfo.lastname}
            </span>
            <span className="hidden md:inline">
              {personalInfo.firstname} {personalInfo.lastname}
            </span>
          </motion.h1>

          <div className="h-8 md:h-10 lg:h-12 mb-3 md:mb-4">
            <TypewriterText
              texts={personalInfo.titles}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-transparent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text"
              typingSpeed={100}
              deletingSpeed={50}
              pauseTime={2000}
            />
          </div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center md:justify-start gap-3 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:scale-110 transition-all duration-300 group"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl text-[var(--icon-purple)] group-hover:text-[var(--accent)]">
                🐙
              </span>
            </motion.a>
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:scale-110 transition-all duration-300 group"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl text-[var(--icon-blue)] group-hover:text-[var(--accent)]">
                💼
              </span>
            </motion.a>
            <motion.a
              href={personalInfo.social.stackoverflow}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:scale-110 transition-all duration-300 group"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl text-[var(--icon-red)] group-hover:text-[var(--accent)]">
                📚
              </span>
            </motion.a>
            <motion.a
              href={personalInfo.social.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:scale-110 transition-all duration-300 group"
              style={{
                background: 'var(--surface)',
                boxShadow: isDark
                  ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08)'
                  : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl text-[var(--icon-red)] group-hover:text-[var(--accent)]">
                ≠
              </span>
            </motion.a>
          </motion.div>

          {/* Mobile Stats - Compact inline layout */}
          <div className="flex md:hidden gap-2 mt-3 justify-center text-xs">
            <div className="flex items-center gap-1">
              <AnimatedCounter
                end={statistics.yearsOfExperience}
                suffix="+"
                duration={2}
                className="font-black text-[var(--icon-blue)]"
              />
              <span className="text-muted">Years</span>
            </div>
            <span className="text-disabled">•</span>
            <div className="flex items-center gap-1">
              <AnimatedCounter
                end={statistics.projectsCompleted}
                suffix="+"
                duration={2.5}
                className="font-black text-[var(--icon-purple)]"
              />
              <span className="text-muted">Projects</span>
            </div>
            <span className="text-disabled">•</span>
            <div className="flex items-center gap-1">
              <AnimatedCounter
                end={statistics.techStackSize}
                suffix="+"
                duration={3}
                className="font-black text-[var(--icon-green)]"
              />
              <span className="text-muted">Tech</span>
            </div>
          </div>
        </div>

        {/* Right Column - Stats (Desktop only) */}
        <div className="hidden md:flex flex-col gap-3 lg:gap-4 items-center md:items-end justify-center">
          <motion.div
            className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-300"
            style={{
              background: 'var(--surface)',
              boxShadow: isDark
                ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: isDark
                ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.6), inset -4px -4px 8px rgba(192, 192, 192, 0.08), 0 0 15px rgba(192, 192, 192, 0.1)'
                : 'inset 4px 4px 8px rgba(139, 90, 43, 0.12), inset -4px -4px 8px rgba(244, 232, 225, 0.7), 0 0 15px rgba(184, 115, 51, 0.15)',
            }}
          >
            <AnimatedCounter
              end={statistics.yearsOfExperience}
              suffix="+"
              duration={2}
              className="text-2xl lg:text-3xl xl:text-4xl font-black text-[var(--icon-blue)]"
            />
            <div className="text-xs lg:text-sm text-muted font-medium">
              Years
              <br />
              Experience
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-300"
            style={{
              background: 'var(--surface)',
              boxShadow: isDark
                ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: isDark
                ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.6), inset -4px -4px 8px rgba(192, 192, 192, 0.08), 0 0 15px rgba(192, 192, 192, 0.1)'
                : 'inset 4px 4px 8px rgba(139, 90, 43, 0.12), inset -4px -4px 8px rgba(244, 232, 225, 0.7), 0 0 15px rgba(184, 115, 51, 0.15)',
            }}
          >
            <AnimatedCounter
              end={statistics.projectsCompleted}
              suffix="+"
              duration={2.5}
              className="text-2xl lg:text-3xl xl:text-4xl font-black text-[var(--icon-purple)]"
            />
            <div className="text-xs lg:text-sm text-muted font-medium">
              Completed
              <br />
              Projects
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-300"
            style={{
              background: 'var(--surface)',
              boxShadow: isDark
                ? 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -3px -3px 6px rgba(192, 192, 192, 0.06)'
                : 'inset 3px 3px 6px rgba(139, 90, 43, 0.1), inset -3px -3px 6px rgba(244, 232, 225, 0.6)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: isDark
                ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.6), inset -4px -4px 8px rgba(192, 192, 192, 0.08), 0 0 15px rgba(192, 192, 192, 0.1)'
                : 'inset 4px 4px 8px rgba(139, 90, 43, 0.12), inset -4px -4px 8px rgba(244, 232, 225, 0.7), 0 0 15px rgba(184, 115, 51, 0.15)',
            }}
          >
            <AnimatedCounter
              end={statistics.techStackSize}
              suffix="+"
              duration={3}
              className="text-2xl lg:text-3xl xl:text-4xl font-black text-[var(--icon-green)]"
            />
            <div className="text-xs lg:text-sm text-muted font-medium">
              Tech
              <br />
              Stack
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
