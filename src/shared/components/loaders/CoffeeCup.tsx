import React from 'react';

import { motion } from 'framer-motion';

import { THEME_COLORS } from './constants';
import type { CoffeeCupProps } from './types';

const CoffeeCup: React.FC<CoffeeCupProps> = ({ progress, isDark, isGrinding, isBrewing }) => {
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  // Calculate fill level based on brewing phase (50-75% of total progress)
  const fillLevel = isBrewing ? Math.min(Math.max((progress - 50) * 4, 0), 100) : 0;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isGrinding ? 1 : 0,
        opacity: isGrinding ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className={`relative w-48 h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 ${isDark ? 'bg-[#0e0f11]' : 'bg-[#f2f3f5]'} rounded-2xl neu-pressed-lg`}
      >
        <div className="absolute inset-2">
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ transform: 'rotateX(10deg)' }}
            >
              <defs>
                <linearGradient
                  id={`cupGradient-${isDark ? 'dark' : 'light'}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={isDark ? '#9ca3af' : '#fbbf24'} />
                  <stop offset="100%" stopColor={isDark ? '#d1d5db' : '#f59e0b'} />
                </linearGradient>
                <linearGradient
                  id={`coffeeGradient-${isDark ? 'dark' : 'light'}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={isDark ? '#4b5563' : '#92400e'} />
                  <stop offset="100%" stopColor={isDark ? '#1f2937' : '#451a03'} />
                </linearGradient>
              </defs>

              <path
                d="M 25 35 L 30 70 Q 30 75 35 75 L 65 75 Q 70 75 70 70 L 75 35 Z"
                fill={`url(#cupGradient-${isDark ? 'dark' : 'light'})`}
                stroke={isDark ? '#6b7280' : '#d97706'}
                strokeWidth="2"
                className="drop-shadow-lg"
              />

              <path
                d="M 70 45 Q 80 45 80 55 Q 80 65 70 65"
                fill="none"
                stroke={`url(#cupGradient-${isDark ? 'dark' : 'light'})`}
                strokeWidth="3"
                strokeLinecap="round"
              />

              <ellipse
                cx="50"
                cy="35"
                rx="25"
                ry="4"
                fill={isDark ? '#374151' : '#fef3c7'}
                opacity="0.3"
              />

              {isBrewing && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <defs>
                    <clipPath id="cupClip">
                      <path d="M 25 35 L 30 70 Q 30 75 35 75 L 65 75 Q 70 75 70 70 L 75 35 Z" />
                    </clipPath>
                  </defs>

                  <motion.rect
                    x="25"
                    y="35"
                    width="50"
                    height="40"
                    fill={`url(#coffeeGradient-${isDark ? 'dark' : 'light'})`}
                    initial={{ y: 75 }}
                    animate={{ y: 75 - fillLevel * 0.4 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    clipPath="url(#cupClip)"
                  />

                  {fillLevel > 20 && (
                    <motion.ellipse
                      cx="50"
                      cy={75 - fillLevel * 0.4}
                      rx="20"
                      ry="3"
                      fill={isDark ? '#6b7280' : '#92400e'}
                      opacity="0.6"
                      animate={{
                        rx: [20, 22, 20],
                        ry: [3, 4, 3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.g>
              )}
            </svg>

            {isGrinding && !isBrewing && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className={`text-xs font-mono ${colors.particle}`}>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {'< / >'}
                  </motion.span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full ${
            isDark ? 'bg-gray-800' : 'bg-orange-100'
          } text-xs font-mono ${colors.particle}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isGrinding ? 1 : 0,
            y: isGrinding ? 0 : 10,
          }}
          transition={{ delay: 0.3 }}
        >
          {isBrewing ? 'brewing...' : 'grinding...'}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoffeeCup;
