import { Suspense, lazy, useEffect, useState } from 'react';

import { NeomorphicLoader } from '../shared/components/ui';
import '../styles/globals.css';
import { AppProviders } from './providers';

// Lazy load the Home page for code splitting
const Home = lazy(() => import('../pages/Home').then((module) => ({ default: module.Home })));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const preloadAssets = async () => {
      try {
        // Preload fonts
        if ('fonts' in document) {
          await document.fonts.ready;
        }

        // Set minimum loading time for better UX
        const minimumLoadTime = 2000;
        const startTime = Date.now();

        // Simulate asset loading
        await new Promise((resolve) => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, minimumLoadTime - elapsed);
          setTimeout(resolve, remaining);
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Asset preloading failed:', error);
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  return (
    <AppProviders>
      {isLoading ? (
        <NeomorphicLoader onLoadComplete={() => setIsLoading(false)} />
      ) : (
        <Suspense fallback={<NeomorphicLoader onLoadComplete={() => {}} />}>
          <Home />
        </Suspense>
      )}
    </AppProviders>
  );
}

export default App;
