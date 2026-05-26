import { timingSafeEqual } from 'node:crypto';

export const comparePassword = (provided: string, expected: string): boolean => {
  const a = Buffer.from(provided, 'utf8');
  const b = Buffer.from(expected, 'utf8');

  if (a.length !== b.length) {
    timingSafeEqual(a, a);

    return false;
  }

  return timingSafeEqual(a, b);
};
