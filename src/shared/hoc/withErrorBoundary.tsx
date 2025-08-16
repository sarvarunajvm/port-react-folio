/**
 * Error Boundary HOC
 * Provides error handling and recovery for components
 */
import React, { Component, ComponentType, ErrorInfo, ReactNode } from 'react';

import { motion } from 'framer-motion';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: 'page' | 'section' | 'component';
  maxRetries?: number;
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  resetError: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-h-[400px] flex items-center justify-center p-8"
  >
    <div className="neu-pressed p-8 rounded-2xl max-w-md w-full">
      <div className="text-center space-y-4">
        <div className="text-6xl">🚨</div>
        <h2 className="text-2xl font-bold text-primary">Oops! Something went wrong</h2>
        <p className="text-muted text-sm">{error.message}</p>

        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mt-4">
            <summary className="cursor-pointer text-sm font-medium text-muted hover:text-primary">
              Error Details
            </summary>
            <pre className="mt-2 p-2 bg-black/5 dark:bg-white/5 rounded text-xs overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}

        <button
          onClick={resetError}
          className="mt-6 px-6 py-3 neu-raised rounded-lg font-medium hover:scale-105 transition-transform"
        >
          Try Again
        </button>
      </div>
    </div>
  </motion.div>
);

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, maxRetries = 3 } = this.props;
    const { errorCount } = this.state;

    console.error('Error Boundary Caught:', error, errorInfo);

    this.setState({
      errorInfo,
      errorCount: errorCount + 1,
    });

    if (onError) {
      onError(error, errorInfo);
    }

    // Log to error reporting service
    if (
      typeof window !== 'undefined' &&
      (window as unknown as { errorReporter?: { log: (data: unknown) => void } }).errorReporter
    ) {
      (window as unknown as { errorReporter: { log: (data: unknown) => void } }).errorReporter.log({
        error,
        errorInfo,
        level: this.props.level || 'component',
        timestamp: new Date().toISOString(),
      });
    }

    // Auto-recover after max retries
    if (errorCount >= maxRetries) {
      console.error(`Max retries (${maxRetries}) exceeded. Reloading page...`);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      if (resetOnPropsChange) {
        const hasPropsChanged = Object.keys(prevProps).some(
          (key: string) =>
            key !== 'children' &&
            (prevProps as unknown as Record<string, unknown>)[key] !==
              (this.props as unknown as Record<string, unknown>)[key]
        );

        if (hasPropsChanged) {
          this.resetError();
        }
      }

      if (resetKeys) {
        const hasResetKeyChanged = resetKeys.some(
          (key) =>
            (prevProps as unknown as Record<string, unknown>)[String(key)] !==
            (this.props as unknown as Record<string, unknown>)[String(key)]
        );

        if (hasResetKeyChanged) {
          this.resetError();
        }
      }
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback: Fallback = DefaultErrorFallback, isolate } = this.props;

    if (hasError && error) {
      if (isolate) {
        return (
          <div className="border-2 border-red-500 border-dashed rounded-lg p-4">
            <Fallback error={error} errorInfo={errorInfo} resetError={this.resetError} />
          </div>
        );
      }

      return <Fallback error={error} errorInfo={errorInfo} resetError={this.resetError} />;
    }

    return children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  errorBoundaryConfig?: {
    fallback?: ComponentType<ErrorFallbackProps>;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    level?: 'page' | 'section' | 'component';
  }
): ComponentType<P> {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryConfig}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
