/**
 * Loading HOC
 * Adds loading state management to components
 */
import React, { ComponentType } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface WithLoadingProps {
  loading?: boolean;
  error?: Error | null;
  skeleton?: boolean;
}

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
  >
    <div className="neu-pressed p-6 rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full"
        />
        <p className="text-sm font-medium text-muted">{message}</p>
      </div>
    </div>
  </motion.div>
);

const ErrorOverlay: React.FC<{ error: Error; onRetry?: () => void }> = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="p-6 neu-pressed rounded-2xl"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl">⚠️</div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary mb-2">Something went wrong</h3>
        <p className="text-sm text-muted">{error.message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 neu-raised rounded-lg hover:scale-105 transition-transform"
        >
          Try Again
        </button>
      )}
    </div>
  </motion.div>
);

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
);

export function withLoading<P extends object>(
  Component: ComponentType<P>,
  options: {
    loadingMessage?: string;
    showSkeleton?: boolean;
    fullScreen?: boolean;
    onRetry?: () => void;
  } = {}
) {
  const {
    loadingMessage = 'Loading...',
    showSkeleton = false,
    fullScreen = false,
    onRetry,
  } = options;

  const WithLoadingComponent = React.memo((props: P & WithLoadingProps) => {
    const { loading, error, skeleton, ...componentProps } = props;

    if (error) {
      return (
        <AnimatePresence mode="wait">
          <ErrorOverlay error={error} onRetry={onRetry} />
        </AnimatePresence>
      );
    }

    if (loading) {
      if (skeleton || showSkeleton) {
        return <SkeletonLoader />;
      }

      if (fullScreen) {
        return (
          <AnimatePresence mode="wait">
            <LoadingOverlay message={loadingMessage} />
          </AnimatePresence>
        );
      }

      return (
        <div className="relative">
          <div className="opacity-50 pointer-events-none">
            <Component {...(componentProps as P)} />
          </div>
          <AnimatePresence mode="wait">
            <LoadingOverlay message={loadingMessage} />
          </AnimatePresence>
        </div>
      );
    }

    return <Component {...(componentProps as P)} />;
  });

  WithLoadingComponent.displayName = `withLoading(${Component.displayName || Component.name || 'Component'})`;

  return WithLoadingComponent;
}
