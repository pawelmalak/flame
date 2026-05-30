import type { FixedTuple } from './types';
import { padZero } from './utils/padZero';

export type GreetingsSchema = Readonly<FixedTuple<string, 4>>;
export type DaysSchema = Readonly<FixedTuple<string, 7>>;
export type MonthsSchema = Readonly<FixedTuple<string, 12>>;

export type DateTimeConfig = {
  daySchema: DaysSchema;
  monthSchema: MonthsSchema;
  useAmericanDate: boolean;
  hideTime: boolean;
  hideDate: boolean;
};

export type GreetingConfig = {
  greetingsSchema: GreetingsSchema;
};

export type HeaderConfig = DateTimeConfig &
  GreetingConfig & {
    hideHeader: boolean;
  };

export const DEFAULT_DAYS: DaysSchema = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DEFAULT_MONTHS: MonthsSchema = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DEFAULT_GREETINGS: GreetingsSchema = [
  'Good evening!',
  'Good afternoon!',
  'Good morning!',
  'Good night!',
];

export const formatDateTime = (now: Date, config: DateTimeConfig) => {
  let dateEl = '';

  if (!config.hideDate) {
    const day = config.daySchema[now.getDay()];
    const month = config.monthSchema[now.getMonth()];

    if (config.useAmericanDate) {
      dateEl = `${day}, ${month} ${now.getDate()} ${now.getFullYear()}`;
    } else {
      dateEl = `${day}, ${now.getDate()} ${month} ${now.getFullYear()}`;
    }
  }

  let timeEl = '';

  if (!config.hideTime) {
    timeEl = [now.getHours(), now.getMinutes(), now.getSeconds()].map(padZero).join(':');
  }

  const separator = !config.hideDate && !config.hideTime ? ' - ' : '';

  return `${dateEl}${separator}${timeEl}`;
};

export const pickGreeting = (now: Date, config: GreetingConfig) => {
  const [evening, afternoon, morning, night] = config.greetingsSchema;
  const hour = now.getHours();

  if (hour >= 18) {
    return evening;
  }

  if (hour >= 12) {
    return afternoon;
  }

  if (hour >= 6) {
    return morning;
  }

  return night;
};
