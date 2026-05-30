import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createFsSafeTimestamp } from '@/lib/utils/createFsSafeTimestamp';

describe('createFsSafeTimestamp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('replaces every ":" and "." from the ISO string with "-"', () => {
    vi.setSystemTime(new Date('2026-05-26T07:49:06.123Z'));

    expect(createFsSafeTimestamp()).toBe('2026-05-26T07-49-06-123Z');
  });

  it('produces a string containing no colon or dot characters', () => {
    vi.setSystemTime(new Date('2026-12-31T23:59:59.999Z'));

    const timestamp = createFsSafeTimestamp();

    expect(timestamp).not.toMatch(/[:.]/);
  });

  it('returns distinct values across time advances', () => {
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    const first = createFsSafeTimestamp();

    vi.setSystemTime(new Date('2026-01-01T00:00:00.001Z'));
    const second = createFsSafeTimestamp();

    expect(first).not.toBe(second);
  });
});
