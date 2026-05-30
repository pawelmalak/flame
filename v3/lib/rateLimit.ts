import { authLog } from './logger';

export const DEFAULT_MAX_ATTEMPTS = 10;
export const DEFAULT_WINDOW_MS = 10 * 60 * 1000;

export const isRateLimitDisabled = (): boolean => process.env.RATE_LIMIT_DISABLED === 'true';

export type RateLimitOptions = {
  maxAttempts?: number;
  windowMs?: number;
  now?: () => number;
};

export type RateLimiter = {
  allowRequest: (key: string) => boolean;
  clearAttemptsByKey: (key: string) => void;
};

export const createRateLimiter = (options: RateLimitOptions = {}): RateLimiter => {
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const now = options.now ?? Date.now;
  const attempts = new Map<string, number[]>();

  return {
    allowRequest(key: string): boolean {
      if (isRateLimitDisabled()) {
        return true;
      }

      const current = now();
      const timeDelta = current - windowMs;
      const recentAttempts = (attempts.get(key) ?? []).filter(timestamp => timestamp > timeDelta);

      if (recentAttempts.length >= maxAttempts) {
        attempts.set(key, recentAttempts);
        authLog.warn({ key, attempts: recentAttempts.length, windowMs }, 'login rate limit hit');

        return false;
      }

      recentAttempts.push(current);
      attempts.set(key, recentAttempts);

      return true;
    },
    clearAttemptsByKey(key: string): void {
      attempts.delete(key);
    },
  };
};

type GlobalWithLimiter = typeof globalThis & {
  __flameLoginLimiter?: RateLimiter;
};

const globalRef = globalThis as GlobalWithLimiter;

export const loginLimiter: RateLimiter =
  globalRef.__flameLoginLimiter ?? (globalRef.__flameLoginLimiter = createRateLimiter());
