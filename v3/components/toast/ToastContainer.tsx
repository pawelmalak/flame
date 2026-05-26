'use client';

import { Toast } from './Toast';
import styles from './ToastContainer.module.css';
import type { ToastRecord } from './types';

type Props = {
  toasts: ToastRecord[];
  onDismiss: (id: number) => void;
  onRemove: (id: number) => void;
};

export const ToastContainer = ({ toasts, onDismiss, onRemove }: Props) => {
  return (
    <div className={styles.container} aria-live="polite" data-flame="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} onRemove={onRemove} />
      ))}
    </div>
  );
};
