import React, { Suspense, lazy, memo, useCallback, useMemo, useState, useTransition } from 'react';

import { motion } from 'framer-motion';

import { portfolioConfig } from '../config/portfolio.config';
import { personalInfo, uiContent } from '../data';
import { HeroSection } from '../features/hero';
import { FloatingThemeToggle } from '../shared/components/FloatingThemeToggle';
import { Modal, NavigationCard } from '../shared/components/ui';
import { containerVariants } from '../shared/constants/animations';
import { CONTAINER } from '../shared/constants/layout';
import { usePrefersReducedMotion } from '../shared/hooks';
import type { ModalType, NavigationCardData } from '../shared/types';

const AboutBento = lazy(() => import('../features/about').then((m) => ({ default: m.AboutBento })));

const ExperienceBento = lazy(() =>
  import('../features/experience').then((m) => ({ default: m.ExperienceBento }))
);
const ProjectsBento = lazy(() =>
  import('../features/projects').then((m) => ({ default: m.ProjectsBento }))
);
const SkillsBento = lazy(() =>
  import('../features/skills').then((m) => ({ default: m.SkillsBento }))
);

const NAVIGATION_CARDS: NavigationCardData[] = uiContent.navigation.cards.map((card) => ({
  ...card,
  id: card.id as ModalType,
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

// Loading component for modal content
const ModalContentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-muted">Loading...</p>
    </div>
  </div>
);

const HomeComponent: React.FC = () => {
  const [openModal, setOpenModal] = useState<ModalType | null>(null);
  const [, startTransition] = useTransition();
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleResumeDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = personalInfo.resume.path;
    link.download = personalInfo.resume.downloadName;
    link.click();
  }, []);

  const handleModalOpen = useCallback(
    (modalType: ModalType) => {
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
    const Component = MODAL_COMPONENTS[openModal];
    const title =
      openModal === 'about'
        ? 'About Me'
        : portfolioConfig.sections[openModal as keyof typeof portfolioConfig.sections]?.title ||
          openModal;

    return (
      <Modal key={openModal} isOpen={true} onClose={handleModalClose} title={title}>
        <Suspense fallback={<ModalContentLoader />}>
          <Component />
        </Suspense>
      </Modal>
    );
  }, [openModal, handleModalClose]);

  // Optimize animations based on user preferences
  const animationVariants = prefersReducedMotion ? {} : containerVariants;

  return (
    <>
      <div
        className={`fixed inset-0 overflow-hidden md:overflow-hidden overflow-y-auto flex items-start md:items-center justify-center ${CONTAINER.PADDING.MOBILE} ${CONTAINER.PADDING.SM} ${CONTAINER.PADDING.MD} ${CONTAINER.PADDING.LG} ${CONTAINER.PADDING.XL}`}
        style={{ background: 'var(--bg)' }}
      >
        <motion.div
          className={`w-full max-w-[${CONTAINER.MAX_WIDTH}px] mx-auto flex flex-col justify-start md:justify-center min-h-full md:h-full pt-12 pb-8 md:py-0`}
          variants={animationVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={prefersReducedMotion ? false : 'visible'}
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-20 md:pb-0">
            <HeroSection onProfileClick={() => handleModalOpen('about')} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {NAVIGATION_CARDS.map((card, index) => (
                <MemoizedNavigationCard
                  key={card.id}
                  {...card}
                  onClick={() => handleModalOpen(card.id)}
                  delay={prefersReducedMotion ? 0 : index * 0.3}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {renderModal}
      </div>
      <FloatingThemeToggle />
    </>
  );
};

export const Home = HomeComponent;
