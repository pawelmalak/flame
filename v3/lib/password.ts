import { timingSafeEqual } from 'node:crypto';

export const comparePassword = (provided: string, expected: string): boolean => {
  const providedBuffer = Buffer.from(provided, 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');

  if (providedBuffer.length !== expectedBuffer.length) {
    timingSafeEqual(providedBuffer, providedBuffer);

    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
};
