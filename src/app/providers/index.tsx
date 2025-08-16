import React from 'react';

import { HeroUIProvider } from '@heroui/react';

import { PortfolioProvider } from '../../shared/contexts/PortfolioContext';
import { ThemeProvider } from '../../shared/contexts/ThemeContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ThemeProvider>
        <PortfolioProvider>{children}</PortfolioProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
};
