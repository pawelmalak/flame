'use client';

import type { ReactNode } from 'react';

import { ToastProvider } from '../toast/ToastProvider';
import { QueryProvider } from './QueryProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
};
