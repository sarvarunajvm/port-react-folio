import { Suspense, lazy, useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';

import { Theme, Spinner, Flex, Text, Button, Callout, Container, Card, Badge, Progress } from '@radix-ui/themes';

import { NeomorphicLoader } from '../shared/components';
import '../styles/globals.css';
import { AppProviders } from './providers';

// Lazy load the Home page for code splitting
const Home = lazy(() => import('../pages/Home').then((module) => ({ default: module.Home })));

// Error Boundary Component with Radix UI
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<{ children: ReactNode; themeAppearance: 'dark' | 'light' }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; themeAppearance: 'dark' | 'light' }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Theme appearance={this.props.themeAppearance} accentColor="orange" grayColor="slate">
          <Container size="3" style={{ height: '100vh' }}>
            <Flex 
              direction="column" 
              align="center" 
              justify="center" 
              style={{ 
                height: '100%',
                gap: '1.5rem'
              }}
            >
              <Card size="4" style={{ maxWidth: '500px', width: '100%' }}>
                <Flex direction="column" gap="4">
                  <Flex align="center" gap="2">
                    <Badge color="red" size="2">Error</Badge>
                    <Text size="5" weight="bold">Application Error</Text>
                  </Flex>
                  
                  <Callout.Root color="red" size="2">
                    <Callout.Icon>⚠️</Callout.Icon>
                    <Callout.Text>
                      Something went wrong. Please refresh the page or try again later.
                    </Callout.Text>
                  </Callout.Root>
                  
                  <Flex justify="center" pt="2">
                    <Button 
                      size="3" 
                      variant="solid" 
                      onClick={() => window.location.reload()}
                    >
                      Refresh Page
                    </Button>
                  </Flex>
                  
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <Card variant="surface" style={{ padding: '1rem' }}>
                      <Text size="1" color="gray" style={{ fontFamily: '"Tomorrow", sans-serif', wordBreak: 'break-word' }}>
                        {this.state.error.message}
                      </Text>
                    </Card>
                  )}
                </Flex>
              </Card>
            </Flex>
          </Container>
        </Theme>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Get theme from localStorage or system preference
  const getThemeAppearance = (): 'dark' | 'light' => {
    const savedTheme = localStorage.getItem('theme');
    return (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) ? 'dark' : 'light';
  };

  const [themeAppearance, setThemeAppearance] = useState<'dark' | 'light'>(getThemeAppearance);

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = () => {
      setThemeAppearance(getThemeAppearance());
    };

    // Listen for storage changes (theme toggle)
    window.addEventListener('storage', handleThemeChange);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    // Preload critical assets with progress tracking
    const preloadAssets = async () => {
      try {
        setLoadingProgress(10);
        
        // Preload fonts
        if ('fonts' in document) {
          await document.fonts.ready;
          setLoadingProgress(30);
        }

        // Simulate various loading phases
        const phases = [
          { progress: 50, delay: 300, label: 'Loading assets...' },
          { progress: 70, delay: 400, label: 'Initializing components...' },
          { progress: 90, delay: 500, label: 'Finalizing...' },
          { progress: 100, delay: 300, label: 'Complete!' }
        ];

        for (const phase of phases) {
          await new Promise(resolve => setTimeout(resolve, phase.delay));
          setLoadingProgress(phase.progress);
        }

        // Small delay to show 100% completion
        await new Promise(resolve => setTimeout(resolve, 200));
        setIsLoading(false);
      } catch (error) {
        console.error('Asset preloading failed:', error);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  const LoadingFallback = () => (
    <Theme appearance={themeAppearance} accentColor="orange" grayColor="slate">
      <Container size="2" style={{ height: '100vh' }}>
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          style={{ 
            height: '100%',
            gap: '1.5rem'
          }}
        >
          <Card size="3" style={{ width: '100%', maxWidth: '300px' }}>
            <Flex direction="column" gap="3" align="center">
              <Flex align="center" gap="2">
                <Spinner size="2" />
                <Badge color="blue" size="1">Loading</Badge>
              </Flex>
              
              <Text size="3" weight="medium" align="center">
                Loading Application
              </Text>
              
              <Progress value={loadingProgress} style={{ width: '100%' }} />
              
              <Text size="1" color="gray" align="center">
                Please wait while we prepare your experience...
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Theme>
  );

  return (
    <ErrorBoundary themeAppearance={themeAppearance}>
      <Theme appearance={themeAppearance} accentColor="orange" grayColor="slate">
        <Container size="4" style={{ minHeight: '100vh' }}>
          <AppProviders>
            {isLoading ? (
              <NeomorphicLoader onLoadComplete={() => setIsLoading(false)} />
            ) : (
              <Suspense fallback={<LoadingFallback />}>
                <Home />
              </Suspense>
            )}
          </AppProviders>
        </Container>
      </Theme>
    </ErrorBoundary>
  );
}

export default App;
