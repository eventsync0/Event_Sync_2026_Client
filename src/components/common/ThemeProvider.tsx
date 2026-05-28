"use client";

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
    attribute="class"
    defaultTheme="system"   // respecte la préférence OS par défaut
    enableSystem            // active la détection automatique
  >
    {children}
  </NextThemesProvider>
  );
}