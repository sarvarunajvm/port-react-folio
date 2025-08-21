import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, Progress, Flex, Container, Text, Theme } from '@radix-ui/themes';

import { NeumorphicThemeToggle } from './index';
import { CoffeeLoader } from './index';

interface LoaderProps {
  onLoadComplete: () => void;
}

const NeomorphicLoader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  // Get theme from localStorage or system preference for display
  const isDark = (() => {
    const savedTheme = localStorage.getItem('theme');
    return (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  })();

  const themeAppearance = isDark ? 'dark' : 'light';

  useEffect(() => {
    // Total animation duration: 6 seconds for all phases
    const totalDuration = 6000;
    const updateInterval = 60; // Update every 60ms for smoother animation
    const increment = 100 / (totalDuration / updateInterval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Small delay after reaching 100% to show the complete state
          setTimeout(() => {
            onLoadComplete();
          }, 800);
          return 100;
        }
        return next;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <Theme appearance={themeAppearance} accentColor="orange" grayColor="slate">
      <Dialog.Root open={true}>
        <Dialog.Content
          style={{ 
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            maxWidth: '100vw', 
            maxHeight: '100vh', 
            margin: 0, 
            padding: 0,
            border: 'none',
            borderRadius: 0,
            backgroundColor: 'var(--color-background)'
          }}
        >
          <Container 
            size="4" 
            style={{ 
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Flex 
                  direction="column" 
                  align="center" 
                  justify="center"
                  style={{ height: '100%' }}
                  gap="6"
                >
                  {/* Coffee Loader */}
                  <CoffeeLoader progress={progress} isDark={isDark} />
                  
                  {/* Progress Bar */}
                  <Flex direction="column" align="center" gap="2" style={{ width: '320px', maxWidth: '90vw' }}>
                    <Progress 
                      value={progress} 
                      size="3"
                      color="orange"
                      style={{ width: '100%' }}
                    />
                    <Text size="2" color="gray" weight="medium">
                      {Math.round(progress)}% Complete
                    </Text>
                  </Flex>
                </Flex>
              </motion.div>
            </AnimatePresence>

            <NeumorphicThemeToggle />
          </Container>
        </Dialog.Content>
      </Dialog.Root>
    </Theme>
  );
};

export default NeomorphicLoader;
