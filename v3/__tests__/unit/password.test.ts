import { describe, expect, it } from 'vitest';

import { comparePassword } from '@/lib/password';

describe('comparePassword', () => {
  it('returns true for identical strings', () => {
    expect(comparePassword('secret', 'secret')).toBe(true);
  });

  it('returns false for different same-length strings', () => {
    expect(comparePassword('aaaaaa', 'bbbbbb')).toBe(false);
  });

  it('returns false when provided is shorter than expected', () => {
    expect(comparePassword('abc', 'abcdef')).toBe(false);
  });

  it('returns false when provided is longer than expected', () => {
    expect(comparePassword('abcdef', 'abc')).toBe(false);
  });

  it('does not throw on length mismatch', () => {
    expect(() => comparePassword('x', 'longer-string')).not.toThrow();
  });

  it('treats two empty strings as equal (the caller must guard expected length)', () => {
    expect(comparePassword('', '')).toBe(true);
  });

  it('is case-sensitive', () => {
    expect(comparePassword('Secret', 'secret')).toBe(false);
  });

  it('handles multi-byte utf-8 inputs', () => {
    expect(comparePassword('héllo', 'héllo')).toBe(true);
    expect(comparePassword('héllo', 'hello')).toBe(false);
  });
});
