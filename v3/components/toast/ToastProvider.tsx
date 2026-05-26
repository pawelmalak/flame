'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { ToastContainer } from './ToastContainer';
import type { ToastApi, ToastOptions, ToastRecord, ToastType } from './types';

const DEFAULT_TOAST_DURATION = 4000;

type ContextValue = {
  toasts: ToastRecord[];
  api: ToastApi;
};

const ToastContext = createContext<ContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const idCounterRef = useRef(0);

  const dismissById = useCallback((toastId: number) => {
    setToasts(toasts =>
      toasts.map(toast => (toast.id === toastId ? { ...toast, isExiting: true } : toast)),
    );
  }, []);

  const dismissAll = useCallback(() => {
    setToasts(toasts => toasts.map(toast => ({ ...toast, isExiting: true })));
  }, []);

  const removeById = useCallback((toastId: number) => {
    setToasts(toasts => toasts.filter(({ id }) => id !== toastId));
  }, []);

  const push = useCallback((type: ToastType, message: string, options?: ToastOptions) => {
    idCounterRef.current += 1;
    const id = idCounterRef.current;

    const newToast: ToastRecord = {
      id,
      type,
      message,
      duration: DEFAULT_TOAST_DURATION,
      isPersistent: false,
      isHighlighted: false,
      ...options,
      isExiting: false,
    };

    setToasts(toast => [...toast, newToast]);

    return id;
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      info: (message, options) => push('info', message, options),
      success: (message, options) => push('success', message, options),
      warn: (message, options) => push('warn', message, options),
      error: (message, options) => push('error', message, options),
      dismissById,
      dismissAll,
    }),
    [push, dismissById, dismissAll],
  );

  const value = useMemo<ContextValue>(() => ({ toasts, api }), [toasts, api]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissById} onRemove={removeById} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }

  return ctx.api;
};
