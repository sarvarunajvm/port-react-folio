import React from 'react';

import { Theme } from '@radix-ui/themes';

import { ThemeProvider } from '../../shared/contexts/ThemeContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Theme appearance="inherit" hasBackground={false} panelBackground="solid" scaling="100%">
      <ThemeProvider>{children}</ThemeProvider>
    </Theme>
  );
};
