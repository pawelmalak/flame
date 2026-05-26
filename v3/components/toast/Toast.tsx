'use client';

import { mdiAlert, mdiAlertCircle, mdiCheckCircle, mdiClose, mdiInformation } from '@mdi/js';
import { useEffect, useRef, type MouseEvent } from 'react';

import styles from './Toast.module.css';
import type { ToastRecord, ToastType } from './types';

const ICONS: Record<ToastType, string> = {
  info: mdiInformation,
  success: mdiCheckCircle,
  warn: mdiAlert,
  error: mdiAlertCircle,
};

const roleForType = (type: ToastType) => (type === 'warn' || type === 'error' ? 'alert' : 'status');

type Props = {
  toast: ToastRecord;
  onDismiss: (id: number) => void;
  onRemove: (id: number) => void;
};

export const Toast = ({ toast, onDismiss, onRemove }: Props) => {
  const {
    id,
    type,
    title,
    message,
    url,
    action,
    duration,
    isPersistent,
    isHighlighted,
    isExiting,
  } = toast;
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingMsRef = useRef(duration);
  const currentTimerStartedAtRef = useRef<number>(Date.now());

  const cancelAutoDismiss = () => {
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }
  };

  const scheduleAutoDismiss = (ms: number) => {
    cancelAutoDismiss();
    currentTimerStartedAtRef.current = Date.now();
    autoDismissTimerRef.current = setTimeout(() => onDismiss(id), ms);
  };

  useEffect(() => {
    if (!isPersistent) {
      scheduleAutoDismiss(remainingMsRef.current);
    }

    return cancelAutoDismiss;
  }, []);

  useEffect(() => {
    if (isExiting) {
      cancelAutoDismiss();
    }
  }, [isExiting]);

  const handleMouseEnter = () => {
    if (isPersistent || isExiting) {
      return;
    }

    const elapsedTime = Date.now() - currentTimerStartedAtRef.current;

    remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsedTime);
    cancelAutoDismiss();
  };

  const handleMouseLeave = () => {
    if (isPersistent || isExiting) {
      return;
    }

    scheduleAutoDismiss(remainingMsRef.current);
  };

  const handleBodyClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      onDismiss(id);

      return;
    }

    if (action) {
      action.onClick();
      onDismiss(id);
    }
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    onDismiss(id);
  };

  const handleAnimationEnd = () => {
    if (isExiting) {
      onRemove(id);
    }
  };

  const isInteractive = Boolean(url || action);

  return (
    <div
      className={styles.toast}
      role={roleForType(type)}
      data-flame="toast"
      data-toast-type={type}
      data-interactive={isInteractive || undefined}
      data-highlighted={isHighlighted || undefined}
      data-exiting={isExiting || undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isInteractive ? handleBodyClick : undefined}
      onAnimationEnd={handleAnimationEnd}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d={ICONS[type]} />
      </svg>

      <div className={styles.body}>
        {title ? <h4 className={styles.title}>{title}</h4> : null}
        <p className={styles.message}>{message}</p>
        {action && !url ? <span className={styles.actionLabel}>{action.label}</span> : null}
      </div>

      <button
        type="button"
        className={styles.close}
        aria-label="Dismiss notification"
        onClick={handleClose}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={mdiClose} />
        </svg>
      </button>
    </div>
  );
};
