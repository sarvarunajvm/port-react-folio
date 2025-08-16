import React from 'react';

import { motion } from 'framer-motion';

import { useTheme } from '../../hooks/useTheme';
import NeumorphicThemeToggle from '../ui/NeumorphicThemeToggle';

export const FloatingThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 md:bottom-6 bottom-4 md:right-6 right-4"
    >
      <NeumorphicThemeToggle isDark={isDark} onToggle={toggleTheme} />
    </motion.div>
  );
};
