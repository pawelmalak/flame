import { describe, expect, it } from 'vitest';

import { padZero } from '@/lib/utils/padZero';

describe('padZero', () => {
  it('pads single-digit numbers with a leading zero', () => {
    expect(padZero(0)).toBe('00');
    expect(padZero(5)).toBe('05');
    expect(padZero(9)).toBe('09');
  });

  it('leaves two-digit numbers unchanged', () => {
    expect(padZero(10)).toBe('10');
    expect(padZero(59)).toBe('59');
    expect(padZero(99)).toBe('99');
  });

  it('does not truncate numbers longer than two digits', () => {
    expect(padZero(100)).toBe('100');
    expect(padZero(1234)).toBe('1234');
  });
});
