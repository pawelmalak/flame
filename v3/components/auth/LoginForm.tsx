'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import { useToast } from '@/components/toast/ToastProvider';
import { Button } from '@/components/ui/Button';
import { InputGroup } from '@/components/ui/InputGroup';

export const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || password.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success('Logged in');
        router.replace(searchParams.get('next') ?? '/');
        router.refresh();

        return;
      }

      if (response.status === 429) {
        toast.error('Too many attempts. Try again later.');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <label htmlFor="password">Password</label>
        <input
          ref={inputRef}
          type="password"
          id="password"
          name="password"
          placeholder="••••••"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
      </InputGroup>

      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};
