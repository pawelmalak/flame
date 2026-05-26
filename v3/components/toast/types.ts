export type ToastType = 'info' | 'success' | 'warn' | 'error';

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = {
  title?: string;
  url?: string;
  action?: ToastAction;
  duration?: number;
  isPersistent?: boolean;
  isHighlighted?: boolean;
};

export type ToastRecord = {
  id: number;
  type: ToastType;
  message: string;
  title?: string;
  url?: string;
  action?: ToastAction;
  duration: number;
  isPersistent: boolean;
  isHighlighted: boolean;
  isExiting: boolean;
};

export type ToastApi = {
  info: (message: string, options?: ToastOptions) => number;
  success: (message: string, options?: ToastOptions) => number;
  warn: (message: string, options?: ToastOptions) => number;
  error: (message: string, options?: ToastOptions) => number;
  dismissById: (id: number) => void;
  dismissAll: () => void;
};
