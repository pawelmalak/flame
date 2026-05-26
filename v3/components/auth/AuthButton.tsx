'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/components/toast/ToastProvider';
import { Button } from '@/components/ui/Button';
import buttonStyles from '@/components/ui/Button.module.css';
import styles from './AuthButton.module.css';

const LogoutControl = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleLogout = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });

      if (response.ok) {
        toast.success('Logged out');
        router.replace('/login');
        router.refresh();
      } else {
        toast.error('Logout failed');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className={styles.authButton}
    >
      Logout
    </Button>
  );
};

const LoginControl = () => {
  return (
    <Link href="/login" className={`${buttonStyles.button} ${styles.authButton}`}>
      Login
    </Link>
  );
};

export const AuthButton = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <LogoutControl /> : <LoginControl />;
};
