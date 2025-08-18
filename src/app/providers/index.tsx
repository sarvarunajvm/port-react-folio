import React from 'react';

import { HeroUIProvider } from '@heroui/react';

import { ThemeProvider } from '../../shared/contexts/ThemeContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </HeroUIProvider>
  );
};
