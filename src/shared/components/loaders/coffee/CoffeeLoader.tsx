import React, { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import CoffeeBeanParticle from './CoffeeBeanParticle';
import CoffeeCup from './CoffeeCup';
import SteamParticles from './SteamParticles';
import { COFFEE_BEANS_COUNT, PHASE_THRESHOLDS, STEAM_PARTICLES_COUNT } from './constants';
import type { CoffeeLoaderProps, LoadingPhase } from './types';

const CoffeeLoader: React.FC<CoffeeLoaderProps> = ({ progress, isDark }) => {
  const [beansDropped, setBeansDropped] = useState(0);

  const currentPhase = useMemo((): LoadingPhase => {
    if (progress >= PHASE_THRESHOLDS.complete) return 'complete';
    if (progress >= PHASE_THRESHOLDS.steaming) return 'steaming';
    if (progress >= PHASE_THRESHOLDS.brewing) return 'brewing';
    if (progress >= PHASE_THRESHOLDS.grinding) return 'grinding';
    return 'dropping';
  }, [progress]);

  const handleBeanAnimationComplete = () => {
    setBeansDropped((prev) => prev + 1);
  };

  const baseClasses = {
    bg: isDark ? 'bg-[#0e0f11]' : 'bg-[#f2f3f5]',
    text: isDark ? 'text-gray-300' : 'text-gray-700',
    subtext: isDark ? 'text-gray-500' : 'text-gray-500',
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-3xl ${baseClasses.bg} neu-pressed-lg flex items-center justify-center overflow-hidden`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentPhase === 'dropping' && (
              <motion.div
                key="beans"
                className="relative w-full h-full flex items-center justify-center"
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from({ length: COFFEE_BEANS_COUNT }).map((_, index) => (
                  <CoffeeBeanParticle
                    key={`bean-${index}`}
                    id={`bean-${index}`}
                    delay={index * 0.3}
                    isDark={isDark}
                    onAnimationComplete={handleBeanAnimationComplete}
                  />
                ))}
              </motion.div>
            )}

            {(currentPhase === 'grinding' || currentPhase === 'brewing') && (
              <CoffeeCup
                key="cup"
                progress={progress}
                isDark={isDark}
                isGrinding={true}
                isBrewing={currentPhase === 'brewing'}
              />
            )}

            {currentPhase === 'steaming' && (
              <motion.div
                key="steam"
                className="relative w-full h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CoffeeCup progress={100} isDark={isDark} isGrinding={true} isBrewing={true} />
                <SteamParticles isDark={isDark} isActive={true} count={STEAM_PARTICLES_COUNT} />
              </motion.div>
            )}

            {currentPhase === 'complete' && (
              <motion.div
                key="complete"
                className="flex flex-col items-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <motion.div
                  className={`text-7xl md:text-8xl mb-4`}
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  ☕
                </motion.div>
                <motion.div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${
                    isDark ? 'from-gray-400 to-gray-300' : 'from-orange-700 to-orange-800'
                  } bg-clip-text text-transparent`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hello World
                </motion.div>
                <motion.div
                  className={`text-base md:text-lg ${baseClasses.subtext} font-mono mt-2`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  System.out.println(&quot;Ready&quot;);
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full ${
            isDark ? 'bg-gray-800/50' : 'bg-orange-100/50'
          } backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`text-sm md:text-base font-mono ${baseClasses.subtext}`}>
            {currentPhase === 'dropping' &&
              `Dropping beans... ${beansDropped}/${COFFEE_BEANS_COUNT}`}
            {currentPhase === 'grinding' && 'Grinding code...'}
            {currentPhase === 'brewing' && 'Brewing logic...'}
            {currentPhase === 'steaming' && 'Generating steam...'}
            {currentPhase === 'complete' && 'Caffeinated!'}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-col items-center"
      >
        <motion.h2
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`text-3xl md:text-4xl font-bold ${baseClasses.text} mb-4`}
        >
          Brewing Portfolio
        </motion.h2>

        <div className={`text-lg md:text-xl font-medium ${baseClasses.subtext}`}>
          {Math.round(progress)}%
        </div>
      </motion.div>
    </div>
  );
};

export default CoffeeLoader;
