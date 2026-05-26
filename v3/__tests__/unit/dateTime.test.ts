import { describe, expect, it } from 'vitest';

import { DEFAULT_DAYS, DEFAULT_GREETINGS, DEFAULT_MONTHS, type DateTimeConfig } from '@/lib/config';
import { formatDateTime, pickGreeting } from '@/lib/dateTime';

const baseDateTimeConfig: DateTimeConfig = {
  daySchema: DEFAULT_DAYS,
  monthSchema: DEFAULT_MONTHS,
  useAmericanDate: false,
  hideDate: false,
  hideTime: false,
};

describe('formatDateTime', () => {
  it('renders european date order by default', () => {
    const result = formatDateTime(new Date(2026, 4, 7, 9, 5, 3), baseDateTimeConfig);

    expect(result).toBe('Thursday, 7 May 2026 - 09:05:03');
  });

  it('renders american date order when useAmericanDate is true', () => {
    const result = formatDateTime(new Date(2026, 4, 7, 9, 5, 3), {
      ...baseDateTimeConfig,
      useAmericanDate: true,
    });

    expect(result).toBe('Thursday, May 7 2026 - 09:05:03');
  });

  it('pads single-digit time components with leading zero', () => {
    const result = formatDateTime(new Date(2026, 0, 1, 1, 2, 3), baseDateTimeConfig);

    expect(result).toContain(' - 01:02:03');
  });

  it('omits the date when hideDate is true', () => {
    const result = formatDateTime(new Date(2026, 0, 1, 12, 0, 0), {
      ...baseDateTimeConfig,
      hideDate: true,
    });

    expect(result).toBe('12:00:00');
  });

  it('omits the time when hideTime is true', () => {
    const result = formatDateTime(new Date(2026, 0, 1, 12, 0, 0), {
      ...baseDateTimeConfig,
      hideTime: true,
    });

    expect(result).toBe('Thursday, 1 January 2026');
  });

  it('returns an empty string when both date and time are hidden', () => {
    const result = formatDateTime(new Date(2026, 0, 1, 12, 0, 0), {
      ...baseDateTimeConfig,
      hideDate: true,
      hideTime: true,
    });

    expect(result).toBe('');
  });

  it('drops the separator when only one half renders', () => {
    const onlyDate = formatDateTime(new Date(2026, 0, 1, 12, 0, 0), {
      ...baseDateTimeConfig,
      hideTime: true,
    });

    expect(onlyDate).not.toContain(' - ');

    const onlyTime = formatDateTime(new Date(2026, 0, 1, 12, 0, 0), {
      ...baseDateTimeConfig,
      hideDate: true,
    });

    expect(onlyTime).not.toContain(' - ');
  });

  it('indexes daySchema by getDay() (Sunday = 0)', () => {
    const sunday = new Date(2026, 0, 4, 9, 0, 0);

    expect(sunday.getDay()).toBe(0);

    const result = formatDateTime(sunday, baseDateTimeConfig);

    expect(result.startsWith('Sunday,')).toBe(true);
  });

  it('indexes monthSchema by getMonth() (December = 11)', () => {
    const result = formatDateTime(new Date(2026, 11, 15, 9, 0, 0), baseDateTimeConfig);

    expect(result).toContain('December');
  });
});

describe('pickGreeting', () => {
  const config = { greetingsSchema: DEFAULT_GREETINGS };
  const [evening, afternoon, morning, night] = DEFAULT_GREETINGS;

  it('returns evening at and above 18:00', () => {
    expect(pickGreeting(new Date(2026, 0, 1, 18, 0), config)).toBe(evening);
    expect(pickGreeting(new Date(2026, 0, 1, 23, 59), config)).toBe(evening);
  });

  it('returns afternoon at and above 12:00 but below 18:00', () => {
    expect(pickGreeting(new Date(2026, 0, 1, 12, 0), config)).toBe(afternoon);
    expect(pickGreeting(new Date(2026, 0, 1, 17, 59), config)).toBe(afternoon);
  });

  it('returns morning at and above 06:00 but below 12:00', () => {
    expect(pickGreeting(new Date(2026, 0, 1, 6, 0), config)).toBe(morning);
    expect(pickGreeting(new Date(2026, 0, 1, 11, 59), config)).toBe(morning);
  });

  it('returns night below 06:00', () => {
    expect(pickGreeting(new Date(2026, 0, 1, 0, 0), config)).toBe(night);
    expect(pickGreeting(new Date(2026, 0, 1, 5, 59), config)).toBe(night);
  });
});
