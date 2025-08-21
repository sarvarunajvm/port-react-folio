import React, { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Box, Text, Card, Flex, Heading } from '@radix-ui/themes';

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
    <Flex direction="column" align="center" style={{ position: 'relative' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          variant="surface"
          size="4"
          style={{
            width: '24rem',
            height: '24rem',
            background: 'var(--surface)',
            boxShadow: isDark
              ? 'inset 16px 16px 32px rgba(0, 0, 0, 0.6), inset -16px -16px 32px rgba(255, 255, 255, 0.08)'
              : 'inset 16px 16px 32px rgba(139, 90, 43, 0.15), inset -16px -16px 32px rgba(244, 232, 225, 0.8)',
            overflow: 'hidden',
          }}
          className="relative md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] flex items-center justify-center"
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Flex direction="column" align="center">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                    style={{ fontSize: '6rem', marginBottom: '1rem' }}
                  >
                    ☕
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Heading
                      size="8"
                      weight="bold"
                      style={{
                        background: isDark
                          ? 'linear-gradient(to right, #9ca3af, #d1d5db)'
                          : 'linear-gradient(to right, #c2410c, #9a3412)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Hello World
                    </Heading>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Text
                      size="4"
                      style={{
                        fontFamily: '"Tomorrow", sans-serif',
                        color: baseClasses.subtext,
                        marginTop: '0.5rem',
                      }}
                    >
                      System.out.println(&quot;Ready&quot;);
                    </Text>
                  </motion.div>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Box
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card
              variant="surface"
              size="2"
              style={{
                background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(254, 243, 199, 0.5)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                padding: '8px 16px',
              }}
            >
              <Text
                size="3"
                style={{
                  fontFamily: '"Tomorrow", sans-serif',
                  color: baseClasses.subtext,
                }}
              >
                {currentPhase === 'dropping' &&
                  `Dropping beans... ${beansDropped}/${COFFEE_BEANS_COUNT}`}
                {currentPhase === 'grinding' && 'Grinding code...'}
                {currentPhase === 'brewing' && 'Brewing logic...'}
                {currentPhase === 'steaming' && 'Generating steam...'}
                {currentPhase === 'complete' && 'Caffeinated!'}
              </Text>
            </Card>
          </motion.div>
        </Box>
      </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Flex direction="column" align="center" style={{ marginTop: '2rem' }}>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heading
              size="8"
              weight="bold"
              style={{
                color: baseClasses.text,
                marginBottom: '1rem',
              }}
            >
              Brewing Portfolio
            </Heading>
          </motion.div>

          <Text
            size="6"
            weight="medium"
            style={{ color: baseClasses.subtext }}
          >
            {Math.round(progress)}%
          </Text>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default CoffeeLoader;
