import React, { Suspense, lazy, memo, useCallback, useMemo, useState, useTransition, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Theme, Container, Flex, Grid, Spinner, Text, Box, ScrollArea, Skeleton, Badge, Card, Dialog, Progress, Kbd } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';

// import { portfolioConfig } from '../config/portfolio.config';
import { personalInfo, uiContent } from '../data';
import { HeroSection } from '../shared/components';
import { NeumorphicThemeToggle } from '../shared/components';
import { NavigationCard } from '../shared/components';
import { containerVariants } from '../shared/constants/animations';
import { CONTAINER } from '../shared/constants/layout';
import { usePrefersReducedMotion } from '../shared/hooks';
// import type { ModalType, NavigationCardData } from '../shared/types';

const AboutBento = lazy(() => import('./about/About'));
const ExperienceBento = lazy(() => import('./experience/Experience'));
const ProjectsBento = lazy(() => import('./projects/Projects'));
const SkillsBento = lazy(() => import('./skills/Skills'));

const NAVIGATION_CARDS = uiContent.navigation.cards.map((card) => ({
  ...card,
  id: card.id,
  color: card.color as 'blue' | 'purple' | 'green' | 'red',
}));

const MODAL_COMPONENTS = {
  about: AboutBento,
  experience: ExperienceBento,
  projects: ProjectsBento,
  skills: SkillsBento,
} as const;

// Memoized navigation card component for better performance
const MemoizedNavigationCard = memo(NavigationCard);

// Enhanced loading component for modal content
const ModalContentLoader = ({ progress = 0 }: { progress?: number }) => (
  <Card size="3" style={{ margin: '2rem' }}>
    <Flex direction="column" align="center" justify="center" p="8" gap="4">
      <Flex align="center" gap="3">
        <Spinner size="3" />
        <Badge color="blue" variant="soft" size="2">Loading</Badge>
      </Flex>
      <Text size="3" color="gray" align="center">
        Preparing content...
      </Text>
      
      <Box style={{ width: '100%', maxWidth: '300px' }}>
        <Progress value={progress} style={{ width: '100%' }} />
        <Text size="1" color="gray" align="center" mt="2">
          {Math.round(progress)}%
        </Text>
      </Box>
      
      <Flex direction="column" gap="2" style={{ width: '100%', maxWidth: '300px' }}>
        <Skeleton width="100%" height="20px" />
        <Skeleton width="80%" height="20px" />
        <Skeleton width="60%" height="20px" />
      </Flex>
    </Flex>
  </Card>
);

const HomeComponent: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [themeAppearance, setThemeAppearance] = useState<'dark' | 'light'>('light');
  const [showToast, setShowToast] = useState(false);
  const [loadingProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Get theme from localStorage or system preference for Radix Theme
  const getThemeAppearance = useCallback((): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = localStorage.getItem('theme');
    return (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) ? 'dark' : 'light';
  }, []);

  // Set up reactive theme listening
  useEffect(() => {
    const updateTheme = () => {
      setThemeAppearance(getThemeAppearance());
    };

    // Initial theme setup
    updateTheme();

    // Listen for storage changes (theme toggle)
    window.addEventListener('storage', updateTheme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    return () => {
      window.removeEventListener('storage', updateTheme);
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, [getThemeAppearance]);

  const handleResumeDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = personalInfo.resume.path;
    link.download = personalInfo.resume.downloadName;
    link.click();
    
    // Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const handleModalOpen = useCallback(
    (modalType: string) => {
      if (modalType === 'contact') {
        // Handle resume download for contact card
        handleResumeDownload();
      } else {
        // Use transition for smooth modal opening
        startTransition(() => {
          setOpenModal(modalType);
        });
      }
    },
    [handleResumeDownload]
  );

  const handleModalClose = useCallback(() => {
    startTransition(() => {
      setOpenModal(null);
    });
  }, []);

  const renderModal = useMemo(() => {
    if (!openModal || openModal === 'contact') return null;
    const Component = MODAL_COMPONENTS[openModal as keyof typeof MODAL_COMPONENTS];
    const title =
      openModal === 'about'
        ? 'About Me'
        : openModal;

    return (
      <Dialog.Root open={true} onOpenChange={() => handleModalClose()}>
        <Dialog.Content
          style={{ 
            maxWidth: '90vw', 
            maxHeight: '90vh', 
            width: '1200px',
            padding: 0,
            overflow: 'hidden'
          }}
          aria-describedby="modal-description"
        >
          <Dialog.Title style={{ 
            padding: '1.5rem 1.5rem 0',
            fontSize: 'var(--font-size-6)',
            fontWeight: 'bold',
            marginBottom: 'var(--space-4)'
          }}>
            {title}
          </Dialog.Title>
          
          <Dialog.Description style={{ 
            padding: '0 1.5rem', 
            marginBottom: '1rem',
            fontSize: 'var(--font-size-2)',
            color: 'var(--gray-11)'
          }}>
            Press <Kbd>Esc</Kbd> to close this dialog
          </Dialog.Description>
          
          <ScrollArea style={{ height: 'calc(90vh - 120px)' }}>
            <Box style={{ padding: '0 1.5rem 1.5rem' }}>
              <Suspense fallback={<ModalContentLoader progress={loadingProgress} />}>
                <Component />
              </Suspense>
            </Box>
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
    );
  }, [openModal, handleModalClose]);

  // Optimize animations based on user preferences
  const animationVariants = prefersReducedMotion ? {} : containerVariants;

  return (
    <Theme appearance={themeAppearance} accentColor="orange" grayColor="slate">
      <Box
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-background)'
        }}
      >
        <ScrollArea 
          type="always" 
          scrollbars="vertical" 
          style={{ height: '100vh' }}
        >
          <Container size="4" style={{ minHeight: '100vh' }}>
            <Flex
              direction="column"
              align="center"
              justify={{ initial: 'start', md: 'center' }}
              style={{ 
                minHeight: '100vh',
                paddingTop: '3rem',
                paddingBottom: '2rem'
              }}
            >
              <motion.div
                style={{ width: '100%', maxWidth: `${CONTAINER.MAX_WIDTH}px` }}
                variants={animationVariants}
                initial={prefersReducedMotion ? false : 'hidden'}
                animate={prefersReducedMotion ? false : 'visible'}
              >
                <Flex direction="column" gap={{ initial: '4', sm: '5', md: '6', lg: '8' }} style={{ paddingBottom: '5rem' }}>
                  <Box>
                    <HeroSection onProfileClick={() => handleModalOpen('about')} />
                  </Box>

                  <Grid columns={{ initial: '2', md: '4' }} gap={{ initial: '3', sm: '4', md: '5', lg: '6' }}>
                    {NAVIGATION_CARDS.map((card, index) => (
                      <Box key={card.id}>
                        <MemoizedNavigationCard
                          {...card}
                          onClick={() => handleModalOpen(card.id)}
                          delay={prefersReducedMotion ? 0 : index * 0.3}
                        />
                      </Box>
                    ))}
                  </Grid>
                </Flex>
              </motion.div>

              {renderModal}
            </Flex>
          </Container>
        </ScrollArea>
        
        <NeumorphicThemeToggle />

        {/* Toast Notifications */}
        <Toast.Provider swipeDirection="right">
          <Toast.Root open={showToast} onOpenChange={setShowToast}>
            <Toast.Title>
              Resume Downloaded!
            </Toast.Title>
            <Toast.Action altText="Close notification">
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                ✕
              </button>
            </Toast.Action>
          </Toast.Root>
          <Toast.Viewport style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 2000 }} />
        </Toast.Provider>
      </Box>
    </Theme>
  );
};

export const Home = HomeComponent;
