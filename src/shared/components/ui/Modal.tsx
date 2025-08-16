import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg)' }}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-50 p-3 rounded-xl transition-all duration-300 group hover:scale-110"
            aria-label="Close modal"
            style={{
              background: 'var(--surface)',
              boxShadow: isDark
                ? '4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(192, 192, 192, 0.08), inset 1px 1px 2px rgba(192, 192, 192, 0.05)'
                : '4px 4px 8px rgba(139, 90, 43, 0.12), -4px -4px 8px rgba(244, 232, 225, 0.7), inset 1px 1px 2px rgba(244, 232, 225, 0.5)',
            }}
          >
            <span
              className="text-xl transition-colors"
              style={{
                color: isDark ? 'var(--accent)' : 'var(--accent)',
              }}
            >
              ✕
            </span>
          </motion.button>

          {/* Title */}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="fixed top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 text-2xl sm:text-3xl md:text-4xl font-bold z-50 text-primary"
              style={{
                textShadow: isDark
                  ? '0 2px 8px rgba(192, 192, 192, 0.2)'
                  : '0 2px 8px rgba(184, 115, 51, 0.2)',
              }}
            >
              {title}
            </motion.h2>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full overflow-y-auto p-4 pt-16 sm:p-6 sm:pt-20 md:p-8 md:pt-24 text-primary"
            style={{
              fontSize: '1rem',
              lineHeight: '1.6',
            }}
          >
            <div className="w-full h-full">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
