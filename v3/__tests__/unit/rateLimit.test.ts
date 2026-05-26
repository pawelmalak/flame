import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createRateLimiter } from '@/lib/rateLimit';

let savedDisabled: string | undefined;

beforeEach(() => {
  savedDisabled = process.env.RATE_LIMIT_DISABLED;
  delete process.env.RATE_LIMIT_DISABLED;
});

afterEach(() => {
  if (savedDisabled === undefined) {
    delete process.env.RATE_LIMIT_DISABLED;
  } else {
    process.env.RATE_LIMIT_DISABLED = savedDisabled;
  }
});

const fakeClock = (startMs: number) => {
  let current = startMs;

  return {
    now: () => current,
    advance: (deltaMs: number) => {
      current += deltaMs;
    },
  };
};

describe('createRateLimiter', () => {
  it('allows attempts up to maxAttempts within the window', () => {
    const maxAttempts = 10;
    const windowMs = 600_000;
    const clock = fakeClock(1_000_000);
    const limiter = createRateLimiter({ maxAttempts, windowMs, now: clock.now });

    for (let i = 0; i < maxAttempts; i++) {
      expect(limiter.allowRequest('1.2.3.4')).toBe(true);
    }
  });

  it('rejects the attempt just past maxAttempts within the window', () => {
    const maxAttempts = 10;
    const windowMs = 600_000;
    const clock = fakeClock(1_000_000);
    const limiter = createRateLimiter({ maxAttempts, windowMs, now: clock.now });

    for (let i = 0; i < maxAttempts; i++) {
      limiter.allowRequest('1.2.3.4');
    }

    expect(limiter.allowRequest('1.2.3.4')).toBe(false);
  });

  it('resets attempts after the window slides past them', () => {
    const maxAttempts = 10;
    const windowMs = 600_000;
    const clock = fakeClock(1_000_000);
    const limiter = createRateLimiter({ maxAttempts, windowMs, now: clock.now });

    for (let i = 0; i < maxAttempts; i++) {
      limiter.allowRequest('1.2.3.4');
    }

    expect(limiter.allowRequest('1.2.3.4')).toBe(false);

    clock.advance(windowMs + 1);

    expect(limiter.allowRequest('1.2.3.4')).toBe(true);
  });

  it('keeps per-key state independent', () => {
    const clock = fakeClock(1_000_000);
    const limiter = createRateLimiter({ maxAttempts: 2, windowMs: 600_000, now: clock.now });

    expect(limiter.allowRequest('a')).toBe(true);
    expect(limiter.allowRequest('a')).toBe(true);
    expect(limiter.allowRequest('a')).toBe(false);

    expect(limiter.allowRequest('b')).toBe(true);
    expect(limiter.allowRequest('b')).toBe(true);
    expect(limiter.allowRequest('b')).toBe(false);
  });

  it('clearAttemptsByKey() clears a specific key', () => {
    const clock = fakeClock(1_000_000);
    const limiter = createRateLimiter({ maxAttempts: 1, windowMs: 600_000, now: clock.now });

    limiter.allowRequest('a');
    expect(limiter.allowRequest('a')).toBe(false);

    limiter.clearAttemptsByKey('a');
    expect(limiter.allowRequest('a')).toBe(true);
  });

  it('clearAttemptsByKey() leaves other keys untouched', () => {
    const clock = fakeClock(1_000_000);
    const limiter = createRateLimiter({ maxAttempts: 1, windowMs: 600_000, now: clock.now });

    limiter.allowRequest('a');
    limiter.allowRequest('b');

    limiter.clearAttemptsByKey('a');

    expect(limiter.allowRequest('a')).toBe(true);
    expect(limiter.allowRequest('b')).toBe(false);
  });

  it('bypasses the limit when RATE_LIMIT_DISABLED=true', () => {
    process.env.RATE_LIMIT_DISABLED = 'true';
    const limiter = createRateLimiter({ maxAttempts: 1, windowMs: 600_000 });

    for (let i = 0; i < 100; i++) {
      expect(limiter.allowRequest('1.2.3.4')).toBe(true);
    }
  });
});
